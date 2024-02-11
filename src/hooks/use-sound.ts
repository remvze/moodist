import { useMemo, useEffect, useCallback, useState } from 'react';
import { Howl } from 'howler';

import { useLoadingStore } from '@/store';
import { useSSR } from './use-ssr';

export function useSound(
  src: string,
  options: { loop?: boolean; volume?: number } = {},
) {
  const [hasLoaded, setHasLoaded] = useState(false);
  const isLoading = useLoadingStore(state => state.loaders[src]);
  const setIsLoading = useLoadingStore(state => state.set);

  const { isBrowser } = useSSR();
  const sound = useMemo<Howl | null>(() => {
    let sound: Howl | null = null;

    if (isBrowser) {
      sound = new Howl({
        onload: () => {
          setIsLoading(src, false);
          setHasLoaded(true);
        },
        preload: false,
        src: src,
      });
    }

    return sound;
  }, [src, isBrowser, setIsLoading]);

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
      if (!hasLoaded && !isLoading) {
        setIsLoading(src, true);
        sound.load();
      }

      if (!sound.playing()) {
        sound.play();
      }
    }
  }, [src, setIsLoading, sound, hasLoaded, isLoading]);

  const stop = useCallback(() => {
    if (sound) sound.stop();
  }, [sound]);

  const pause = useCallback(() => {
    if (sound) sound.pause();
  }, [sound]);

  const control = useMemo(
    () => ({ isLoading, pause, play, stop }),
    [play, stop, pause, isLoading],
  );

  return control;
}
