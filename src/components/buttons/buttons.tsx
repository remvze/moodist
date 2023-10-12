import { useEffect, useState } from 'react';
import { BiPause, BiPlay, BiUndo, BiTrash } from 'react-icons/bi/index';
import {
  useFloating,
  autoUpdate,
  offset,
  flip,
  shift,
  useHover,
  useFocus,
  useDismiss,
  useRole,
  useInteractions,
} from '@floating-ui/react';
import { AnimatePresence, motion } from 'framer-motion';

import { useSoundStore } from '@/store';
import { usePlay } from '@/contexts/play';
import { cn } from '@/helpers/styles';

import styles from './buttons.module.css';

export function Buttons() {
  /**
   * Tooltip Start
   */
  const [isTooltipOpen, setIsTooltipOpen] = useState(false);

  const { context, floatingStyles, refs } = useFloating({
    middleware: [offset(15), flip(), shift()],
    onOpenChange: setIsTooltipOpen,
    open: isTooltipOpen,
    placement: 'top',
    whileElementsMounted: autoUpdate,
  });

  const hover = useHover(context, { move: false });
  const focus = useFocus(context);
  const dismiss = useDismiss(context);
  const role = useRole(context, { role: 'tooltip' });

  const { getFloatingProps, getReferenceProps } = useInteractions([
    hover,
    focus,
    dismiss,
    role,
  ]);
  /**
   * Tooltip End
   */

  const { isPlaying, pause, toggle } = usePlay();
  const noSelected = useSoundStore(state => state.noSelected());
  const restoreHistory = useSoundStore(state => state.restoreHistory);
  const hasHistory = useSoundStore(state => !!state.history);
  const unselectAll = useSoundStore(state => state.unselectAll);

  const handleClick = () => {
    if (noSelected) return pause();

    toggle();
  };

  useEffect(() => {
    if (isPlaying && noSelected) pause();
  }, [isPlaying, pause, noSelected]);

  return (
    <div className={styles.buttons}>
      <motion.button
        className={cn(styles.playButton, noSelected && styles.disabled)}
        disabled={noSelected}
        layout
        onClick={handleClick}
      >
        {isPlaying ? (
          <>
            <span>
              <BiPause />
            </span>{' '}
            Pause
          </>
        ) : (
          <>
            <span>
              <BiPlay />
            </span>{' '}
            Play
          </>
        )}
      </motion.button>

      <AnimatePresence mode="popLayout">
        {(!noSelected || hasHistory) && (
          <motion.div
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            initial={{ opacity: 0, x: 20 }}
          >
            <button
              disabled={noSelected && !hasHistory}
              ref={refs.setReference}
              {...getReferenceProps}
              aria-label={
                hasHistory ? 'Restore Unselected Sounds' : 'Unselect All Sounds'
              }
              className={cn(
                styles.smallButton,
                hasHistory ? styles.restore : styles.delete,
                noSelected && !hasHistory && styles.disabled,
              )}
              onClick={() => {
                if (hasHistory) restoreHistory();
                else if (!noSelected) unselectAll(true);
              }}
            >
              {hasHistory ? <BiUndo /> : <BiTrash />}
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {isTooltipOpen && (
        <div
          ref={refs.setFloating}
          style={floatingStyles}
          {...getFloatingProps({ className: styles.tooltip })}
        >
          {hasHistory ? 'Restore unselected sounds.' : 'Unselect all sounds.'}
        </div>
      )}
    </div>
  );
}
