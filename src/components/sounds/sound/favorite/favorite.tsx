import { useRef } from 'react';
import { flushSync } from 'react-dom';
import { BiHeart, BiSolidHeart } from 'react-icons/bi/index';
import { AnimatePresence, motion } from 'motion/react';

import { useSoundStore } from '@/stores/sound';
import { cn } from '@/helpers/styles';
import { fade } from '@/lib/motion';

import styles from './favorite.module.css';

import { useKeyboardButton } from '@/hooks/use-keyboard-button';

interface FavoriteProps {
  id: string;
  label: string;
}

export function Favorite({ id, label }: FavoriteProps) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const isFavorite = useSoundStore(state => state.sounds[id].isFavorite);
  const toggleFavorite = useSoundStore(state => state.toggleFavorite);

  const handleToggle = () => {
    const card = buttonRef.current?.closest<HTMLElement>('[role="button"]');
    const topBefore = card?.getBoundingClientRect().top;

    flushSync(() => toggleFavorite(id));

    if (card?.isConnected && topBefore !== undefined) {
      const offset = card.getBoundingClientRect().top - topBefore;
      if (Math.abs(offset) > 0.5) {
        window.scrollBy({ top: offset, behavior: 'instant' });
      }
    }
  };

  const variants = fade();

  const handleKeyDown = useKeyboardButton(handleToggle);

  return (
    <AnimatePresence initial={false} mode="wait">
      <button
        ref={buttonRef}
        className={cn(styles.favoriteButton, isFavorite && styles.isFavorite)}
        aria-label={
          isFavorite
            ? `Remove ${label} Sound from Favorites`
            : `Add ${label} Sound to Favorites`
        }
        onKeyDown={handleKeyDown}
        onClick={e => {
          e.stopPropagation();
          handleToggle();
        }}
      >
        <motion.span
          animate="show"
          aria-hidden="true"
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
