import { BiShuffle } from 'react-icons/bi/index';

import { Tooltip } from '@/components/tooltip';
import { useSoundStore } from '@/stores/sound';

import styles from './shuffle.module.css';

export function Shuffle() {
  const shuffle = useSoundStore(state => state.shuffle);

  return (
    <Tooltip.Provider delayDuration={0}>
      <Tooltip content="Shuffle sounds">
        <button
          aria-label="Shuffle sounds"
          className={styles.button}
          onClick={shuffle}
        >
          <BiShuffle />
        </button>
      </Tooltip>
    </Tooltip.Provider>
  );
}
