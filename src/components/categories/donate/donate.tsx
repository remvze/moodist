import { FaCoffee } from 'react-icons/fa/index';

import { SpecialButton } from '@/components/special-button';
import { useTranslation } from '@/hooks/useTranslation';

import styles from './donate.module.css';

export function Donate() {
  const { t } = useTranslation();

  return (
    <div className={styles.donate}>
      <div className={styles.iconContainer}>
        <div className={styles.tail} />
        <div aria-hidden="true" className={styles.icon}>
          <FaCoffee />
        </div>
      </div>

      <div className={styles.title}>
        <span>{t('supportMe')}</span>
      </div>
      <p className={styles.desc}>{t('helpKeepAdFree')}</p>
      <SpecialButton
        className={styles.button}
        href="https://buymeacoffee.com/remvze"
      >
        {t('donateToday')}
      </SpecialButton>
    </div>
  );
}
