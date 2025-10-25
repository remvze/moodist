import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
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
}

export function Tooltip({
  children,
  content,
  placement = 'top',
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
  );
}

interface TooltipProviderProps {
  children: React.ReactNode;
  delayDuration?: number;
  skipDelayDuration?: number;
}

function Provider({
  children,
  delayDuration = 500,
  skipDelayDuration = 0,
}: TooltipProviderProps) {
  return (
    <TooltipPrimitive.Provider
      delayDuration={delayDuration}
      skipDelayDuration={skipDelayDuration}
    >
      {children}
    </TooltipPrimitive.Provider>
  );
}

Tooltip.Provider = Provider;
