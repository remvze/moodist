import styles from './notice.module.css';

export function Notice() {
  return (
    <p className={styles.notice}>
      Please do not close your browser tab while timers are running, otherwise
      all timers will be stopped.
    </p>
  );
}
