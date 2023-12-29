import { BiUndo, BiTrash } from 'react-icons/bi/index';
import { AnimatePresence, motion } from 'framer-motion';

import { Tooltip } from '@/components/tooltip';

import { useSoundStore } from '@/store';
import { cn } from '@/helpers/styles';
import { fade, mix, slideX } from '@/lib/motion';

import styles from './unselect.module.css';

export function UnselectButton() {
  const noSelected = useSoundStore(state => state.noSelected());
  const restoreHistory = useSoundStore(state => state.restoreHistory);
  const hasHistory = useSoundStore(state => !!state.history);
  const unselectAll = useSoundStore(state => state.unselectAll);

  const variants = {
    ...mix(fade(), slideX(15)),
    exit: { opacity: 0 },
  };

  return (
    <>
      <AnimatePresence mode="wait">
        {(!noSelected || hasHistory) && (
          <motion.div
            animate="show"
            exit="exit"
            initial="hidden"
            variants={variants}
          >
            <Tooltip
              hideDelay={0}
              showDelay={0}
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
                onClick={() => {
                  if (hasHistory) restoreHistory();
                  else if (!noSelected) unselectAll(true);
                }}
              >
                {hasHistory ? <BiUndo /> : <BiTrash />}
              </button>
            </Tooltip>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
