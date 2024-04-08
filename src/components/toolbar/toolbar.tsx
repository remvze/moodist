import { Container } from '@/components/container';
import { Menu } from '@/components/menu';
import { ScrollToTop } from '@/components/scroll-to-top';

import styles from './toolbar.module.css';

export function Toolbar() {
  return (
    <div className={styles.wrapper}>
      <Container className={styles.container} wide>
        <ScrollToTop />
        <Menu />
      </Container>
    </div>
  );
}
