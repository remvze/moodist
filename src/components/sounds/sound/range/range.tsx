import { FaVolumeUp, FaTachometerAlt, FaMusic } from 'react-icons/fa/index';
import { useSoundStore } from '@/stores/sound';
import { useTranslation } from '@/hooks/useTranslation';

import styles from './range.module.css';

interface RangeProps {
  id: string;
  label: string;
}

export function Range({ id, label }: RangeProps) {
  const { t } = useTranslation();
  const setVolume = useSoundStore(state => state.setVolume);
  const setSpeed = useSoundStore(state => state.setSpeed);
  const setRate = useSoundStore(state => state.setRate);
  const volume = useSoundStore(state => state.sounds[id].volume);
  const speed = useSoundStore(state => state.sounds[id].speed);
  const rate = useSoundStore(state => state.sounds[id].rate);
  const isSelected = useSoundStore(state => state.sounds[id].isSelected);
  const locked = useSoundStore(state => state.locked);

  return (
    <div className={styles.controlsContainer}>
      <div className={styles.volumeContainer}>
        <FaVolumeUp className={styles.volumeIcon} />
        <input
          aria-label={`${label} ${t('volume').toLowerCase()}`}
          autoComplete="off"
          className={styles.range}
          disabled={!isSelected}
          max={100}
          min={0}
          type="range"
          value={volume * 100}
          onClick={e => e.stopPropagation()}
          onChange={e =>
            !locked && isSelected && setVolume(id, Number(e.target.value) / 100)
          }
        />
      </div>
      <div className={styles.speedContainer}>
        <FaTachometerAlt className={styles.speedIcon} />
        <input
          aria-label={`${label} speed`}
          autoComplete="off"
          className={styles.range}
          disabled={!isSelected}
          max={200}
          min={50}
          step={10}
          type="range"
          value={speed * 100}
          onClick={e => e.stopPropagation()}
          onChange={e =>
            !locked && isSelected && setSpeed(id, Number(e.target.value) / 100)
          }
        />
      </div>
      <div className={styles.rateContainer}>
        <FaMusic className={styles.rateIcon} />
        <input
          aria-label={`${label} rate`}
          autoComplete="off"
          className={styles.range}
          disabled={!isSelected}
          max={200}
          min={50}
          step={10}
          type="range"
          value={rate * 100}
          onClick={e => e.stopPropagation()}
          onChange={e =>
            !locked && isSelected && setRate(id, Number(e.target.value) / 100)
          }
        />
      </div>
    </div>
  );
}
