import { PlayButton } from './play';
import { UnselectButton } from './unselect';
import { SaveButton } from './save';

import styles from './buttons.module.css';

export function Buttons() {
  return (
    <div className={styles.buttons}>
      <PlayButton />
      <SaveButton />
      <UnselectButton />
    </div>
  );
}
