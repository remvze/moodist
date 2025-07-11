import { useCallback, useEffect, useRef, useState } from 'react';

import { BrowserDetect } from '@/helpers/browser-detect';

import { useSoundStore } from '@/stores/sound';

import { useSSR } from '@/hooks/use-ssr';
import { useDarkTheme } from '@/hooks/use-dark-theme';

const metadata: MediaMetadataInit = {
  artist: 'Moodist',
  title: 'Ambient Sounds for Focus and Calm',
};

export function MediaSessionTrack() {
  const { isBrowser } = useSSR();
  const isDarkTheme = useDarkTheme();
  const [isGenerated, setIsGenerated] = useState(false);
  const isPlaying = useSoundStore(state => state.isPlaying);
  const play = useSoundStore(state => state.play);
  const pause = useSoundStore(state => state.pause);
  const masterAudioSoundRef = useRef<HTMLAudioElement>(null);
  const artworkURL = isDarkTheme ? '/logo-dark.png' : '/logo-light.png';

  const generateSilence = useCallback(async () => {
    if (!masterAudioSoundRef.current) return;

    masterAudioSoundRef.current.src = '/sounds/silence.mp3';

    setIsGenerated(true);
  }, []);

  useEffect(() => {
    if (!isBrowser || !isPlaying || !isGenerated) return;

    navigator.mediaSession.metadata = new MediaMetadata({
      ...metadata,
      artwork: [
        {
          sizes: '200x200',
          src: artworkURL,
          type: 'image/png',
        },
      ],
    });
  }, [artworkURL, isBrowser, isDarkTheme, isGenerated, isPlaying]);

  useEffect(() => {
    generateSilence();
  }, [generateSilence]);

  const startMasterAudio = useCallback(async () => {
    if (!masterAudioSoundRef.current) return;
    if (!masterAudioSoundRef.current.paused) return;

    try {
      await masterAudioSoundRef.current.play();

      navigator.mediaSession.playbackState = 'playing';
      navigator.mediaSession.setActionHandler('play', play);
      navigator.mediaSession.setActionHandler('pause', pause);
    } catch {
      // Do nothing
    }
  }, [pause, play]);

  const stopMasterAudio = useCallback(() => {
    if (!masterAudioSoundRef.current) return;
    /**
     * Otherwise in Safari we cannot play the audio again
     * through the media session controls
     */
    if (BrowserDetect.isSafari()) {
      masterAudioSoundRef.current.load();
    } else {
      masterAudioSoundRef.current.pause();
    }
    navigator.mediaSession.playbackState = 'paused';
  }, []);

  useEffect(() => {
    if (!isGenerated) return;
    if (!masterAudioSoundRef.current) return;

    if (isPlaying) {
      startMasterAudio();
    } else {
      stopMasterAudio();
    }
  }, [isGenerated, isPlaying, startMasterAudio, stopMasterAudio]);

  useEffect(() => {
    const masterAudioSound = masterAudioSoundRef.current;

    return () => {
      masterAudioSound?.pause();

      navigator.mediaSession.setActionHandler('play', null);
      navigator.mediaSession.setActionHandler('pause', null);
      navigator.mediaSession.playbackState = 'none';
    };
  }, []);

  return <audio id="media-session-track" loop ref={masterAudioSoundRef} />;
}
