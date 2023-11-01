import { BiShuffle } from 'react-icons/bi/index';

import { Tooltip } from '@/components/tooltip';
import { useSoundStore } from '@/store';

import styles from './shuffle.module.css';

export function Shuffle() {
  const shuffle = useSoundStore(state => state.shuffle);

  return (
    <Tooltip content="Shuffle sounds" hideDelay={0} showDelay={0}>
      <button
        aria-label="Shuffle sounds"
        className={styles.button}
        onClick={shuffle}
      >
        <BiShuffle />
      </button>
    </Tooltip>
  );
}
