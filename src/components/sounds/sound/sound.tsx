import { useCallback, useEffect, forwardRef, useMemo } from 'react';
import { ImSpinner9 } from 'react-icons/im/index';

import { Range } from './range';
import { Favorite } from './favorite';

import { useSound } from '@/hooks/use-sound';
import { useThunder } from '@/hooks/use-thunder';
import { useSoundStore } from '@/stores/sound';
import { useSettingsStore } from '@/stores/settings';
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

interface SoundControl {
  fadeOut: (duration: number) => void;
  isLoading?: boolean;
  pause: (duration?: number) => void;
  play: () => void;
  stop: () => void;
}

interface SoundViewProps {
  functional: boolean;
  hidden: boolean;
  icon: React.ReactNode;
  id: string;
  label: string;
  selectHidden: (key: string) => void;
  sound: SoundControl;
  unselectHidden: (key: string) => void;
}

/**
 * Presentational + interaction wiring shared by every sound tile, regardless
 * of whether it's backed by a static looping sample (useSound) or a
 * procedural generator (useThunder) — both expose the same control shape.
 */
const SoundView = forwardRef<HTMLDivElement, SoundViewProps>(function SoundView(
  { functional, hidden, icon, id, label, selectHidden, sound, unselectHidden },
  ref,
) {
  const isPlaying = useSoundStore(state => state.isPlaying);
  const play = useSoundStore(state => state.play);
  const selectSound = useSoundStore(state => state.select);
  const unselectSound = useSoundStore(state => state.unselect);
  const setVolume = useSoundStore(state => state.setVolume);
  const isSelected = useSoundStore(state => state.sounds[id].isSelected);
  const locked = useSoundStore(state => state.locked);

  useEffect(() => {
    if (locked) return;

    if (isSelected && isPlaying && functional) {
      sound.play();
    } else {
      sound.pause();
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
      <Favorite id={id} label={label} />
      <div className={styles.icon}>
        {sound.isLoading ? (
          <span aria-hidden="true" className={styles.spinner}>
            <ImSpinner9 />
          </span>
        ) : (
          <span aria-hidden="true">{icon}</span>
        )}
      </div>
      <div className={styles.label} id={id}>
        {label}
      </div>
      <Range id={id} label={label} />
    </div>
  );
});

const StaticSound = forwardRef<HTMLDivElement, SoundProps>(function StaticSound(
  { src, ...props },
  ref,
) {
  const volume = useSoundStore(state => state.sounds[props.id].volume);
  const globalVolume = useSettingsStore(state => state.globalVolume);
  const adjustedVolume = useMemo(
    () => volume * globalVolume,
    [volume, globalVolume],
  );

  const sound = useSound(src as string, { loop: true, volume: adjustedVolume });

  return <SoundView {...props} ref={ref} sound={sound} />;
});

const GeneratorSound = forwardRef<HTMLDivElement, SoundProps>(
  function GeneratorSound(props, ref) {
    const volume = useSoundStore(state => state.sounds[props.id].volume);
    const globalVolume = useSettingsStore(state => state.globalVolume);
    const adjustedVolume = useMemo(
      () => volume * globalVolume,
      [volume, globalVolume],
    );

    const sound = useThunder({ volume: adjustedVolume });

    return <SoundView {...props} ref={ref} sound={sound} />;
  },
);

export const Sound = forwardRef<HTMLDivElement, SoundProps>(
  function Sound(props, ref) {
    return props.generator ? (
      <GeneratorSound {...props} ref={ref} />
    ) : (
      <StaticSound {...props} ref={ref} />
    );
  },
);
