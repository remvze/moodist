import { useState, useEffect } from 'react';
import { BiUpArrowAlt } from 'react-icons/bi/index';
import { motion, AnimatePresence } from 'framer-motion';

import { mix, fade, slideY } from '@/lib/motion';

import styles from './scroll-to-top.module.css';

export function ScrollToTop() {
  const TOP = 50;

  const [isVisible, setIsVisible] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({ behavior: 'smooth', top: 0 });
  };

  useEffect(() => {
    const onScroll = () => {
      setIsVisible(document.documentElement.scrollTop >= TOP);
    };

    onScroll();

    document.addEventListener('scroll', onScroll);

    return () => document.removeEventListener('scroll', onScroll);
  }, []);

  const variants = mix(fade(), slideY(10, 0));

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          animate="show"
          aria-label="Scroll to top"
          className={styles.button}
          exit="hidden"
          initial="hidden"
          variants={variants}
          onClick={scrollToTop}
        >
          <BiUpArrowAlt />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
