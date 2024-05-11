import { useEffect } from 'react';

import { useSoundStore } from '@/store';

export function useMediaSession() {
  const play = useSoundStore(state => state.play);
  const pause = useSoundStore(state => state.pause);
  const isPlaying = useSoundStore(state => state.isPlaying);

  useEffect(() => {
    try {
      navigator.mediaSession.setActionHandler('play', play);
      navigator.mediaSession.setActionHandler('pause', pause);
      navigator.mediaSession.setActionHandler('stop', pause);
    } catch (error) {
      console.log('Media session is no supported yet');
    }
  }, [play, pause]);

  useEffect(() => {
    if (isPlaying) {
      navigator.mediaSession.metadata = new MediaMetadata({
        title: 'Moodist',
      });

      navigator.mediaSession.playbackState = 'playing';
    } else {
      navigator.mediaSession.playbackState = 'paused';
    }
  }, [isPlaying]);
}
