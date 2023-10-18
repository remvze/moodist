import { motion } from 'framer-motion';

import { Sounds } from '@/components/sounds';
import { fade } from '@/lib/motion';

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
  const variants = fade();

  return (
    <motion.div
      animate="show"
      className={styles.category}
      initial="hidden"
      layout="position"
      variants={variants}
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
