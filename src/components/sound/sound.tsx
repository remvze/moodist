import { useState, useEffect } from 'react';

import { cn } from '@/helpers/styles';

import styles from './sound.module.css';

interface SoundProps {
  sound: { label: string; src: string };
}

export function Sound({ sound }: SoundProps) {
  const [isSelected, setIsSelected] = useState(false);
  const [volume, setVolume] = useState(0.5);

  useEffect(() => {
    if (!isSelected) setVolume(0.5);
  }, [isSelected]);

  return (
    <div
      className={cn(styles.sound, isSelected && styles.selected)}
      onClick={() => setIsSelected(prev => !prev)}
      onKeyDown={() => setIsSelected(prev => !prev)}
    >
      <h3>{sound.label}</h3>
      <input
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
