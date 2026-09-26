import { useCallback, useEffect, forwardRef, useMemo } from 'react';
import { ImSpinner9 } from 'react-icons/im/index';
import { TbWaveSine } from 'react-icons/tb/index';

import { Range } from './range';
import { Favorite } from './favorite';

import { useSound } from '@/hooks/use-sound';
import { useSoundStore } from '@/stores/sound';
import { useSettingsStore } from '@/stores/settings';
import { useLoadingStore } from '@/stores/loading';
import { cn } from '@/helpers/styles';

import styles from './sound.module.css';

import type { Sound as SoundType } from '@/data/types';

import { useKeyboardButton } from '@/hooks/use-keyboard-button';

interface SoundProps extends SoundType {
  functional: boolean;
  hidden: boolean;
  selectHidden: (key: string) => void;
  unselectHidden: (key: string) => void;
}

export const Sound = forwardRef<HTMLDivElement, SoundProps>(function Sound(
  { functional, hidden, icon, id, label, selectHidden, src, unselectHidden },
  ref,
) {
  const isPlaying = useSoundStore(state => state.isPlaying);
  const play = useSoundStore(state => state.play);
  const selectSound = useSoundStore(state => state.select);
  const unselectSound = useSoundStore(state => state.unselect);
  const setVolume = useSoundStore(state => state.setVolume);
  const isSelected = useSoundStore(state => state.sounds[id].isSelected);
  const isOscillating = useSoundStore(state => state.sounds[id].isOscillating);
  const toggleOscillation = useSoundStore(state => state.toggleOscillation);
  const locked = useSoundStore(state => state.locked);

  const volume = useSoundStore(state => state.sounds[id].volume);
  const globalVolume = useSettingsStore(state => state.globalVolume);
  const adjustedVolume = useMemo(
    () => volume * globalVolume,
    [volume, globalVolume],
  );

  const isLoading = useLoadingStore(state => state.loaders[src]);

  const sound = useSound(src, {
    active: isSelected && isPlaying && functional,
    loop: true,
    oscillate: isOscillating,
    volume: adjustedVolume,
  });

  useEffect(() => {
    if (locked) return;

    if (isSelected && isPlaying && functional) {
      sound?.play();
    } else {
      sound?.pause();
    }
  }, [isSelected, sound, isPlaying, functional, locked]);

  useEffect(() => {
    if (hidden && isSelected) selectHidden(label);
    else if (hidden && !isSelected) unselectHidden(label);
  }, [label, isSelected, hidden, selectHidden, unselectHidden]);

  const select = useCallback(() => {
    if (locked) return;
    selectSound(id);
    play();
  }, [selectSound, play, id, locked]);

  const unselect = useCallback(() => {
    if (locked) return;
    unselectSound(id);
    setVolume(id, 0.5);
  }, [unselectSound, setVolume, id, locked]);

  const toggle = useCallback(() => {
    if (locked) return;
    if (isSelected) unselect();
    else select();
  }, [isSelected, select, unselect, locked]);

  const handleClick = useCallback(() => {
    toggle();
  }, [toggle]);

  const handleKeyDown = useKeyboardButton(() => {
    toggle();
  });

  return (
    <div
      aria-label={`${label} sound`}
      ref={ref}
      role="button"
      tabIndex={0}
      className={cn(
        styles.sound,
        isSelected && styles.selected,
        hidden && styles.hidden,
      )}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
    >
      <div className={styles.icon}>
        {isLoading ? (
          <span aria-hidden="true" className={styles.spinner}>
            <ImSpinner9 />
          </span>
        ) : (
          <span aria-hidden="true">{icon}</span>
        )}
      </div>
      <div className={styles.content}>
        <div className={styles.heading}>
          <div className={styles.label} id={id}>
            {label}
          </div>
          <Favorite id={id} label={label} />
        </div>
        <div className={styles.controls}>
          <Range id={id} label={label} />
          {isSelected && (
            <button
              aria-label={`Oscillate ${label} volume`}
              aria-pressed={isOscillating}
              className={cn(
                styles.oscillation,
                isOscillating && styles.oscillating,
              )}
              disabled={locked}
              title="Gently raise and lower volume"
              type="button"
              onClick={event => {
                event.stopPropagation();
                toggleOscillation(id);
              }}
              onKeyDown={event => event.stopPropagation()}
            >
              <TbWaveSine aria-hidden="true" />
              <span>Swell</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
});
