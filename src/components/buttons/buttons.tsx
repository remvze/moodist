import { useEffect } from 'react';
import { BiPause, BiPlay, BiShuffle } from 'react-icons/bi/index';

import { useSoundStore } from '@/store';
import { usePlay } from '@/contexts/play';

import styles from './buttons.module.css';

export function Buttons() {
  const { isPlaying, pause, play, toggle } = usePlay();
  const noSelected = useSoundStore(state => state.noSelected());
  const shuffle = useSoundStore(state => state.shuffle);

  const handleClick = () => {
    if (noSelected) return pause();

    toggle();
  };

  useEffect(() => {
    if (isPlaying && noSelected) pause();
  }, [isPlaying, pause, noSelected]);

  return (
    <div className={styles.buttons}>
      <button className={styles.playButton} onClick={handleClick}>
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
        aria-label="Shuffle Sounds"
        className={styles.shuffleButton}
        onClick={() => {
          shuffle();
          play();
        }}
      >
        <BiShuffle />
      </button>
    </div>
  );
}
