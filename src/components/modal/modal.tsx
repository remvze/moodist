import { useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { IoClose } from 'react-icons/io5/index';
import FocusTrap from 'focus-trap-react';

import { Portal } from '@/components/portal';

import { fade, mix, slideY } from '@/lib/motion';
import { cn } from '@/helpers/styles';

import styles from './modal.module.css';

interface ModalProps {
  children: React.ReactNode;
  lockBody?: boolean;
  onClose: () => void;
  persist?: boolean;
  show: boolean;
  wide?: boolean;
}

export function Modal({
  children,
  lockBody = true,
  onClose,
  persist = false,
  show,
  wide,
}: ModalProps) {
  const variants = {
    modal: mix(fade(), slideY(20)),
    overlay: fade(),
  };

  useEffect(() => {
    if (show && lockBody) {
      document.body.style.overflow = 'hidden';
    } else if (lockBody) {
      document.body.style.overflow = 'auto';
    }
  }, [show, lockBody]);

  useEffect(() => {
    function keyListener(e: KeyboardEvent) {
      if (show && e.key === 'Escape') {
        onClose();
      }
    }

    document.addEventListener('keydown', keyListener);

    return () => document.removeEventListener('keydown', keyListener);
  }, [onClose, show]);

  const animationProps = persist
    ? {
        animate: show ? 'show' : 'hidden',
      }
    : {
        animate: 'show',
        exit: 'hidden',
        initial: 'hidden',
      };

  const content = (
    <FocusTrap active={show}>
      <div>
        <motion.div
          {...animationProps}
          className={styles.overlay}
          variants={variants.overlay}
          onClick={onClose}
          onKeyDown={onClose}
        />
        <div className={styles.modal}>
          <motion.div
            {...animationProps}
            className={cn(styles.content, wide && styles.wide)}
            variants={variants.modal}
          >
            <button className={styles.close} onClick={onClose}>
              <IoClose />
            </button>
            {children}
          </motion.div>
        </div>
      </div>
    </FocusTrap>
  );

  return (
    <Portal>
      {persist ? (
        <div style={{ display: show ? 'block' : 'none' }}>{content}</div>
      ) : (
        <AnimatePresence>{show && content}</AnimatePresence>
      )}
    </Portal>
  );
}
