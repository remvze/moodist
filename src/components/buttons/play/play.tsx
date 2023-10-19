import { useEffect } from 'react';
import { BiPause, BiPlay } from 'react-icons/bi/index';
import { motion } from 'framer-motion';

import { useSoundStore } from '@/store';
import { cn } from '@/helpers/styles';

import styles from './play.module.css';

export function PlayButton() {
  const isPlaying = useSoundStore(state => state.isPlaying);
  const pause = useSoundStore(state => state.pause);
  const toggle = useSoundStore(state => state.togglePlay);
  const noSelected = useSoundStore(state => state.noSelected());

  const handleClick = () => {
    if (noSelected) return pause();

    toggle();
  };

  useEffect(() => {
    if (isPlaying && noSelected) pause();
  }, [isPlaying, pause, noSelected]);

  return (
    <motion.button
      className={cn(styles.playButton, noSelected && styles.disabled)}
      disabled={noSelected}
      layout
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
    </motion.button>
  );
}
