import { useEffect } from 'react';

import { useSoundStore } from '@/store';

export function useMediaSession() {
  const isPlaying = useSoundStore(state => state.isPlaying);

  useEffect(() => {
    if ('mediaSession' in navigator) {
      if (isPlaying) {
        console.log('hello');
        navigator.mediaSession.metadata = new MediaMetadata({
          title: 'Moodist - Ambient Sounds',
        });

        navigator.mediaSession.setActionHandler('play', function () {});
        navigator.mediaSession.setActionHandler('pause', function () {});
      } else {
        navigator.mediaSession.metadata = null;
        console.log('bye');
      }
    }
  }, [isPlaying]);
}
