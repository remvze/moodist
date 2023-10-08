import { useState, useMemo, useCallback } from 'react';

import { Sound } from '@/components/sound';
import { useLocalStorage } from '@/hooks/use-local-storage';
import { cn } from '@/helpers/styles';

import styles from './sounds.module.css';

interface SoundsProps {
  id: string;
  sounds: Array<{ label: string; src: string; icon: React.ReactNode }>;
}

export function Sounds({ id, sounds }: SoundsProps) {
  const [showAll, setShowAll] = useLocalStorage(`${id}-show-more`, false);

  const [hiddenSelections, setHiddenSelections] = useState<{
    [key: string]: boolean;
  }>({});

  const hasHiddenSelection = useMemo(() => {
    const keys = Object.keys(hiddenSelections);

    return keys.some(key => hiddenSelections[key]);
  }, [hiddenSelections]);

  const selectHidden = useCallback((key: string) => {
    setHiddenSelections(prev => ({
      ...prev,
      [key]: true,
    }));
  }, []);

  const unselectHidden = useCallback((key: string) => {
    setHiddenSelections(prev => ({
      ...prev,
      [key]: false,
    }));
  }, []);

  return (
    <div>
      <div className={styles.sounds}>
        {sounds.map((sound, index) => (
          <Sound
            key={sound.label}
            {...sound}
            hidden={!showAll && index > 3}
            selectHidden={selectHidden}
            unselectHidden={unselectHidden}
          />
        ))}
      </div>

      {sounds.length > 4 && (
        <button
          className={cn(
            styles.button,
            hasHiddenSelection && !showAll && styles.active,
          )}
          onClick={() => setShowAll(prev => !prev)}
        >
          {showAll ? 'Show Less' : 'Show More'}
        </button>
      )}
    </div>
  );
}
