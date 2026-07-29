import { useCallback, useEffect, useRef } from 'react';

import { useLoadingStore } from '@/stores/loading';
import { subscribe } from '@/lib/event';
import { useSSR } from './use-ssr';
import { FADE_OUT } from '@/constants/events';
import { CRACK_FILES, TAIL_FILES, THUNDER_CONFIG } from '@/lib/thunder/config';

const DEFAULT_FADE_DURATION = 250;
const LOADER_KEY = 'thunder';

function randRange(min: number, max: number) {
  return min + Math.random() * (max - min);
}

interface ThunderOptions {
  volume?: number;
}

/**
 * Procedurally generates thunder by recombining short "crack" (strike) and
 * "tail" (rumble decay) samples on a randomized schedule, with per-clap
 * pitch/gain/pan/distance-filtering variation, instead of looping one fixed
 * sample. Mirrors useSound's control shape ({ play, stop, pause, fadeOut,
 * isLoading }) so sound.tsx can treat it like any other sound.
 */
export function useThunder(options: ThunderOptions = {}) {
  const { isBrowser } = useSSR();
  const isLoading = useLoadingStore(state => state.loaders[LOADER_KEY]);
  const setIsLoading = useLoadingStore(state => state.set);

  const targetVolume = useRef(options.volume ?? 0.5);
  const isFadingOut = useRef(false);
  const isPlaying = useRef(false);
  const transitionToken = useRef(0);

  const audioCtxRef = useRef<AudioContext | null>(null);
  const masterGainRef = useRef<GainNode | null>(null);
  const crackBuffersRef = useRef<Array<AudioBuffer>>([]);
  const tailBuffersRef = useRef<Array<AudioBuffer>>([]);
  const loadPromiseRef = useRef<Promise<void> | null>(null);
  const activeSourcesRef = useRef<Set<AudioBufferSourceNode>>(new Set());
  const schedulerTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const fadeTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearFadeTimeout = useCallback(() => {
    if (fadeTimeout.current) {
      clearTimeout(fadeTimeout.current);
      fadeTimeout.current = null;
    }
  }, []);

  const clearScheduler = useCallback(() => {
    if (schedulerTimeout.current) {
      clearTimeout(schedulerTimeout.current);
      schedulerTimeout.current = null;
    }
  }, []);

  const stopActiveSources = useCallback(() => {
    activeSourcesRef.current.forEach(source => {
      try {
        source.stop();
      } catch {
        // already finished/stopped
      }
    });
    activeSourcesRef.current.clear();
  }, []);

  const ensureContext = useCallback(() => {
    if (audioCtxRef.current && masterGainRef.current) {
      return { ctx: audioCtxRef.current, gain: masterGainRef.current };
    }

    const ctx = new window.AudioContext();
    const gain = ctx.createGain();
    gain.gain.value = 0;
    gain.connect(ctx.destination);

    audioCtxRef.current = ctx;
    masterGainRef.current = gain;

    return { ctx, gain };
  }, []);

  const loadBuffers = useCallback(() => {
    if (loadPromiseRef.current) return loadPromiseRef.current;

    const { ctx } = ensureContext();

    const loadOne = async (url: string) => {
      const res = await fetch(url);
      const arrayBuffer = await res.arrayBuffer();
      return ctx.decodeAudioData(arrayBuffer);
    };

    const promise = (async () => {
      setIsLoading(LOADER_KEY, true);

      const [cracks, tails] = await Promise.all([
        Promise.all(CRACK_FILES.map(loadOne)),
        Promise.all(TAIL_FILES.map(loadOne)),
      ]);

      crackBuffersRef.current = cracks;
      tailBuffersRef.current = tails;

      setIsLoading(LOADER_KEY, false);
    })();

    loadPromiseRef.current = promise;

    return promise;
  }, [ensureContext, setIsLoading]);

  const playClap = useCallback(
    (
      delay: number = 0,
      gainMultiplier: number = 1,
      isDouble: boolean = false,
    ) => {
      const ctx = audioCtxRef.current;
      const masterGain = masterGainRef.current;
      const cracks = crackBuffersRef.current;
      const tails = tailBuffersRef.current;

      if (!ctx || !masterGain || cracks.length === 0 || tails.length === 0)
        return;

      const crackBuf = cracks[Math.floor(Math.random() * cracks.length)];
      const tailBuf = tails[Math.floor(Math.random() * tails.length)];

      // distance: 0 = close/sharp, 1 = far/muffled
      const distance = Math.min(
        1,
        Math.max(0, THUNDER_CONFIG.farBias + randRange(-0.35, 0.35)),
      );
      const rate =
        1 +
        randRange(-THUNDER_CONFIG.rateJitter, THUNDER_CONFIG.rateJitter) -
        distance * 0.08;
      const gain =
        gainMultiplier * (1 - distance * 0.65) * randRange(0.85, 1.0);
      const pan = randRange(-0.7, 0.7);
      const cutoff = 20000 - distance ** 1.4 * 18500; // close=~20kHz, far=~1.5kHz

      const now = ctx.currentTime + delay;

      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.value = cutoff;

      const panner = ctx.createStereoPanner();
      panner.pan.value = pan;

      const eventGain = ctx.createGain();
      eventGain.gain.value = gain;

      filter.connect(panner).connect(eventGain).connect(masterGain);

      const track = (source: AudioBufferSourceNode) => {
        activeSourcesRef.current.add(source);
        source.onended = () => activeSourcesRef.current.delete(source);
      };

      const crackSrc = ctx.createBufferSource();
      crackSrc.buffer = crackBuf;
      crackSrc.playbackRate.value = rate;
      crackSrc.connect(filter);
      crackSrc.start(now);
      track(crackSrc);

      // tail starts slightly before the crack ends, using the crossfade
      // overlap baked into the source cuts, so any crack can pair with any tail
      const crackEffectiveDur = crackBuf.duration / rate;
      const tailStart =
        now +
        Math.max(0, crackEffectiveDur - THUNDER_CONFIG.crossfadeOverlap / rate);

      const tailSrc = ctx.createBufferSource();
      tailSrc.buffer = tailBuf;
      tailSrc.playbackRate.value = rate;
      tailSrc.connect(filter);
      tailSrc.start(tailStart);
      track(tailSrc);

      // occasional second, quieter clap layered shortly after (storm feels busier)
      if (!isDouble && Math.random() < THUNDER_CONFIG.doubleClap.chance) {
        const [minDelay, maxDelay] = THUNDER_CONFIG.doubleClap.delayRange;
        const [minGain, maxGain] = THUNDER_CONFIG.doubleClap.gainRange;

        playClap(
          delay + randRange(minDelay, maxDelay),
          randRange(minGain, maxGain),
          true,
        );
      }
    },
    [],
  );

  const scheduleNext = useCallback(() => {
    if (!isPlaying.current) return;

    const [min, max] = THUNDER_CONFIG.gapRange;
    const gap = randRange(min, max);

    schedulerTimeout.current = setTimeout(() => {
      if (!isPlaying.current) return;
      playClap();
      scheduleNext();
    }, gap * 1000);
  }, [playClap]);

  const play = useCallback(() => {
    if (!isBrowser || isPlaying.current) return;

    transitionToken.current += 1;
    isFadingOut.current = false;
    isPlaying.current = true;
    clearFadeTimeout();

    const { ctx, gain } = ensureContext();
    if (ctx.state === 'suspended') ctx.resume();

    loadBuffers().then(() => {
      if (!isPlaying.current) return; // paused again before load finished

      const now = ctx.currentTime;
      gain.gain.cancelScheduledValues(now);
      gain.gain.setValueAtTime(targetVolume.current, now);

      playClap();
      scheduleNext();
    });
  }, [
    isBrowser,
    clearFadeTimeout,
    ensureContext,
    loadBuffers,
    playClap,
    scheduleNext,
  ]);

  const pause = useCallback(
    (duration: number = DEFAULT_FADE_DURATION) => {
      transitionToken.current += 1;
      const token = transitionToken.current;
      isFadingOut.current = true;
      clearFadeTimeout();

      if (!isPlaying.current) {
        isFadingOut.current = false;
        return;
      }

      isPlaying.current = false;
      clearScheduler();

      const ctx = audioCtxRef.current;
      const gain = masterGainRef.current;

      if (!ctx || !gain) {
        isFadingOut.current = false;
        return;
      }

      const now = ctx.currentTime;
      const currentVolume = gain.gain.value;

      if (duration <= 0 || currentVolume <= 0) {
        gain.gain.cancelScheduledValues(now);
        gain.gain.setValueAtTime(0, now);
        stopActiveSources();
        isFadingOut.current = false;
        return;
      }

      gain.gain.cancelScheduledValues(now);
      gain.gain.setValueAtTime(currentVolume, now);
      gain.gain.linearRampToValueAtTime(0, now + duration / 1000);

      fadeTimeout.current = setTimeout(() => {
        if (transitionToken.current !== token) return;

        stopActiveSources();
        isFadingOut.current = false;
      }, duration);
    },
    [clearFadeTimeout, clearScheduler, stopActiveSources],
  );

  const stop = useCallback(() => {
    transitionToken.current += 1;
    isFadingOut.current = false;
    isPlaying.current = false;
    clearFadeTimeout();
    clearScheduler();
    stopActiveSources();

    const ctx = audioCtxRef.current;
    const gain = masterGainRef.current;

    if (ctx && gain) {
      gain.gain.cancelScheduledValues(ctx.currentTime);
      gain.gain.setValueAtTime(0, ctx.currentTime);
    }
  }, [clearFadeTimeout, clearScheduler, stopActiveSources]);

  const fadeOut = useCallback((duration: number) => pause(duration), [pause]);

  useEffect(() => {
    targetVolume.current = options.volume ?? 0.5;

    const ctx = audioCtxRef.current;
    const gain = masterGainRef.current;

    if (ctx && gain && !isFadingOut.current) {
      gain.gain.setValueAtTime(targetVolume.current, ctx.currentTime);
    }
  }, [options.volume]);

  useEffect(() => {
    const listener = (e: { duration: number }) => fadeOut(e.duration);

    return subscribe(FADE_OUT, listener);
  }, [fadeOut]);

  useEffect(() => {
    return () => {
      clearScheduler();
      clearFadeTimeout();
      stopActiveSources();
      audioCtxRef.current?.close();
      audioCtxRef.current = null;
      masterGainRef.current = null;
    };
  }, [clearScheduler, clearFadeTimeout, stopActiveSources]);

  return { fadeOut, isLoading, pause, play, stop };
}
