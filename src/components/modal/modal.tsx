import { AnimatePresence } from 'framer-motion';

import styles from './modal.module.css';

interface ModalProps {
  children: React.ReactNode;
  onClose: () => void;
  show: boolean;
}

export function Modal({ children, onClose, show }: ModalProps) {
  return (
    <AnimatePresence>
      {show && (
        <>
          <div
            className={styles.overlay}
            onClick={onClose}
            onKeyDown={onClose}
          />
          <div className={styles.modal}>
            <div className={styles.content}>{children}</div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
