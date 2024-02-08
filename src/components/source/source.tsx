import { FaGithub } from 'react-icons/fa/index';

import styles from './source.module.css';
import { Container } from '../container';

export function Source() {
  return (
    <div className={styles.source}>
      <Container>
        <div className={styles.wrapper}>
          <div className={styles.iconContainer}>
            <div className={styles.tail} />
            <div className={styles.icon}>
              <FaGithub />
            </div>
          </div>

          <h2 className={styles.title}>Open Source</h2>
          <p className={styles.desc}>Moodist is free and open-source!</p>
          <a
            className={styles.button}
            href="https://github.com/remvze/moodist"
            rel="noreferrer"
            target="_blank"
          >
            Source Code
          </a>
        </div>
      </Container>
    </div>
  );
}
