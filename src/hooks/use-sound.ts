import { useMemo, useEffect, useCallback, useState, useRef } from 'react';
import { Howl } from 'howler';

import { useLoadingStore } from '@/stores/loading';
import { subscribe } from '@/lib/event';
import { useSSR } from './use-ssr';
import { FADE_OUT } from '@/constants/events';
import { configureAudioSession } from '@/lib/platform/audio';
import { isNativePlatform } from '@/lib/platform';
import { nativeAudio } from '@/lib/audio/native-audio-service';

/**
 * A custom React hook to manage sound playback using Howler.js (web) or native audio (iOS/Android).
 *
 * This hook provides control functions to play, stop, pause, and fade out the sound.
 * It also handles loading state management and supports event subscription for fade-out effects.
 *
 * @param {string} src - The source URL of the sound file.
 * @param {Object} [options] - Options for sound playback.
 * @param {boolean} [options.loop=false] - Whether the sound should loop.
 * @param {number} [options.volume=0.5] - The initial volume of the sound, ranging from 0.0 to 1.0.
 * @returns {{ play: () => void, stop: () => void, pause: () => void, fadeOut: (duration: number) => void, isLoading: boolean }} An object containing control functions for the sound.
 */
export function useSound(
  src: string,
  options: { loop?: boolean; preload?: boolean; volume?: number } = {},
  html5Override?: boolean,
) {
  const [hasLoaded, setHasLoaded] = useState(false);
  const isLoading = useLoadingStore(state => state.loaders[src]);
  const setIsLoading = useLoadingStore(state => state.set);
  const volumeRef = useRef(options.volume ?? 0.5);

  const { isBrowser } = useSSR();
  const useNative = isNativePlatform();
  // Use HTML5 Audio on native iOS for background playback support (fallback)
  const useHtml5 = html5Override ?? useNative;

  // Update volume ref when options change
  useEffect(() => {
    volumeRef.current = options.volume ?? 0.5;
  }, [options.volume]);

  // Howler.js sound for web
  const sound = useMemo<Howl | null>(() => {
    // Don't create Howl instance on native platforms
    if (useNative) return null;

    let sound: Howl | null = null;

    if (isBrowser) {
      sound = new Howl({
        html5: useHtml5,
        onload: () => {
          setIsLoading(src, false);
          setHasLoaded(true);
        },
        preload: options.preload ?? false,
        src: src,
      });

      configureAudioSession();
    }

    return sound;
  }, [src, isBrowser, setIsLoading, useHtml5, options.preload, useNative]);

  // Set loop for Howler
  useEffect(() => {
    if (sound) {
      sound.loop(options.loop ?? false);
    }
  }, [sound, options.loop]);

  // Set volume for Howler
  useEffect(() => {
    if (sound) sound.volume(options.volume ?? 0.5);
  }, [sound, options.volume]);

  // Set volume for native audio
  useEffect(() => {
    if (useNative && nativeAudio.isLoaded(src)) {
      nativeAudio.setVolume(src, options.volume ?? 0.5);
    }
  }, [useNative, src, options.volume]);

  const play = useCallback(
    async (cb?: () => void) => {
      if (useNative) {
        // Native audio path
        if (!nativeAudio.isLoaded(src) && !isLoading) {
          setIsLoading(src, true);
        }

        const success = await nativeAudio.play(src, options.loop ?? false);

        if (success) {
          setIsLoading(src, false);
          setHasLoaded(true);
          // Set initial volume
          await nativeAudio.setVolume(src, volumeRef.current);
        }

        // Native audio doesn't have end callback for looping sounds
        if (typeof cb === 'function' && !options.loop) {
          // For non-looping sounds, we could implement a duration-based callback
          // but for now, just call immediately for simplicity
        }
      } else if (sound) {
        // Web audio path (Howler.js)
        if (!hasLoaded && !isLoading) {
          setIsLoading(src, true);
          sound.load();
        }

        if (!sound.playing()) {
          sound.play();
        }

        if (typeof cb === 'function') sound.once('end', cb);
      }
    },
    [src, setIsLoading, sound, hasLoaded, isLoading, useNative, options.loop],
  );

  const stop = useCallback(async () => {
    if (useNative) {
      await nativeAudio.stop(src);
    } else if (sound) {
      sound.stop();
    }
  }, [sound, useNative, src]);

  const pause = useCallback(async () => {
    if (useNative) {
      await nativeAudio.pause(src);
    } else if (sound) {
      sound.pause();
    }
  }, [sound, useNative, src]);

  const fadeOut = useCallback(
    (duration: number) => {
      if (useNative) {
        // Native audio doesn't have built-in fade, implement manually
        const startVolume = volumeRef.current;
        const steps = 20;
        const stepDuration = duration / steps;
        let currentStep = 0;

        const fadeInterval = setInterval(async () => {
          currentStep++;
          const newVolume = startVolume * (1 - currentStep / steps);
          await nativeAudio.setVolume(src, Math.max(0, newVolume));

          if (currentStep >= steps) {
            clearInterval(fadeInterval);
            await nativeAudio.pause(src);
            // Restore original volume for next play
            await nativeAudio.setVolume(src, volumeRef.current);
          }
        }, stepDuration);
      } else if (sound) {
        sound.fade(sound.volume(), 0, duration);

        setTimeout(() => {
          sound.pause();
          sound.volume(volumeRef.current);
        }, duration);
      }
    },
    [sound, useNative, src],
  );

  useEffect(() => {
    const listener = (e: { duration: number }) => fadeOut(e.duration);

    return subscribe(FADE_OUT, listener);
  }, [fadeOut]);

  const control = useMemo(
    () => ({ fadeOut, isLoading, pause, play, stop }),
    [play, stop, pause, isLoading, fadeOut],
  );

  return control;
}
