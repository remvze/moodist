import { useEffect, useRef } from 'react';

import { useSoundStore } from '@/store';

export function useMediaSession() {
  const ref = useRef<HTMLAudioElement | null>(null);

  const isPlaying = useSoundStore(state => state.isPlaying);

  useEffect(() => {
    if (isPlaying) {
      ref.current?.play().then(() => {
        console.log('hi');
        navigator.mediaSession.metadata = new MediaMetadata({
          title: 'Moodist',
        });

        navigator.mediaSession.playbackState = 'playing';
      });
    } else {
      ref.current?.pause();

      navigator.mediaSession.playbackState = 'paused';
    }
  }, [isPlaying]);

  return ref;
}
