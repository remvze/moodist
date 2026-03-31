import { BiSolidHeart } from 'react-icons/bi/index';

import { Item } from '../item';
import { useSoundStore } from '@/stores/sound';

export function FavoriteScroll() {
  const autoScrollToFavorites = useSoundStore(
    state => state.autoScrollToFavorites,
  );
  const setAutoScrollToFavorites = useSoundStore(
    state => state.setAutoScrollToFavorites,
  );

  return (
    <Item
      active={autoScrollToFavorites}
      icon={<BiSolidHeart />}
      label="Auto-jump to Favorites"
      onClick={() => setAutoScrollToFavorites(!autoScrollToFavorites)}
    />
  );
}
