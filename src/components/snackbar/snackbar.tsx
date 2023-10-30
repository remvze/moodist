import { motion } from 'framer-motion';

import { mix, fade, slideY } from '@/lib/motion';

import styles from './snackbar.module.css';

interface SnackbarProps {
  message: string;
}

export function Snackbar({ message }: SnackbarProps) {
  const variants = mix(fade(), slideY(20, 0));

  return (
    <div className={styles.wrapper}>
      <motion.div
        animate="show"
        className={styles.snackbar}
        exit="hidden"
        initial="hidden"
        variants={variants}
      >
        {message}
      </motion.div>
    </div>
  );
}
