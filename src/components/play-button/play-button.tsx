import { BiPause, BiPlay } from 'react-icons/bi';

import { usePlay } from '@/contexts/play';

import styles from './play-button.module.css';

export function PlayButton() {
  const { isPlaying, toggle } = usePlay();

  return (
    <button className={styles.playButton} onClick={toggle}>
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
