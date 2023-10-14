import { PlayButton } from './play';
import { UnselectButton } from './unselect';

import styles from './buttons.module.css';

export function Buttons() {
  return (
    <div className={styles.buttons}>
      <PlayButton />
      <UnselectButton />
    </div>
  );
}
