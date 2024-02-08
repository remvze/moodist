import { Container } from '@/components/container';

import styles from './footer.module.css';

export function Footer() {
  return (
    <footer className={styles.footer}>
      <Container>
        <p>
          Created by <a href="https://twitter.com/remvze">Maze ✦</a>
        </p>
      </Container>
    </footer>
  );
}
