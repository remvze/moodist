import { useMemo, useEffect, useCallback } from 'react';
import { Howl } from 'howler';

import { useSSR } from './use-ssr';

/**
 * A custom React hook to manage sound effects using Howler.js.
 *
 * @param {string} src - The source URL of the sound file.
 * @param {number} [volume=1] - The initial volume of the sound, ranging from 0.0 to 1.0.
 * @returns {{ play: () => void, stop: () => void, pause: () => void }} An object containing control functions for the sound:
 *   - play: Function to play the sound.
 *   - stop: Function to stop the sound.
 *   - pause: Function to pause the sound.
 */
export function useSoundEffect(src: string, volume: number = 1) {
  const { isBrowser } = useSSR();

  const sound = useMemo<Howl | null>(() => {
    let sound: Howl | null = null;

    if (isBrowser) {
      sound = new Howl({
        html5: true,
        src: src,
      });
    }

    return sound;
  }, [src, isBrowser]);

  useEffect(() => {
    if (sound) sound.volume(volume ?? 1);
  }, [sound, volume]);

  const play = useCallback(() => {
    if (sound) {
      if (!sound.playing()) {
        sound.play();
      }
    }
  }, [sound]);

  const stop = useCallback(() => {
    if (sound) sound.stop();
  }, [sound]);

  const pause = useCallback(() => {
    if (sound) sound.pause();
  }, [sound]);

  const control = useMemo(() => ({ pause, play, stop }), [play, stop, pause]);

  return control;
}
