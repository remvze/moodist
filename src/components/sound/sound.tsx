import { useCallback, useEffect } from 'react';
import { ImSpinner9 } from 'react-icons/im/index';

import { Range } from './range';
import { Favorite } from './favorite';

import { useSound } from '@/hooks/use-sound';
import { useSoundStore, useLoadingStore } from '@/store';
import { cn } from '@/helpers/styles';

import styles from './sound.module.css';

import type { Sound } from '@/data/types';

interface SoundProps extends Sound {
  functional: boolean;
  hidden: boolean;
  selectHidden: (key: string) => void;
  unselectHidden: (key: string) => void;
}

export function Sound({
  functional,
  hidden,
  icon,
  id,
  label,
  selectHidden,
  src,
  unselectHidden,
}: SoundProps) {
  const isPlaying = useSoundStore(state => state.isPlaying);
  const play = useSoundStore(state => state.play);
  const select = useSoundStore(state => state.select);
  const unselect = useSoundStore(state => state.unselect);
  const setVolume = useSoundStore(state => state.setVolume);
  const volume = useSoundStore(state => state.sounds[id].volume);
  const isSelected = useSoundStore(state => state.sounds[id].isSelected);

  const isLoading = useLoadingStore(state => state.loaders[src]);

  const sound = useSound(src, { loop: true, volume });

  useEffect(() => {
    if (isSelected && isPlaying && functional) {
      sound?.play();
    } else {
      sound?.pause();
    }
  }, [isSelected, sound, isPlaying, functional]);

  useEffect(() => {
    if (hidden && isSelected) selectHidden(label);
    else if (hidden && !isSelected) unselectHidden(label);
  }, [label, isSelected, hidden, selectHidden, unselectHidden]);

  const _select = useCallback(() => {
    select(id);
    play();
  }, [select, play, id]);

  const _unselect = useCallback(() => {
    unselect(id);
    setVolume(id, 0.5);
  }, [unselect, setVolume, id]);

  const toggle = useCallback(() => {
    if (isSelected) return _unselect();

    _select();
  }, [isSelected, _unselect, _select]);

  return (
    <div
      className={cn(
        styles.sound,
        isSelected && styles.selected,
        hidden && styles.hidden,
      )}
      onClick={toggle}
      onKeyDown={toggle}
    >
      <Favorite id={id} />
      <div className={styles.icon}>
        {isLoading ? (
          <span className={styles.spinner}>
            <ImSpinner9 />
          </span>
        ) : (
          icon
        )}
      </div>
      <h3 id={id}>{label}</h3>
      <Range id={id} />
    </div>
  );
}
