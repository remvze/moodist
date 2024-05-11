import { useEffect } from 'react';

import { useSoundStore } from '@/store';

export function useMediaSession() {
  const isPlaying = useSoundStore(state => state.isPlaying);

  useEffect(() => {
    if ('mediaSession' in navigator) {
      if (isPlaying) {
        navigator.mediaSession.metadata = new MediaMetadata({
          title: 'Moodist - Ambient Sounds',
        });
      } else {
        navigator.mediaSession.metadata = null;
      }
    }
  }, [isPlaying]);
}
