import { BiHeart, BiSolidHeart } from 'react-icons/bi/index';

import { useFavoriteStore } from '@/store/favorite';
import { cn } from '@/helpers/styles';

import styles from './like.module.css';

interface LikeProps {
  id: string;
}

export function Like({ id }: LikeProps) {
  const isFavorite = useFavoriteStore(state => state.favorites.includes(id));
  const toggleFavorite = useFavoriteStore(state => state.toggleFavorite);

  return (
    <button
      aria-label="Add Sound to Favorites"
      className={cn(styles.favoriteButton, isFavorite && styles.isFavorite)}
      onClick={e => {
        e.stopPropagation();
        toggleFavorite(id);
      }}
    >
      {isFavorite ? <BiSolidHeart /> : <BiHeart />}
    </button>
  );
}
