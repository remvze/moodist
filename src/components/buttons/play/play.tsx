import { useEffect } from 'react';
import { BiPause, BiPlay } from 'react-icons/bi/index';
import { motion } from 'framer-motion';

import { useSoundStore } from '@/store';
import { useSnackbar } from '@/contexts/snackbar';
import { cn } from '@/helpers/styles';

import styles from './play.module.css';

export function PlayButton() {
  const isPlaying = useSoundStore(state => state.isPlaying);
  const pause = useSoundStore(state => state.pause);
  const toggle = useSoundStore(state => state.togglePlay);
  const noSelected = useSoundStore(state => state.noSelected());

  const showSnackbar = useSnackbar();

  const handleClick = () => {
    if (noSelected) return showSnackbar('Please first select a sound to play.');

    toggle();
  };

  useEffect(() => {
    if (isPlaying && noSelected) pause();
  }, [isPlaying, pause, noSelected]);

  return (
    <motion.button
      className={cn(styles.playButton, noSelected && styles.disabled)}
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
