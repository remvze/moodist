import { useMemo, useEffect, useRef } from 'react';
import { useShallow } from 'zustand/react/shallow';
import { BiSolidHeart } from 'react-icons/bi/index';
import { Howler } from 'howler';

import { useSoundStore } from '@/store';

import { Container } from '@/components/container';
import { StoreConsumer } from '@/components/store-consumer';
import { Buttons } from '@/components/buttons';
import { Categories } from '@/components/categories';
import { SharedModal } from '@/components/modals/shared';
import { Toolbar } from '@/components/toolbar';
import { SnackbarProvider } from '@/contexts/snackbar';

import { sounds } from '@/data/sounds';
import { FADE_OUT } from '@/constants/events';

import type { Sound } from '@/data/types';
import { subscribe } from '@/lib/event';

export function App() {
  const categories = useMemo(() => sounds.categories, []);

  const favorites = useSoundStore(useShallow(state => state.getFavorites()));
  const pause = useSoundStore(state => state.pause);
  const lock = useSoundStore(state => state.lock);
  const unlock = useSoundStore(state => state.unlock);

  const favoriteSounds = useMemo(() => {
    const favoriteSounds = categories
      .map(category => category.sounds)
      .flat()
      .filter(sound => favorites.includes(sound.id));

    /**
     * Reorder based on the order of favorites
     */
    return favorites.map(favorite =>
      favoriteSounds.find(sound => sound.id === favorite),
    );
  }, [favorites, categories]);

  useEffect(() => {
    const onChange = () => {
      const { ctx } = Howler;

      if (ctx && !document.hidden) {
        setTimeout(() => {
          ctx.resume();
        }, 100);
      }
    };

    document.addEventListener('visibilitychange', onChange, false);

    return () => document.removeEventListener('visibilitychange', onChange);
  }, []);

  useEffect(() => {
    const unsubscribe = subscribe(FADE_OUT, (e: { duration: number }) => {
      lock();

      setTimeout(() => {
        pause();
        unlock();
      }, e.duration);
    });

    return unsubscribe;
  }, [pause, lock, unlock]);

  const allCategories = useMemo(() => {
    const favorites = [];

    if (favoriteSounds.length) {
      favorites.push({
        icon: <BiSolidHeart />,
        id: 'favorites',
        sounds: favoriteSounds as Array<Sound>,
        title: 'Favorites',
      });
    }

    return [...favorites, ...categories];
  }, [favoriteSounds, categories]);

  const audioElement = useRef<HTMLAudioElement | null>(null);

  const play = useSoundStore(state => state.play);
  const isPlaying = useSoundStore(state => state.isPlaying);

  useEffect(() => {
    const dest = Howler.ctx.createMediaStreamDestination();

    Howler.masterGain.connect(dest);

    if (audioElement.current) {
      audioElement.current.srcObject = dest.stream;
    }
  }, []);

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
      audioElement.current?.play().then(() => {
        audioElement.current!.volume = 1;
        navigator.mediaSession.metadata = new MediaMetadata({
          title: 'Moodist',
        });

        navigator.mediaSession.playbackState = 'playing';
      });
    } else {
      audioElement.current?.pause();
      navigator.mediaSession.playbackState = 'paused';
    }
  }, [isPlaying]);

  return (
    <>
      <SnackbarProvider>
        <StoreConsumer>
          <Container>
            <div id="app" />
            <Buttons />
            <Categories categories={allCategories} />
          </Container>

          <Toolbar />
          <SharedModal />
        </StoreConsumer>
      </SnackbarProvider>

      <audio aria-hidden={true} ref={audioElement} src="" />
    </>
  );
}
