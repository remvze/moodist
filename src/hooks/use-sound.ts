import { useMemo, useEffect } from 'react';

import { useSSR } from './use-ssr';

export function useSound(
  src: string,
  options: { loop?: boolean; volume?: number } = {},
): HTMLAudioElement | null {
  const { isBrowser } = useSSR();
  const sound = useMemo<HTMLAudioElement | null>(() => {
    let sound: HTMLAudioElement | null = null;

    if (isBrowser) {
      sound = new Audio(src);
      sound.preload = 'none';
    }

    return sound;
  }, [src, isBrowser]);

  useEffect(() => {
    if (sound)
      sound.loop = typeof options.loop === 'boolean' ? options.loop : false;
  }, [sound, options.loop]);

  useEffect(() => {
    if (sound)
      sound.volume = typeof options.volume === 'number' ? options.volume : 0.5;
  }, [sound, options.volume]);

  return sound;
}
