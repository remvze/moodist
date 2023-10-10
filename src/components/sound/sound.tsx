import { useCallback, useEffect } from 'react';

import { useSound } from '@/hooks/use-sound';
import { useSoundStore } from '@/store';
import { usePlay } from '@/contexts/play';
import { cn } from '@/helpers/styles';

import styles from './sound.module.css';

interface SoundProps {
  label: string;
  src: string;
  icon: React.ReactNode;
  hidden: boolean;
  id: string;
  selectHidden: (key: string) => void;
  unselectHidden: (key: string) => void;
}

export function Sound({
  hidden,
  icon,
  id,
  label,
  selectHidden,
  src,
  unselectHidden,
}: SoundProps) {
  const { isPlaying, play } = usePlay();
  // const [isSelected, setIsSelected] = useLocalStorage(
  //   `${label}-is-selected`,
  //   false,
  // );
  // const [volume, setVolume] = useLocalStorage(`${label}-volume`, 0.5);

  const select = useSoundStore(state => state.select);
  const unselect = useSoundStore(state => state.unselect);
  const setVolume = useSoundStore(state => state.setVolume);
  const volume = useSoundStore(state => state.sounds[id].volume);
  const isSelected = useSoundStore(state => state.sounds[id].isSelected);

  const sound = useSound(src, { loop: true, volume });

  useEffect(() => {
    if (isSelected && isPlaying) {
      sound?.play();
    } else {
      sound?.pause();
    }
  }, [isSelected, sound, isPlaying]);

  useEffect(() => {
    if (hidden && isSelected) selectHidden(label);
    else if (hidden && !isSelected) unselectHidden(label);
  }, [label, isSelected, hidden, selectHidden, unselectHidden]);

  const _select = useCallback(() => {
    select(id);
    play();
  }, [select, play, id]);

  const _unselect = useCallback(() => {
    unselect(id);
    setVolume(id, 0.5);
  }, [unselect, setVolume, id]);

  const toggle = useCallback(() => {
    if (isSelected) return _unselect();

    _select();
  }, [isSelected, _unselect, _select]);

  return (
    <div
      className={cn(
        styles.sound,
        isSelected && styles.selected,
        hidden && styles.hidden,
      )}
      onClick={toggle}
      onKeyDown={toggle}
    >
      <div className={styles.icon}>{icon}</div>

      <h3 id={label}>{label}</h3>
      <input
        aria-labelledby={label}
        autoComplete="off"
        disabled={!isSelected}
        max={100}
        min={0}
        type="range"
        value={volume * 100}
        onClick={e => e.stopPropagation()}
        onChange={e =>
          isSelected && setVolume(id, Number(e.target.value) / 100)
        }
      />
    </div>
  );
}
