import { useEffect, useMemo } from 'react';
import { useShallow } from 'zustand/react/shallow';
import { BiSolidHeart } from 'react-icons/bi/index';

import { useFavoriteStore } from '@/store/favorite';

import { Container } from '@/components/container';
import { StoreConsumer } from '../store-consumer';
import { Category } from '@/components/category';
import { PlayButton } from '@/components/play-button';
import { PlayProvider } from '@/contexts/play';

import { sounds } from '@/data/sounds';

export function Categories() {
  const categories = useMemo(() => sounds.categories, []);

  const favorites = useFavoriteStore(useShallow(state => state.favorites));

  const favoriteSounds = useMemo(() => {
    return categories
      .map(category => category.sounds)
      .flat()
      .filter(sound => favorites.includes(sound.id));
  }, [favorites, categories]);

  useEffect(() => console.log({ favoriteSounds }), [favoriteSounds]);

  return (
    <StoreConsumer>
      <PlayProvider>
        <Container>
          <PlayButton />

          <div>
            {!!favoriteSounds.length && (
              <Category
                functional={false}
                icon={<BiSolidHeart />}
                id="favorites"
                sounds={favoriteSounds}
                title="Favorites"
              />
            )}

            {categories.map(category => (
              <Category {...category} key={category.id} />
            ))}
          </div>
        </Container>
      </PlayProvider>
    </StoreConsumer>
  );
}
