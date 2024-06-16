import { useMemo, useEffect, useCallback, useState } from 'react';
import { Howl } from 'howler';

import { useLoadingStore } from '@/stores/loading';
import { subscribe } from '@/lib/event';
import { useSSR } from './use-ssr';
import { FADE_OUT } from '@/constants/events';

/**
 * A custom React hook to manage sound playback using Howler.js with additional features.
 *
 * This hook initializes a Howl instance for playing sound effects in the browser,
 * and provides control functions to play, stop, pause, and fade out the sound.
 * It also handles loading state management and supports event subscription for fade-out effects.
 *
 * @param {string} src - The source URL of the sound file.
 * @param {Object} [options] - Options for sound playback.
 * @param {boolean} [options.loop=false] - Whether the sound should loop.
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
  options: { loop?: boolean; preload?: boolean; volume?: number } = {},
  html5: boolean = false,
) {
  const [hasLoaded, setHasLoaded] = useState(false);
  const isLoading = useLoadingStore(state => state.loaders[src]);
  const setIsLoading = useLoadingStore(state => state.set);

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
    }

    return sound;
  }, [src, isBrowser, setIsLoading, html5, options.preload]);

  useEffect(() => {
    if (sound) {
      sound.loop(options.loop ?? false);
    }
  }, [sound, options.loop]);

  useEffect(() => {
    if (sound) sound.volume(options.volume ?? 0.5);
  }, [sound, options.volume]);

  const play = useCallback(
    (cb?: () => void) => {
      if (sound) {
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
    [src, setIsLoading, sound, hasLoaded, isLoading],
  );

  const stop = useCallback(() => {
    if (sound) sound.stop();
  }, [sound]);

  const pause = useCallback(() => {
    if (sound) sound.pause();
  }, [sound]);

  const fadeOut = useCallback(
    (duration: number) => {
      sound?.fade(sound.volume(), 0, duration);

      setTimeout(() => {
        pause();
        sound?.volume(options.volume || 0.5);
      }, duration);
    },
    [options.volume, sound, pause],
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
