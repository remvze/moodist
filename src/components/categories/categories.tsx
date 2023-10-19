import { useMemo } from 'react';
import { useShallow } from 'zustand/react/shallow';
import { BiSolidHeart } from 'react-icons/bi/index';
import { AnimatePresence } from 'framer-motion';

import { useSoundStore } from '@/store';

import { Container } from '@/components/container';
import { StoreConsumer } from '../store-consumer';
import { Category } from '@/components/category';
import { Buttons } from '@/components/buttons';
import { PlayProvider } from '@/contexts/play';

import { sounds } from '@/data/sounds';

export function Categories() {
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

  return (
    <StoreConsumer>
      <PlayProvider>
        <Container>
          <Buttons />
          <div>
            <AnimatePresence initial={false}>
              {!!favoriteSounds.length && (
                <Category
                  functional={false}
                  icon={<BiSolidHeart />}
                  id="favorites"
                  title="Favorites"
                  sounds={
                    favoriteSounds as Array<{
                      src: string;
                      label: string;
                      id: string;
                      icon: React.ReactNode;
                    }>
                  }
                />
              )}

              {categories.map(category => (
                <Category {...category} key={category.id} />
              ))}
            </AnimatePresence>
          </div>
        </Container>
      </PlayProvider>
    </StoreConsumer>
  );
}
