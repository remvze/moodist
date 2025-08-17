import { useCallback, useEffect, forwardRef, useMemo, useState } from 'react';
import { ImSpinner9 } from 'react-icons/im/index';

import { Range } from './range';
import { Favorite } from './favorite';
import { getLocalizedSoundLabel } from '@/utils/sound-labels';

import { useSound } from '@/hooks/use-sound';
import { useSoundStore } from '@/stores/sound';
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

// 安全地获取localStorage
function getLocalStorageItem(key: string, defaultValue: string = 'en'): string {
  if (typeof window !== 'undefined' && window.localStorage) {
    try {
      return localStorage.getItem(key) || defaultValue;
    } catch {
      return defaultValue;
    }
  }
  return defaultValue;
}

export const Sound = forwardRef<HTMLDivElement, SoundProps>(function Sound(
  { functional, hidden, icon, id, label, selectHidden, src, unselectHidden },
  ref,
) {
  const [currentLang, setCurrentLang] = useState('en');
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

  const sound = useSound(src, { loop: true, volume: adjustedVolume });

  // 在客户端初始化语言
  useEffect(() => {
    const lang = getLocalStorageItem('moodist-language');
    setCurrentLang(lang);
    
    // 监听语言变化
    const handleLanguageChange = (event: CustomEvent) => {
      setCurrentLang(event.detail.language);
    };
    
    window.addEventListener('languageChanged', handleLanguageChange as EventListener);
    
    return () => {
      window.removeEventListener('languageChanged', handleLanguageChange as EventListener);
    };
  }, []);

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

  // 获取本地化的音效标签
  const localizedLabel = getLocalizedSoundLabel(id);

  return (
    <div
      aria-label={`${localizedLabel} sound`}
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
      <Favorite id={id} label={localizedLabel} />
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
        {localizedLabel}
      </div>
      <Range id={id} label={localizedLabel} />
    </div>
  );
});
