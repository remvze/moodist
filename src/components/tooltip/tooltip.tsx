import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as TooltipPrimitive from '@radix-ui/react-tooltip';

import { slideX, slideY, mix, fade } from '@/lib/motion';

import styles from './tooltip.module.css';

type Placement =
  | 'top'
  | 'right'
  | 'bottom'
  | 'left'
  | 'top-start'
  | 'top-end'
  | 'right-start'
  | 'right-end'
  | 'bottom-start'
  | 'bottom-end'
  | 'left-start'
  | 'left-end';

interface TooltipProps {
  children: JSX.Element;
  content: string;
  placement?: Placement;
  showDelay?: number;
}

export function Tooltip({
  children,
  content,
  placement = 'top',
  showDelay = 500,
}: TooltipProps) {
  const [isOpen, setIsOpen] = useState(false);

  const side = placement.split('-')[0] as 'top' | 'right' | 'bottom' | 'left';
  const align = placement.split('-')[1] as
    | 'start'
    | 'end'
    | 'center'
    | undefined;

  const slide = {
    bottom: slideY(-5),
    left: slideX(5),
    right: slideX(-5),
    top: slideY(5),
  }[side];

  const variants = mix(fade(), slide!);

  return (
    <TooltipPrimitive.Provider delayDuration={showDelay}>
      <TooltipPrimitive.Root open={isOpen} onOpenChange={o => setIsOpen(o)}>
        <TooltipPrimitive.Trigger asChild>{children}</TooltipPrimitive.Trigger>

        <AnimatePresence>
          {isOpen && (
            <TooltipPrimitive.Portal forceMount>
              <TooltipPrimitive.Content
                align={align}
                asChild
                className={styles.tooltip}
                collisionPadding={8}
                side={side}
                sideOffset={12}
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
              </TooltipPrimitive.Content>
            </TooltipPrimitive.Portal>
          )}
        </AnimatePresence>
      </TooltipPrimitive.Root>
    </TooltipPrimitive.Provider>
  );
}
