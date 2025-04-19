import { BiHeart, BiSolidHeart } from 'react-icons/bi/index';
import { AnimatePresence, motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

import { useSoundStore } from '@/stores/sound';
import { cn } from '@/helpers/styles';
import { fade } from '@/lib/motion';

import styles from './favorite.module.css';

import { useKeyboardButton } from '@/hooks/use-keyboard-button';
import { waitUntil } from '@/helpers/wait';

interface FavoriteProps {
  id: string;
  label: string;
}

export function Favorite({ id, label }: FavoriteProps) {
  const { t } = useTranslation();
  const isFavorite = useSoundStore(state => state.sounds[id]?.isFavorite);
  const toggleFavorite = useSoundStore(state => state.toggleFavorite);

  const handleToggle = async () => {
    toggleFavorite(id);

    // Check if false -> true
    if (!isFavorite) {
      await waitUntil(
        () => !!document.getElementById('category-favorites'),
        50,
      );

      document
        .getElementById('category-favorites')
        ?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const variants = fade();
  const handleKeyDown = useKeyboardButton(handleToggle);

  const ariaLabel = isFavorite
    ? t('buttons.favorite.remove.aria-label', { label: label })
    : t('buttons.favorite.add.aria-label', { label: label });

  if (useSoundStore.getState().sounds[id] === undefined) {
    return null;
  }

  return (
    <AnimatePresence initial={false} mode="wait">
      <button
        aria-label={ariaLabel}
        className={cn(styles.favoriteButton, isFavorite && styles.isFavorite)}
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
