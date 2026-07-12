import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Tooltip as TooltipPrimitive } from 'radix-ui';

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
  children: React.ReactNode;
  content: string;
  placement?: Placement;
}

type PlacementSide = 'top' | 'right' | 'bottom' | 'left';
type PlacementAlign = 'start' | 'end' | 'center';
type Motion = ReturnType<typeof slideY>;

export function Tooltip({
  children,
  content,
  placement = 'top',
}: TooltipProps) {
  const [isOpen, setIsOpen] = useState(false);

  const side = placement.split('-')[0] as PlacementSide;
  const align = placement.split('-')[1] as PlacementAlign | undefined;

  const slides: Record<PlacementSide, Motion> = {
    bottom: slideY(-5),
    left: slideX(5),
    right: slideX(-5),
    top: slideY(5),
  };

  const variants = mix(fade(), slides[side]);

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
