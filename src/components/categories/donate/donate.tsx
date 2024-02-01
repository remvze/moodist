import { FaCoffee } from 'react-icons/fa/index';

import styles from './donate.module.css';

export function Donate() {
  return (
    <div className={styles.donate}>
      <div className={styles.iconContainer}>
        <div className={styles.tail} />
        <div className={styles.icon}>
          <FaCoffee />
        </div>
      </div>

      <h2 className={styles.title}>Support Me</h2>
      <p className={styles.desc}>Help me keep Moodist ad-free.</p>
      <a
        className={styles.button}
        href="https://buymeacoffee.com"
        rel="noreferrer"
        target="_blank"
      >
        Donate Today
      </a>
    </div>
  );
}
