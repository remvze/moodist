import { useEffect } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { IoClose } from 'react-icons/io5/index';
import FocusTrap from 'focus-trap-react';

import { Portal } from '@/components/portal';

import { fade, mix, slideY } from '@/lib/motion';
import { cn } from '@/helpers/styles';

import styles from './modal.module.css';

interface ModalProps {
  children: React.ReactNode;
  docked?: boolean;
  closeOnEscape?: boolean;
  lockBody?: boolean;
  onClose: () => void;
  persist?: boolean;
  portalContainerRef?: React.Ref<HTMLDivElement>;
  show: boolean;
  wide?: boolean;
}

const TRANSITION_DURATION = 300;

export function Modal({
  children,
  docked = false,
  closeOnEscape = true,
  lockBody = true,
  onClose,
  persist = false,
  portalContainerRef,
  show,
  wide,
}: ModalProps) {
  const variants = {
    modal: mix(fade(), slideY(20)),
    overlay: fade(),
  };

  useEffect(() => {
    if (!show || !lockBody || docked) return;

    const previousOverflow = document.body.style.overflowY;
    document.body.style.overflowY = 'hidden';

    return () => {
      document.body.style.overflowY = previousOverflow;
    };
  }, [show, lockBody, docked]);

  useEffect(() => {
    function keyListener(e: KeyboardEvent) {
      if (show && closeOnEscape && e.key === 'Escape') {
        onClose();
      }
    }

    document.addEventListener('keydown', keyListener);

    return () => document.removeEventListener('keydown', keyListener);
  }, [closeOnEscape, onClose, show]);

  const animationProps = persist
    ? {
        animate: show ? 'show' : 'hidden',
      }
    : {
        animate: 'show',
        exit: 'hidden',
        initial: 'hidden',
      };

  if (docked) {
    return show ? (
      <Portal>
        <section
          aria-label="Tool workspace"
          className={styles.docked}
          id="focus-tool-panel"
        >
          <button
            aria-label="Minimize tool"
            className={styles.minimize}
            onClick={onClose}
            type="button"
          >
            <IoClose />
          </button>
          {children}
        </section>
      </Portal>
    ) : null;
  }

  const content = (
    <FocusTrap active={show}>
      <div>
        <motion.div
          {...animationProps}
          className={styles.overlay}
          transition={{ duration: TRANSITION_DURATION / 1000 }}
          variants={variants.overlay}
          onClick={onClose}
          onKeyDown={onClose}
        />
        <div className={styles.modal}>
          <motion.div
            {...animationProps}
            className={cn(styles.content, wide && styles.wide)}
            transition={{ duration: TRANSITION_DURATION / 1000 }}
            variants={variants.modal}
          >
            <button
              aria-label="Close dialog"
              className={styles.close}
              onClick={onClose}
            >
              <IoClose />
            </button>
            {children}
          </motion.div>
        </div>
        {portalContainerRef && <div ref={portalContainerRef} />}
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
