import { useCallback } from 'react';
import { BiUndo, BiTrash } from 'react-icons/bi/index';
import { AnimatePresence, motion } from 'motion/react';
import type { Variants } from 'motion/react';
import { useHotkeys } from 'react-hotkeys-hook';

import { Tooltip } from '@/components/tooltip';

import { useSoundStore } from '@/stores/sound';
import { cn } from '@/helpers/styles';

import styles from './unselect.module.css';

export function UnselectButton() {
  const noSelected = useSoundStore(state => state.noSelected());
  const restoreHistory = useSoundStore(state => state.restoreHistory);
  const hasHistory = useSoundStore(state => !!state.history);
  const unselectAll = useSoundStore(state => state.unselectAll);
  const locked = useSoundStore(state => state.locked);

  const variants: Variants = {
    hidden: { marginLeft: 0, opacity: 0, width: 0, x: 10 },
    show: {
      marginLeft: 10,
      opacity: 1,
      width: 45,
      x: 0,
      transition: { duration: 0.32, ease: [0.22, 1, 0.36, 1] },
    },
    exit: {
      marginLeft: 0,
      opacity: 0,
      width: 0,
      x: 10,
      transition: { duration: 0.24, ease: [0.4, 0, 1, 1] },
    },
  };

  const handleToggle = useCallback(() => {
    if (locked) return;
    if (hasHistory) restoreHistory();
    else if (!noSelected) unselectAll(true);
  }, [hasHistory, noSelected, unselectAll, restoreHistory, locked]);

  useHotkeys('shift+r', handleToggle, {}, [handleToggle]);

  return (
    <AnimatePresence initial={false}>
      {(!noSelected || hasHistory) && (
        <motion.div
          animate="show"
          exit="exit"
          initial="hidden"
          className={styles.unselectWrapper}
          variants={variants}
        >
          <Tooltip.Provider delayDuration={0}>
            <Tooltip
              content={
                hasHistory
                  ? 'Restore unselected sounds.'
                  : 'Unselect all sounds.'
              }
            >
              <button
                disabled={noSelected && !hasHistory}
                aria-label={
                  hasHistory
                    ? 'Restore Unselected Sounds'
                    : 'Unselect All Sounds'
                }
                className={cn(
                  styles.unselectButton,
                  noSelected && !hasHistory && styles.disabled,
                )}
                onClick={handleToggle}
              >
                {hasHistory ? <BiUndo /> : <BiTrash />}
              </button>
            </Tooltip>
          </Tooltip.Provider>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
