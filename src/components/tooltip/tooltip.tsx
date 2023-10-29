import { useState, cloneElement } from 'react';
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
  type Placement,
} from '@floating-ui/react';
import { motion, AnimatePresence } from 'framer-motion';

import styles from './tooltip.module.css';

interface TooltipProps {
  children: JSX.Element;
  content: React.ReactNode;
  hideDelay?: number;
  placement?: Placement;
  showDelay?: number;
}

export function Tooltip({
  children,
  content,
  hideDelay = 100,
  placement = 'top',
  showDelay = 500,
}: TooltipProps) {
  const [isTooltipOpen, setIsTooltipOpen] = useState(false);

  const {
    context,
    floatingStyles,
    placement: computedPlacement,
    refs,
  } = useFloating({
    middleware: [offset(12), flip(), shift()],
    onOpenChange: setIsTooltipOpen,
    open: isTooltipOpen,
    placement: placement,
    whileElementsMounted: autoUpdate,
  });

  const hover = useHover(context, {
    delay: showDelay,
    move: false,
    restMs: hideDelay,
  });
  const focus = useFocus(context);
  const dismiss = useDismiss(context);
  const role = useRole(context, { role: 'tooltip' });

  const { getFloatingProps, getReferenceProps } = useInteractions([
    hover,
    focus,
    dismiss,
    role,
  ]);

  const translate = {
    bottom: { translateY: -5 },
    left: { translateX: 5 },
    right: { translateX: -5 },
    top: { translateY: 5 },
  }[
    computedPlacement.includes('-')
      ? computedPlacement.split('-')[0]
      : computedPlacement
  ];

  const variants = {
    hidden: { opacity: 0, ...translate },
    show: { opacity: 1, translateX: 0, translateY: 0 },
  };

  return (
    <>
      {cloneElement(
        children,
        getReferenceProps({ ref: refs.setReference, ...children.props }),
      )}

      <AnimatePresence>
        {isTooltipOpen && (
          <div
            ref={refs.setFloating}
            {...getFloatingProps({ style: floatingStyles })}
          >
            <motion.div
              animate="show"
              className={styles.tooltip}
              exit="hidden"
              initial="hidden"
              variants={variants}
            >
              {content}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
