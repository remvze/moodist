import { useCallback, useEffect, useState } from 'react';
import { BiPause, BiPlay } from 'react-icons/bi/index';
import { useHotkeys } from 'react-hotkeys-hook';

import { useSoundStore } from '@/stores/sound';
import { useSnackbar } from '@/contexts/snackbar';
import { cn } from '@/helpers/styles';

import styles from './play.module.css';

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

export function PlayButton() {
  const [currentLang, setCurrentLang] = useState('en');
  const isPlaying = useSoundStore(state => state.isPlaying);
  const pause = useSoundStore(state => state.pause);
  const toggle = useSoundStore(state => state.togglePlay);
  const noSelected = useSoundStore(state => state.noSelected());
  const locked = useSoundStore(state => state.locked);

  const showSnackbar = useSnackbar();

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

  const handleToggle = useCallback(() => {
    if (locked) return;

    if (noSelected) {
      const message = currentLang === 'zh' ? '请先选择一个音效来播放。' : 'Please first select a sound to play.';
      return showSnackbar(message);
    }

    toggle();
  }, [showSnackbar, toggle, noSelected, locked, currentLang]);

  useEffect(() => {
    if (isPlaying && noSelected) pause();
  }, [isPlaying, pause, noSelected]);

  useHotkeys('shift+space', handleToggle, {}, [handleToggle]);

  const playText = currentLang === 'zh' ? '播放' : 'Play';
  const pauseText = currentLang === 'zh' ? '暂停' : 'Pause';

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
          {pauseText}
        </>
      ) : (
        <>
          <span aria-hidden="true">
            <BiPlay />
          </span>{' '}
          {playText}
        </>
      )}
    </button>
  );
}
