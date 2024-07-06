import { FaCoffee } from 'react-icons/fa/index';

import { SpecialButton } from '@/components/special-button';

import styles from './donate.module.css';

export function Donate() {
  return (
    <div className={styles.donate}>
      <div className={styles.iconContainer}>
        <div className={styles.tail} />
        <div aria-hidden="true" className={styles.icon}>
          <FaCoffee />
        </div>
      </div>

      <div className={styles.title}>Support Me</div>
      <p className={styles.desc}>Help me keep Moodist ad-free.</p>
      <SpecialButton
        className={styles.button}
        href="https://buymeacoffee.com/remvze"
      >
        Donate Today
      </SpecialButton>
    </div>
  );
}
