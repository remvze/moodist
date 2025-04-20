import { useTranslation } from 'react-i18next';
import { Sounds } from '@/components/sounds';

import styles from './category.module.css';
import type { Category as CategoryType } from '@/data/types';

interface CategoryProps extends Omit<CategoryType, 'title'> {
  functional?: boolean;
  titleKey: string;
}

export function Category({
  functional = true,
  icon,
  id,
  sounds,
  titleKey,
}: CategoryProps) {
  const { t } = useTranslation();

  return (
    <div className={styles.category} id={`category-${id}`}>
      <div className={styles.iconContainer}>
        <div className={styles.tail} />
        <div aria-hidden="true" className={styles.icon}>
          {icon}
        </div>
      </div>

      <div className={styles.title}>{t(titleKey)}</div>

      <Sounds functional={functional} id={id} sounds={sounds} />
    </div>
  );
}
