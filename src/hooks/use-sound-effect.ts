import { useMemo, useEffect, useCallback } from 'react';
import { Howl } from 'howler';

import { useSSR } from './use-ssr';

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
    if (sound) sound.volume(typeof volume === 'number' ? volume : 1);
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
