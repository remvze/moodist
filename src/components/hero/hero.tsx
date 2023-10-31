import { Balancer } from 'react-wrap-balancer';

import { Container } from '@/components/container';

import styles from './hero.module.css';

export function Hero() {
  return (
    <div className={styles.hero}>
      <Container>
        <img
          alt="Faded Moodist Logo"
          className={styles.logo}
          src="/faded-logo.svg"
        />

        <div className={styles.title}>
          <div className={styles.left} />
          <h1>Moodist</h1>
          <div className={styles.right} />
        </div>

        <p className={styles.desc}>
          <Balancer>Ambient sounds for focus and calm.</Balancer>
        </p>

        <p className={styles.free}>100% Free</p>
      </Container>
    </div>
  );
}
