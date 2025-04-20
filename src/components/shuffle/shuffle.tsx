import { BiShuffle } from 'react-icons/bi/index';
import { useTranslation } from 'react-i18next';

import { Tooltip } from '@/components/tooltip';
import { useSoundStore } from '@/stores/sound';

import styles from './shuffle.module.css';

export function Shuffle() {
  const { t } = useTranslation();
  const shuffle = useSoundStore(state => state.shuffle);
  const shuffleLabel = t('toolbar.items.shuffle'); // Get translated label

  return (
    <Tooltip content={shuffleLabel} showDelay={0}>
      <button
        aria-label={shuffleLabel}
        className={styles.button}
        onClick={shuffle}
      >
        <BiShuffle />
      </button>
    </Tooltip>
  );
}
