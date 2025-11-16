import { FaGlobe } from 'react-icons/fa/index';
import { useTranslation } from '@/hooks/useTranslation';

import styles from './language-switcher.module.css';

interface LanguageSwitcherProps {
  className?: string;
}

export function LanguageSwitcher({ className }: LanguageSwitcherProps) {
  const { currentLang, changeLanguage, t } = useTranslation();

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    changeLanguage(e.target.value);
  };

  return (
    <div className={`${styles.languageSwitcher} ${className || ''}`}>
      <FaGlobe className={styles.icon} />
      <select
        value={currentLang}
        onChange={handleLanguageChange}
        className={styles.select}
        aria-label={t('app.language') || 'Select language'}
      >
        <option value="en">English</option>
        <option value="zh-CN">中文</option>
      </select>
    </div>
  );
}