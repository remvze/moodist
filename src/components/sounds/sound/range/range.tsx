import { FaVolumeUp, FaTachometerAlt, FaMusic } from 'react-icons/fa/index';
import { useSoundStore } from '@/stores/sound';
import { useTranslation } from '@/hooks/useTranslation';
import { Slider } from '@/components/slider';

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
        <Slider
          disabled={!isSelected}
          max={1}
          min={0}
          step={0.01}
          value={volume}
          onChange={value => !locked && isSelected && setVolume(id, value)}
          className={styles.slider}
        />
      </div>
      <div className={styles.speedContainer}>
        <FaTachometerAlt className={styles.speedIcon} />
        <Slider
          disabled={!isSelected}
          max={2}
          min={0.5}
          step={0.1}
          value={speed}
          onChange={value => !locked && isSelected && setSpeed(id, value)}
          className={styles.slider}
        />
      </div>
      <div className={styles.rateContainer}>
        <FaMusic className={styles.rateIcon} />
        <Slider
          disabled={!isSelected}
          max={2}
          min={0.5}
          step={0.1}
          value={rate}
          onChange={value => !locked && isSelected && setRate(id, value)}
          className={styles.slider}
        />
      </div>
    </div>
  );
}
