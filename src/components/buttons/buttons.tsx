import { useEffect } from 'react';
import { BiPause, BiPlay, BiUndo, BiTrash } from 'react-icons/bi/index';

import { useSoundStore } from '@/store';
import { usePlay } from '@/contexts/play';
import { cn } from '@/helpers/styles';

import styles from './buttons.module.css';

export function Buttons() {
  const { isPlaying, pause, toggle } = usePlay();
  const noSelected = useSoundStore(state => state.noSelected());
  const restoreHistory = useSoundStore(state => state.restoreHistory);
  const hasHistory = useSoundStore(state => !!state.history);
  const unselectAll = useSoundStore(state => state.unselectAll);

  const handleClick = () => {
    if (noSelected) return pause();

    toggle();
  };

  useEffect(() => {
    if (isPlaying && noSelected) pause();
  }, [isPlaying, pause, noSelected]);

  return (
    <div className={styles.buttons}>
      <button
        className={cn(styles.playButton, noSelected && styles.disabled)}
        disabled={noSelected}
        onClick={handleClick}
      >
        {isPlaying ? (
          <>
            <span>
              <BiPause />
            </span>{' '}
            Pause
          </>
        ) : (
          <>
            <span>
              <BiPlay />
            </span>{' '}
            Play
          </>
        )}
      </button>

      <button
        disabled={noSelected && !hasHistory}
        aria-label={
          hasHistory ? 'Restore Unselected Sounds' : 'Unselect All Sounds'
        }
        className={cn(
          styles.smallButton,
          hasHistory ? styles.restore : styles.delete,
          noSelected && !hasHistory && styles.disabled,
        )}
        onClick={() => {
          if (hasHistory) restoreHistory();
          else if (!noSelected) unselectAll(true);
        }}
      >
        {hasHistory ? <BiUndo /> : <BiTrash />}
      </button>
    </div>
  );
}
