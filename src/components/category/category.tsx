import { Sounds } from '@/components/sounds';

import styles from './category.module.css';

interface CategoryProps {
  icon: React.ReactNode;
  title: string;
  id: string;
  sounds: Array<{ label: string; src: string }>;
}

export function Category({ icon, sounds, title }: CategoryProps) {
  return (
    <div className={styles.category}>
      <div className={styles.iconContainer}>
        <div className={styles.tail} />
        <div className={styles.icon}>{icon}</div>
      </div>

      <h2 className={styles.title}>{title}</h2>

      <Sounds sounds={sounds} />
    </div>
  );
}
