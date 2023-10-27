import { useSoundStore } from '@/store';

import styles from './range.module.css';

interface RangeProps {
  id: string;
}

export function Range({ id }: RangeProps) {
  const setVolume = useSoundStore(state => state.setVolume);
  const volume = useSoundStore(state => state.sounds[id].volume);
  const isSelected = useSoundStore(state => state.sounds[id].isSelected);

  return (
    <input
      aria-labelledby={id}
      autoComplete="off"
      className={styles.range}
      disabled={!isSelected}
      max={100}
      min={0}
      type="range"
      value={volume * 100}
      onChange={e => isSelected && setVolume(id, Number(e.target.value) / 100)}
      onClick={e => e.stopPropagation()}
    />
  );
}
