import { Sound } from '@/components/sound';

import styles from './sounds.module.css';

interface SoundsProps {
  color: string;
  sounds: Array<{ label: string; src: string }>;
}

export function Sounds({ color, sounds }: SoundsProps) {
  return (
    <div className={styles.sounds}>
      {sounds.map(sound => (
        <Sound color={color} key={sound.label} sound={sound} />
      ))}
    </div>
  );
}
