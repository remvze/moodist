import { Container } from '@/components/container';
import { Menu } from './menu';
import { ScrollToTop } from './scroll-to-top';
import { StarterMixes } from '@/components/starter-mixes/starter-mixes';

import styles from './toolbar.module.css';

export function Toolbar() {
  return (
    <div className={styles.wrapper}>
      <Container className={styles.container} wide>
        <ScrollToTop />
        <div className={styles.actions}>
          <StarterMixes />
          <Menu />
        </div>
      </Container>
    </div>
  );
}
