import { BiHeart, BiSolidHeart } from 'react-icons/bi/index';
import { AnimatePresence, motion } from 'framer-motion';

import { useFavoriteStore } from '@/store/favorite';
import { cn } from '@/helpers/styles';
import { fade } from '@/lib/motion';

import styles from './like.module.css';

interface LikeProps {
  id: string;
}

export function Like({ id }: LikeProps) {
  const isFavorite = useFavoriteStore(state => state.favorites.includes(id));
  const toggleFavorite = useFavoriteStore(state => state.toggleFavorite);

  const variants = fade();

  return (
    <AnimatePresence initial={false} mode="wait">
      <button
        aria-label="Add Sound to Favorites"
        className={cn(styles.favoriteButton, isFavorite && styles.isFavorite)}
        onClick={e => {
          e.stopPropagation();
          toggleFavorite(id);
        }}
      >
        <motion.span
          animate="show"
          exit="hidden"
          initial="hidden"
          key={isFavorite ? `${id}-is-favorite` : `${id}-not-favorite`}
          variants={variants}
        >
          {isFavorite ? <BiSolidHeart /> : <BiHeart />}
        </motion.span>
      </button>
    </AnimatePresence>
  );
}
