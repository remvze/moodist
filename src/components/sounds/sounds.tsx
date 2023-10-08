import { Sound } from '@/components/sound';
import { useLocalStorage } from '@/hooks/use-local-storage';

import styles from './sounds.module.css';

interface SoundsProps {
  id: string;
  sounds: Array<{ label: string; src: string; icon: React.ReactNode }>;
}

export function Sounds({ id, sounds }: SoundsProps) {
  const [showAll, setShowAll] = useLocalStorage(`${id}-show-more`, false);

  return (
    <div>
      <div className={styles.sounds}>
        {sounds.map((sound, index) => (
          <Sound key={sound.label} {...sound} hidden={!showAll && index > 3} />
        ))}
      </div>

      {sounds.length > 4 && (
        <button
          className={styles.button}
          onClick={() => setShowAll(prev => !prev)}
        >
          {showAll ? 'Show Less' : 'Show More'}
        </button>
      )}
    </div>
  );
}
