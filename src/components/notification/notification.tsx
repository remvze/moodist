import { AnimatePresence } from 'motion/react';
import styles from './notification.module.css';

interface NotificationProps {
  show: boolean;
  message: string;
  type: 'success' | 'error';
  onClose: () => void;
}

export function Notification({ show, message, type, onClose }: NotificationProps) {
  return (
    <AnimatePresence>
      {show && (
        <div className={`${styles.notification} ${styles[type]}`}>
          <div className={styles.notificationContent}>
            <span className={styles.notificationMessage}>
              {message}
            </span>
            <button
              className={styles.notificationClose}
              onClick={onClose}
              aria-label="关闭通知"
            >
              ×
            </button>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
}