import { BiSave } from 'react-icons/bi/index';
import { AnimatePresence, motion } from 'motion/react';
import type { Variants } from 'motion/react';

import { OPEN_PRESETS } from '@/constants/events';
import { dispatch } from '@/lib/event';
import { useSoundStore } from '@/stores/sound';
import { Tooltip } from '@/components/tooltip';

import styles from './save.module.css';

export function SaveButton() {
  const noSelected = useSoundStore(state => state.noSelected());
  const locked = useSoundStore(state => state.locked);

  const variants: Variants = {
    hidden: { filter: 'blur(4px)', marginLeft: 0, opacity: 0, width: 0, x: 10 },
    show: {
      filter: 'blur(0px)',
      marginLeft: 10,
      opacity: 1,
      width: 45,
      x: 0,
      transition: { duration: 0.32, ease: [0.22, 1, 0.36, 1] },
    },
    exit: {
      filter: 'blur(4px)',
      marginLeft: 0,
      opacity: 0,
      width: 0,
      x: 10,
      transition: { duration: 0.24, ease: [0.4, 0, 1, 1] },
    },
  };

  return (
    <AnimatePresence initial={false}>
      {!noSelected && (
        <motion.div
          animate="show"
          className={styles.saveWrapper}
          exit="exit"
          initial="hidden"
          variants={variants}
        >
          <Tooltip.Provider delayDuration={0}>
            <Tooltip content="Save current mix">
              <button
                aria-label="Save current mix"
                className={styles.saveButton}
                disabled={locked}
                onClick={() => dispatch(OPEN_PRESETS)}
              >
                <BiSave aria-hidden="true" />
              </button>
            </Tooltip>
          </Tooltip.Provider>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
