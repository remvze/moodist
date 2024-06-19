import { useCallback, useEffect } from 'react';
import { BiPause, BiPlay } from 'react-icons/bi/index';

import { useSoundStore } from '@/stores/sound';
import { useSnackbar } from '@/contexts/snackbar';
import { cn } from '@/helpers/styles';

import styles from './play.module.css';

export function PlayButton() {
  const isPlaying = useSoundStore(state => state.isPlaying);
  const pause = useSoundStore(state => state.pause);
  const toggle = useSoundStore(state => state.togglePlay);
  const noSelected = useSoundStore(state => state.noSelected());
  const locked = useSoundStore(state => state.locked);

  const showSnackbar = useSnackbar();

  const handleToggle = useCallback(() => {
    if (locked) return;

    if (noSelected) return showSnackbar('Please first select a sound to play.');

    toggle();
  }, [showSnackbar, toggle, noSelected, locked]);

  useEffect(() => {
    if (isPlaying && noSelected) pause();
  }, [isPlaying, pause, noSelected]);

  useEffect(() => {
    const listener = (e: KeyboardEvent) => {
      if (e.shiftKey && e.key === ' ') {
        handleToggle();
      }
    };

    document.addEventListener('keydown', listener);

    return () => document.removeEventListener('keydown', listener);
  }, [handleToggle]);

  return (
    <button
      aria-disabled={noSelected}
      className={cn(styles.playButton, noSelected && styles.disabled)}
      onClick={handleToggle}
    >
      {isPlaying ? (
        <>
          <span aria-hidden="true">
            <BiPause />
          </span>{' '}
          Pause
        </>
      ) : (
        <>
          <span aria-hidden="true">
            <BiPlay />
          </span>{' '}
          Play
        </>
      )}
    </button>
  );
}
