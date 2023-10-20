import { useState, useMemo, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

import { Sound } from '@/components/sound';
import { useLocalStorage } from '@/hooks/use-local-storage';
import { cn } from '@/helpers/styles';
import { fade, scale, mix } from '@/lib/motion';

import styles from './sounds.module.css';

import type { Sounds } from '@/data/types';

interface SoundsProps {
  functional: boolean;
  id: string;
  sounds: Sounds;
}

export function Sounds({ functional, id, sounds }: SoundsProps) {
  const [showAll, setShowAll] = useLocalStorage(`${id}-show-more`, false);

  const [hiddenSelections, setHiddenSelections] = useState<{
    [key: string]: boolean;
  }>({});

  const hasHiddenSelection = useMemo(() => {
    const keys = Object.keys(hiddenSelections);

    return keys.some(key => hiddenSelections[key]);
  }, [hiddenSelections]);

  const selectHidden = useCallback((key: string) => {
    setHiddenSelections(prev => ({
      ...prev,
      [key]: true,
    }));
  }, []);

  const unselectHidden = useCallback((key: string) => {
    setHiddenSelections(prev => ({
      ...prev,
      [key]: false,
    }));
  }, []);

  const variants = mix(fade(), scale(0.9));

  return (
    <div>
      <div className={styles.sounds}>
        {sounds.map((sound, index) => (
          <Sound
            key={sound.label}
            {...sound}
            functional={functional}
            hidden={!showAll && index > 5}
            selectHidden={selectHidden}
            unselectHidden={unselectHidden}
          />
        ))}

        {sounds.length < 2 &&
          new Array(2 - sounds.length)
            .fill(null)
            .map((_, index) => <div key={index} />)}
      </div>

      {sounds.length > 6 && (
        <AnimatePresence initial={false} mode="wait">
          <motion.button
            animate="show"
            exit="hidden"
            initial="hidden"
            key={showAll ? `${id}-show-less` : `${id}-show-more`}
            transition={{ duration: 0.2 }}
            variants={variants}
            className={cn(
              styles.button,
              hasHiddenSelection && !showAll && styles.active,
            )}
            onClick={() => setShowAll(prev => !prev)}
          >
            {showAll ? 'Show Less' : 'Show More'}
          </motion.button>
        </AnimatePresence>
      )}
    </div>
  );
}
