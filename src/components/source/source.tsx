import { FaGithub } from 'react-icons/fa/index';

import { Container } from '@/components/container';
import { SpecialButton } from '@/components/special-button';

import styles from './source.module.css';

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
          <SpecialButton
            className={styles.button}
            href="https://github.com/remvze/moodist"
          >
            Source Code
          </SpecialButton>
        </div>
      </Container>
    </div>
  );
}
