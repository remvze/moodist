import { useMemo } from 'react';

import { Container } from '@/components/container';
import { sounds } from '@/data/sounds';

import styles from './about.module.css';

export function About() {
  const count = useMemo(() => {
    let count = 0;

    sounds.categories.forEach(category => {
      count += category.sounds.length;
    });

    return count;
  }, []);

  return (
    <div className={styles.about}>
      <Container>
        <h2 className={styles.title}>What is Moodist?</h2>
        <p className={styles.desc}>
          Moodist is your gateway to a world of serenity and focus. It&apos;s a
          free online ambient sound generator offering <span>{count}</span>{' '}
          handpicked sounds in various categories, from nature&apos;s tranquil
          melodies to the soothing ambiance of urban life. Whether you&apos;re
          seeking relaxation or a productivity boost, Moodist lets you
          effortlessly customize your environment with the perfect background
          sounds.
        </p>
      </Container>
    </div>
  );
}
