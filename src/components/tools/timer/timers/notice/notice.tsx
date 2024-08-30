import styles from './notice.module.css';

export function Notice() {
  return (
    <p className={styles.notice}>
      Please do not close this tab while timers are running, otherwise all
      timers will be stopped.
    </p>
  );
}
