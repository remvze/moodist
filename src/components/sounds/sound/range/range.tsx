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
  const volume = useSoundStore(state => state.sounds[id].volume);
  const isSelected = useSoundStore(state => state.sounds[id].isSelected);
  const locked = useSoundStore(state => state.locked);

  return (
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
  );
}
