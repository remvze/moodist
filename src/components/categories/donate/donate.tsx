import { FaCoffee } from 'react-icons/fa/index';
import { useTranslation } from 'react-i18next';
import { SpecialButton } from '@/components/special-button';

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
        <span>{t('donate.section-title')}</span>
      </div>
      <p className={styles.desc}>{t('donate.section-desc')}</p>
      <SpecialButton
        className={styles.button}
        href="https://buymeacoffee.com/remvze"
      >
        {t('donate.section-button')}
      </SpecialButton>
    </div>
  );
}
