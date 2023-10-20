import { useMemo } from 'react';
import { useShallow } from 'zustand/react/shallow';
import { BiSolidHeart } from 'react-icons/bi/index';

import { useSoundStore } from '@/store';

import { Container } from '@/components/container';
import { StoreConsumer } from '@/components/store-consumer';
import { Buttons } from '@/components/buttons';
import { Categories } from '@/components/categories';

import { sounds } from '@/data/sounds';

import type { Sound } from '@/data/types';

export function App() {
  const categories = useMemo(() => sounds.categories, []);

  const favorites = useSoundStore(useShallow(state => state.getFavorites()));

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
    <StoreConsumer>
      <Container>
        <Buttons />
        <Categories categories={allCategories} />
      </Container>
    </StoreConsumer>
  );
}
