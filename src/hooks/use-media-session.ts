import { useEffect, useRef } from 'react';

import { useSoundStore } from '@/store';

export function useMediaSession() {
  const ref = useRef<HTMLAudioElement | null>(null);

  const isPlaying = useSoundStore(state => state.isPlaying);

  useEffect(() => {
    if (ref.current) {
      ref.current.addEventListener('play', () => {
        console.log('hi');
        navigator.mediaSession.metadata = new MediaMetadata({
          title: 'Moodist',
        });

        navigator.mediaSession.playbackState = 'playing';
      });

      ref.current.addEventListener('pause', () => {
        navigator.mediaSession.playbackState = 'paused';
      });
    }
  }, []);

  useEffect(() => {
    if (isPlaying) {
      ref.current?.play();
    } else {
      ref.current?.pause();
    }
  }, [isPlaying]);

  return ref;
}
