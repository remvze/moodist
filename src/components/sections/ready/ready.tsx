import { RiSparkling2Line } from 'react-icons/ri/index';

import { Container } from '@/components/container';

import styles from './ready.module.css';

export function Ready() {
  return (
    <div className={styles.ready}>
      <Container>
        <div className={styles.iconContainer}>
          <div className={styles.tail} />
          <div className={styles.icon}>
            <RiSparkling2Line />
          </div>
        </div>

        <h2 className={styles.title}>Are you ready?</h2>
        <p className={styles.desc}>Create your calm oasis in seconds!</p>
        <a className={styles.button} href="#app">
          Use Moodist
        </a>
      </Container>
    </div>
  );
}
