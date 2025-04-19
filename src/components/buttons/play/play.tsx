import { useCallback, useEffect } from 'react';
import { BiPause, BiPlay } from 'react-icons/bi/index';
import { useHotkeys } from 'react-hotkeys-hook';
import { useTranslation } from 'react-i18next';

import { useSoundStore } from '@/stores/sound';
import { useSnackbar } from '@/contexts/snackbar';
import { cn } from '@/helpers/styles';

import styles from './play.module.css';

export function PlayButton() {
  const { t } = useTranslation();
  const isPlaying = useSoundStore(state => state.isPlaying);
  const pause = useSoundStore(state => state.pause);
  const toggle = useSoundStore(state => state.togglePlay);
  const noSelected = useSoundStore(state => state.noSelected());
  const locked = useSoundStore(state => state.locked);

  const showSnackbar = useSnackbar();

  const handleToggle = useCallback(() => {
    if (locked) return;

    if (noSelected) return showSnackbar(t('buttons.playError'));

    toggle();
  }, [showSnackbar, toggle, noSelected, locked, t]);

  useEffect(() => {
    if (isPlaying && noSelected) pause();
  }, [isPlaying, pause, noSelected]);

  useHotkeys('shift+space', handleToggle, {}, [handleToggle]);

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
          {t('buttons.pause.label')}
        </>
      ) : (
        <>
          <span aria-hidden="true">
            <BiPlay />
          </span>{' '}
          {t('buttons.play.label')}
        </>
      )}
    </button>
  );
}
