import { useState } from 'react';
import { BiUndo, BiTrash } from 'react-icons/bi/index';
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
import { cn } from '@/helpers/styles';
import { fade, mix, slideX } from '@/lib/motion';

import styles from './unselect.module.css';

export function UnselectButton() {
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

  const noSelected = useSoundStore(state => state.noSelected());
  const restoreHistory = useSoundStore(state => state.restoreHistory);
  const hasHistory = useSoundStore(state => !!state.history);
  const unselectAll = useSoundStore(state => state.unselectAll);

  const variants = mix(fade(), slideX(20));

  return (
    <>
      <AnimatePresence mode="popLayout">
        {(!noSelected || hasHistory) && (
          <motion.div
            animate="show"
            exit="hidden"
            initial="hidden"
            variants={variants}
          >
            <button
              disabled={noSelected && !hasHistory}
              ref={refs.setReference}
              {...getReferenceProps}
              aria-label={
                hasHistory ? 'Restore Unselected Sounds' : 'Unselect All Sounds'
              }
              className={cn(
                styles.unselectButton,
                hasHistory && styles.restore,
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
    </>
  );
}
