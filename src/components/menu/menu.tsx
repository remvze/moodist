import { useState } from 'react';
import { IoMenu, IoClose } from 'react-icons/io5/index';
import { AnimatePresence, motion } from 'framer-motion';

import { useSoundStore } from '@/store';
import { slideY, fade, mix } from '@/lib/motion';

import styles from './menu.module.css';

export function Menu() {
  const [isOpen, setIsOpen] = useState(false);

  const shuffle = useSoundStore(state => state.shuffle);

  const variants = mix(slideY(-20), fade());

  return (
    <div className={styles.wrapper}>
      <button
        aria-label="Menu"
        className={styles.menuButton}
        onClick={() => setIsOpen(prev => !prev)}
      >
        {isOpen ? <IoClose /> : <IoMenu />}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            animate="show"
            className={styles.menu}
            exit="hidden"
            initial="hidden"
            variants={variants}
          >
            <button className={styles.menuItem} onClick={shuffle}>
              Shuffle Sounds
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
