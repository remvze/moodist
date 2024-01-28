import { useMemo, useEffect } from 'react';
import { useShallow } from 'zustand/react/shallow';
import { BiSolidHeart } from 'react-icons/bi/index';
import { Howler } from 'howler';

import { useSoundStore } from '@/store';

import { Container } from '@/components/container';
import { StoreConsumer } from '@/components/store-consumer';
import { Buttons } from '@/components/buttons';
import { Categories } from '@/components/categories';
import { ScrollToTop } from '@/components/scroll-to-top';
import { SharedModal } from '@/components/modals/shared';
import { Menu } from '@/components/menu/menu';
import { SnackbarProvider } from '@/contexts/snackbar';

import { sounds } from '@/data/sounds';

import type { Sound } from '@/data/types';

export function App() {
  const categories = useMemo(() => sounds.categories, []);

  const favorites = useSoundStore(useShallow(state => state.getFavorites()));
  const play = useSoundStore(state => state.play);
  const pause = useSoundStore(state => state.pause);
  const isPlaying = useSoundStore(state => state.isPlaying);

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

  return (
    <SnackbarProvider>
      <StoreConsumer>
        <Container>
          <div id="app" />
          <Buttons />
          <Categories categories={allCategories} />
        </Container>

        <ScrollToTop />
        <Menu />
        <SharedModal />
      </StoreConsumer>
    </SnackbarProvider>
  );
}
