import { useMemo, useEffect } from 'react';
import { useShallow } from 'zustand/react/shallow';
import { BiSolidHeart } from 'react-icons/bi/index';
import { Howler } from 'howler';

import { useSoundStore } from '@/stores/sound';

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

  return (
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
  );
}
