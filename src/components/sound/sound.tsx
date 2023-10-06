import { useState, useEffect } from 'react';

import { useSound } from '@/hooks/use-sound';
import { cn } from '@/helpers/styles';

import styles from './sound.module.css';

interface SoundProps {
  label: string;
  src: string;
}

export function Sound({ label, src }: SoundProps) {
  const [isSelected, setIsSelected] = useState(false);
  const [volume, setVolume] = useState(0.5);

  const sound = useSound(src, { loop: true, volume });

  useEffect(() => {
    if (!isSelected) {
      sound?.pause();
      setVolume(0.5);
    }

    if (isSelected) {
      sound?.play();
    }
  }, [isSelected, sound]);

  return (
    <div
      className={cn(styles.sound, isSelected && styles.selected)}
      onClick={() => setIsSelected(prev => !prev)}
      onKeyDown={() => setIsSelected(prev => !prev)}
    >
      <h3>{label}</h3>
      <input
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
