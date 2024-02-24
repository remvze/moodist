import { useMemo } from 'react';
import { Balancer } from 'react-wrap-balancer';
import { BsSoundwave } from 'react-icons/bs/index';

import { Container } from '@/components/container';
import { count as soundCount } from '@/lib/sounds';

import styles from './hero.module.css';

export function Hero() {
  const count = useMemo(soundCount, []);

  return (
    <div className={styles.hero}>
      <Container className={styles.container}>
        <div className={styles.pattern} />

        <img
          alt="Faded Moodist Logo"
          className={styles.logo}
          height={45}
          src="/logo.svg"
          width={45}
        />

        <div className={styles.title}>
          <div className={styles.left}></div>
          <h1>Moodist</h1>
          <div className={styles.right}></div>
        </div>

        <h2 className={styles.desc}>
          <Balancer>Ambient sounds for focus and calm.</Balancer>
        </h2>

        <p className={styles.sounds}>
          <span className={styles.icon}>
            <BsSoundwave />
          </span>
          <span>{count} Sounds</span>
        </p>
      </Container>
    </div>
  );
}
