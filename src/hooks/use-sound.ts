import { useMemo, useEffect, useCallback } from 'react';
import { Howl } from 'howler';

import { useSSR } from './use-ssr';

export function useSound(
  src: string,
  options: { loop?: boolean; volume?: number } = {},
) {
  const { isBrowser } = useSSR();
  const sound = useMemo<Howl | null>(() => {
    let sound: Howl | null = null;

    if (isBrowser) {
      sound = new Howl({ preload: false, src: src });
    }

    return sound;
  }, [src, isBrowser]);

  useEffect(() => {
    if (sound) {
      sound.loop(typeof options.loop === 'boolean' ? options.loop : false);
    }
  }, [sound, options.loop]);

  useEffect(() => {
    if (sound)
      sound.volume(typeof options.volume === 'number' ? options.volume : 0.5);
  }, [sound, options.volume]);

  const play = useCallback(() => {
    if (sound) {
      sound.load();
      sound.play();
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
