import { AnimatePresence } from 'framer-motion';
import { IoClose } from 'react-icons/io5/index';

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
            <div className={styles.content}>
              <button className={styles.close} onClick={onClose}>
                <IoClose />
              </button>

              {children}
            </div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
