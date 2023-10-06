import { Sound } from '@/components/sound';

import styles from './sounds.module.css';

interface SoundsProps {
  sounds: Array<{ label: string; src: string }>;
}

export function Sounds({ sounds }: SoundsProps) {
  return (
    <div className={styles.sounds}>
      {sounds.map(sound => (
        <Sound key={sound.label} sound={sound} />
      ))}
    </div>
  );
}
