import { useEffect } from 'react';
import { BiPause, BiPlay } from 'react-icons/bi/index';

import { useSoundStore } from '@/store';
import { usePlay } from '@/contexts/play';

import styles from './play-button.module.css';

export function PlayButton() {
  const { isPlaying, pause, toggle } = usePlay();
  const noSelected = useSoundStore(state => state.noSelected());

  const handleClick = () => {
    if (noSelected) return pause();

    toggle();
  };

  useEffect(() => {
    if (isPlaying && noSelected) pause();
  }, [isPlaying, pause, noSelected]);

  return (
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
  );
}
