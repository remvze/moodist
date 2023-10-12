import { motion } from 'framer-motion';

import { Sounds } from '@/components/sounds';

import styles from './category.module.css';

interface CategoryProps {
  icon: React.ReactNode;
  title: string;
  id: string;
  functional?: boolean;
  sounds: Array<{
    label: string;
    src: string;
    icon: React.ReactNode;
    id: string;
  }>;
}

export function Category({
  functional = true,
  icon,
  id,
  sounds,
  title,
}: CategoryProps) {
  return (
    <motion.div
      animate={{ opacity: 1 }}
      className={styles.category}
      initial={{ opacity: 0 }}
      layout="position"
    >
      <div className={styles.iconContainer}>
        <div className={styles.tail} />
        <div className={styles.icon}>{icon}</div>
      </div>

      <h2 className={styles.title}>{title}</h2>

      <Sounds functional={functional} id={id} sounds={sounds} />
    </motion.div>
  );
}
