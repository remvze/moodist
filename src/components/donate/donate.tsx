import { Container } from '@/components/container';

import styles from './donate.module.css';

export function Donate() {
  return (
    <Container>
      <section className={styles.wrapper}>
        <p className={styles.text}>
          Enjoy Moodist?{' '}
          <a
            href="https://buymeacoffee.com/remvze"
            rel="noreferrer"
            target="_blank"
          >
            Support with a donation!
          </a>
        </p>
      </section>
    </Container>
  );
}
