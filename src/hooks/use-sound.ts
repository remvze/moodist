import { useMemo, useEffect, useCallback, useState, useRef } from 'react';
import { Howl } from 'howler';

import { useLoadingStore } from '@/stores/loading';
import { subscribe } from '@/lib/event';
import { useSSR } from './use-ssr';
import { FADE_OUT } from '@/constants/events';

const DEFAULT_FADE_DURATION = 250;
const OSCILLATION_PERIOD = 10_000;
const OSCILLATION_MIN_VOLUME = 0.4;
const OSCILLATION_UPDATE_INTERVAL = 50;

/**
 * A custom React hook to manage sound playback using Howler.js with additional features.
 *
 * This hook initializes a Howl instance for playing sound effects in the browser,
 * and provides control functions to play, stop, pause, and fade out the sound.
 * It also handles loading state management and supports event subscription for fade-out effects.
 *
 * @param {string} src - The source URL of the sound file.
 * @param {Object} [options] - Options for sound playback.
 * @param {boolean} [options.active=false] - Whether the sound is currently playing.
 * @param {boolean} [options.loop=false] - Whether the sound should loop.
 * @param {boolean} [options.oscillate=false] - Whether to gently swell its volume.
 * @param {number} [options.volume=0.5] - The initial volume of the sound, ranging from 0.0 to 1.0.
 * @returns {{ play: () => void, stop: () => void, pause: () => void, fadeOut: (duration: number) => void, isLoading: boolean }} An object containing control functions for the sound:
 *   - play: Function to play the sound.
 *   - stop: Function to stop the sound.
 *   - pause: Function to pause the sound.
 *   - fadeOut: Function to fade out the sound over a given duration.
 *   - isLoading: A boolean indicating if the sound is currently loading.
 */
export function useSound(
  src: string,
  options: {
    active?: boolean;
    loop?: boolean;
    oscillate?: boolean;
    preload?: boolean;
    volume?: number;
  } = {},
  html5: boolean = false,
) {
  const [hasLoaded, setHasLoaded] = useState(false);
  const isLoading = useLoadingStore(state => state.loaders[src]);
  const setIsLoading = useLoadingStore(state => state.set);
  const transitionToken = useRef(0);
  const fadeTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const targetVolume = useRef(options.volume ?? 0.5);
  const oscillationMultiplier = useRef(1);
  const isFadingOut = useRef(false);

  const { isBrowser } = useSSR();
  const sound = useMemo<Howl | null>(() => {
    let sound: Howl | null = null;

    if (isBrowser) {
      sound = new Howl({
        html5,
        onload: () => {
          setIsLoading(src, false);
          setHasLoaded(true);
        },
        preload: options.preload ?? false,
        src: src,
      });

      if (window.navigator.audioSession) {
        window.navigator.audioSession.type = 'playback';
      }
    }

    return sound;
  }, [src, isBrowser, setIsLoading, html5, options.preload]);

  useEffect(() => {
    if (sound) {
      sound.loop(options.loop ?? false);
    }
  }, [sound, options.loop]);

  useEffect(() => {
    targetVolume.current = options.volume ?? 0.5;

    if (sound && !isFadingOut.current) {
      sound.volume(targetVolume.current * oscillationMultiplier.current);
    }
  }, [sound, options.volume]);

  useEffect(() => {
    if (!sound) return;

    if (!options.active || !options.oscillate) {
      if (options.active && sound.playing() && !isFadingOut.current) {
        const currentVolume = sound.volume();
        if (Math.abs(currentVolume - targetVolume.current) < 0.01) {
          sound.volume(targetVolume.current);
        } else {
          sound.fade(
            currentVolume,
            targetVolume.current,
            DEFAULT_FADE_DURATION,
          );
        }
      }
      return;
    }

    const startedAt = performance.now();
    const updateVolume = () => {
      if (!sound.playing() || isFadingOut.current) return;

      const phase =
        ((performance.now() - startedAt) / OSCILLATION_PERIOD) * 2 * Math.PI;
      oscillationMultiplier.current =
        OSCILLATION_MIN_VOLUME +
        ((1 - OSCILLATION_MIN_VOLUME) * (1 + Math.cos(phase))) / 2;
      sound.volume(targetVolume.current * oscillationMultiplier.current);
    };

    updateVolume();
    const interval = setInterval(updateVolume, OSCILLATION_UPDATE_INTERVAL);

    return () => {
      clearInterval(interval);
      oscillationMultiplier.current = 1;
    };
  }, [sound, options.active, options.oscillate]);

  const clearFadeTimeout = useCallback(() => {
    if (fadeTimeout.current) {
      clearTimeout(fadeTimeout.current);
      fadeTimeout.current = null;
    }
  }, []);

  const play = useCallback(
    (cb?: () => void) => {
      if (sound) {
        transitionToken.current += 1;
        isFadingOut.current = false;
        clearFadeTimeout();

        if (!hasLoaded && !isLoading) {
          setIsLoading(src, true);
          sound.load();
        }

        if (!sound.playing()) {
          sound.play();
        }

        const currentVolume = sound.volume();
        const nextVolume = targetVolume.current * oscillationMultiplier.current;

        if (currentVolume !== nextVolume) {
          sound.fade(currentVolume, nextVolume, DEFAULT_FADE_DURATION);
        }

        if (typeof cb === 'function') sound.once('end', cb);
      }
    },
    [src, setIsLoading, sound, hasLoaded, isLoading, clearFadeTimeout],
  );

  const stop = useCallback(() => {
    transitionToken.current += 1;
    isFadingOut.current = false;
    clearFadeTimeout();

    if (sound) {
      sound.stop();
      sound.volume(targetVolume.current);
    }
  }, [sound, clearFadeTimeout]);

  const pause = useCallback(
    (duration: number = DEFAULT_FADE_DURATION) => {
      if (!sound) return;

      transitionToken.current += 1;
      const token = transitionToken.current;
      isFadingOut.current = true;
      clearFadeTimeout();

      if (!sound.playing()) {
        isFadingOut.current = false;
        sound.volume(targetVolume.current);
        return;
      }

      const currentVolume = sound.volume();

      if (duration <= 0 || currentVolume <= 0) {
        sound.pause();
        isFadingOut.current = false;
        sound.volume(targetVolume.current);
        return;
      }

      sound.fade(currentVolume, 0, duration);

      fadeTimeout.current = setTimeout(() => {
        if (transitionToken.current !== token) return;

        sound.pause();
        isFadingOut.current = false;
        sound.volume(targetVolume.current);
      }, duration);
    },
    [sound, clearFadeTimeout],
  );

  const fadeOut = useCallback(
    (duration: number) => {
      pause(duration);
    },
    [pause],
  );

  useEffect(() => {
    const listener = (e: { duration: number }) => fadeOut(e.duration);

    return subscribe(FADE_OUT, listener);
  }, [fadeOut]);

  useEffect(() => {
    return () => clearFadeTimeout();
  }, [clearFadeTimeout]);

  const control = useMemo(
    () => ({ fadeOut, isLoading, pause, play, stop }),
    [play, stop, pause, isLoading, fadeOut],
  );

  return control;
}
