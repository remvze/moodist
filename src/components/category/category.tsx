import { useMemo } from 'react';

import { cn } from '@/helpers/styles';

import styles from './category.module.css';

interface CategoryProps {
  color: string;
  icon: React.ReactNode;
  title: string;
  id: string;
  sounds: Array<{ label: string; src: string }>;
}

export function Category({ color, icon, title }: CategoryProps) {
  const colorStyle = useMemo(() => {
    const colorToStyle: { [color: string]: string } = {
      green: styles.green,
      indigo: styles.indigo,
    };

    return colorToStyle[color];
  }, [color]);

  return (
    <div className={styles.category}>
      <div className={styles.iconContainer}>
        <div className={cn(styles.tail, colorStyle)} />
        <div className={cn(styles.icon, colorStyle)}>{icon}</div>
      </div>

      <h2 className={styles.title}>{title}</h2>
    </div>
  );
}
