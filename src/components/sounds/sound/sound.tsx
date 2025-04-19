import { useCallback, useEffect, forwardRef, useMemo } from 'react';
import { ImSpinner9 } from 'react-icons/im/index';
import { useTranslation } from 'react-i18next'; // 导入 useTranslation

import { Range } from './range';
import { Favorite } from './favorite';

import { useSound } from '@/hooks/use-sound';
import { useSoundStore } from '@/stores/sound';
import { useLoadingStore } from '@/stores/loading';
import { cn } from '@/helpers/styles';

import styles from './sound.module.css';

import type { Sound as SoundType } from '@/data/types';

import { useKeyboardButton } from '@/hooks/use-keyboard-button';

interface SoundProps extends Omit<SoundType, 'label'> {
  functional: boolean;
  hidden: boolean;
  labelKey: string;
  selectHidden: (key: string) => void;
  unselectHidden: (key: string) => void;
}

export const Sound = forwardRef<HTMLDivElement, SoundProps>(function Sound(
  { functional, hidden, icon, id, labelKey, selectHidden, src, unselectHidden },
  ref,
) {
  const { t } = useTranslation(); // 获取 t 函数
  const translatedLabel = useMemo(() => t(labelKey), [t, labelKey]);

  const isPlaying = useSoundStore(state => state.isPlaying);
  const play = useSoundStore(state => state.play);
  const selectSound = useSoundStore(state => state.select);
  const unselectSound = useSoundStore(state => state.unselect);
  const setVolume = useSoundStore(state => state.setVolume);
  const isSelected = useSoundStore(state => state.sounds[id].isSelected);
  const locked = useSoundStore(state => state.locked);

  const volume = useSoundStore(state => state.sounds[id].volume);
  const globalVolume = useSoundStore(state => state.globalVolume);
  const adjustedVolume = useMemo(
    () => volume * globalVolume,
    [volume, globalVolume],
  );

  const isLoading = useLoadingStore(state => state.loaders[src]);

  const soundControls = useSound(src, { loop: true, volume: adjustedVolume });

  useEffect(() => {
    if (locked) return;

    if (isSelected && isPlaying && functional) {
      soundControls?.play();
    } else {
      soundControls?.pause();
    }
  }, [isSelected, soundControls, isPlaying, functional, locked]);

  useEffect(() => {
    if (hidden && isSelected) selectHidden(labelKey);
    else if (hidden && !isSelected) unselectHidden(labelKey);
  }, [labelKey, isSelected, hidden, selectHidden, unselectHidden]);

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

  const handleKeyDown = useKeyboardButton(toggle);

  return (
    <div
      aria-label={t('sounds.aria-label', { name: translatedLabel })}
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
      <Favorite id={id} label={translatedLabel} />
      <div className={styles.icon}>
        {isLoading ? (
          <span aria-hidden="true" className={styles.spinner}>
            <ImSpinner9 />
          </span>
        ) : (
          <span aria-hidden="true">{icon}</span>
        )}
      </div>
      <div className={styles.label} id={id}>
        {translatedLabel}
      </div>
      <Range id={id} label={translatedLabel} />
    </div>
  );
});
