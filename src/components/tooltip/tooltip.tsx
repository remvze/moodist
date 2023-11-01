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

import { slideX, slideY, mix, fade } from '@/lib/motion';

import styles from './tooltip.module.css';

interface TooltipProps {
  children: JSX.Element;
  content: string;
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
    middleware: [offset(12), flip(), shift({ padding: 8 })],
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

  const slide = {
    bottom: slideY(-5),
    left: slideX(5),
    right: slideX(-5),
    top: slideY(5),
  }[
    computedPlacement.includes('-')
      ? computedPlacement.split('-')[0]
      : computedPlacement
  ];

  const variants = mix(fade(), slide!);
  const textVariants = fade();

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
            {...getFloatingProps({ style: { ...floatingStyles, zIndex: 99 } })}
          >
            <motion.div
              animate="show"
              className={styles.tooltip}
              exit="hidden"
              initial="hidden"
              variants={variants}
            >
              <AnimatePresence initial={false} mode="wait">
                <motion.span
                  animate="show"
                  exit="hidden"
                  initial="hidden"
                  key={content}
                  transition={{ duration: 0.15 }}
                  variants={textVariants}
                >
                  {content}
                </motion.span>
              </AnimatePresence>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
