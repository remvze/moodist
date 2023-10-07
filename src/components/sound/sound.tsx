import { useCallback, useEffect } from 'react';
import { useLocalStorage } from '@/hooks/use-local-storage';

import { useSound } from '@/hooks/use-sound';
import { usePlay } from '@/contexts/play';
import { cn } from '@/helpers/styles';

import styles from './sound.module.css';

interface SoundProps {
  label: string;
  src: string;
}

export function Sound({ label, src }: SoundProps) {
  const { isPlaying, play } = usePlay();
  const [isSelected, setIsSelected] = useLocalStorage(
    `${label}-is-selected`,
    false,
  );
  const [volume, setVolume] = useLocalStorage(`${label}-volume`, 0.5);

  const sound = useSound(src, { loop: true, volume });

  useEffect(() => {
    if (isSelected && isPlaying) {
      sound?.play();
    } else {
      sound?.pause();
    }
  }, [isSelected, sound, isPlaying]);

  const select = useCallback(() => {
    setIsSelected(true);
    play();
  }, [setIsSelected, play]);

  const unselect = useCallback(() => {
    setIsSelected(false);
    setVolume(0.5);
  }, [setIsSelected, setVolume]);

  const toggle = useCallback(() => {
    if (isSelected) return unselect();

    select();
  }, [isSelected, unselect, select]);

  return (
    <div
      className={cn(styles.sound, isSelected && styles.selected)}
      onClick={toggle}
      onKeyDown={toggle}
    >
      <h3 id={label}>{label}</h3>
      <input
        aria-labelledby={label}
        autoComplete="off"
        disabled={!isSelected}
        max={100}
        min={0}
        type="range"
        value={volume * 100}
        onChange={e => isSelected && setVolume(Number(e.target.value) / 100)}
        onClick={e => e.stopPropagation()}
      />
    </div>
  );
}
