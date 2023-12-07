import { useMemo } from 'react';

import { Container } from '@/components/container';
import { count as soundCount } from '@/lib/sounds';

import styles from './about.module.css';

export function About() {
  const count = useMemo(soundCount, []);

  return (
    <div className={styles.about}>
      <Container>
        <div className={styles.titleWrapper}>
          <h2 className={styles.title}>What is Moodist?</h2>
          <div className={styles.line} />
        </div>
        <p className={styles.desc}>
          Welcome to Moodist – your free, open-source ambient sound generator.
          With <span>{count} curated sounds</span>, effortlessly create your
          custom mix for focus or relaxation. No accounts, no hassle – just pure
          tranquility. Explore nature&apos;s calm and urban rhythms. Elevate
          your ambiance with Moodist, where simplicity meets serenity.
        </p>
      </Container>
    </div>
  );
}
