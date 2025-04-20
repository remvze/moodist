import { useTranslation } from 'react-i18next';
import { useSoundStore } from '@/stores/sound';

import styles from './range.module.css';

interface RangeProps {
  id: string;
  label: string;
}

export function Range({ id, label }: RangeProps) {
  const { t } = useTranslation();
  const setVolume = useSoundStore(state => state.setVolume);
  const soundState = useSoundStore(state => state.sounds[id]);
  const locked = useSoundStore(state => state.locked);

  if (!soundState) {
    return null;
  }

  const { isSelected, volume } = soundState;

  return (
    <input
      aria-label={t('volume.aria-label', { label: label })}
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
  );
}
