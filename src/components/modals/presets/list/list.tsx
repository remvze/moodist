import { useState, useEffect } from 'react';
import { FaPlay, FaRegTrashAlt } from 'react-icons/fa/index';

import styles from './list.module.css';

import { useSoundStore } from '@/stores/sound';
import { usePresetStore } from '@/stores/preset';

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

interface ListProps {
  close: () => void;
}

export function List({ close }: ListProps) {
  const [currentLang, setCurrentLang] = useState('en');
  const presets = usePresetStore(state => state.presets);
  const changeName = usePresetStore(state => state.changeName);
  const deletePreset = usePresetStore(state => state.deletePreset);
  const override = useSoundStore(state => state.override);
  const play = useSoundStore(state => state.play);

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

  // 获取本地化文本
  const titleText = currentLang === 'zh' ? '您的预设' : 'Your Presets';
  const emptyText = currentLang === 'zh' ? '您还没有任何预设。' : "You don't have any presets yet.";
  const untitledText = currentLang === 'zh' ? '未命名' : 'Untitled';

  return (
    <div className={styles.list}>
      <h3 className={styles.title}>
        {titleText} {presets.length > 0 && `(${presets.length})`}
      </h3>

      {!presets.length && (
        <p className={styles.empty}>{emptyText}</p>
      )}

      {presets.map(preset => (
        <div className={styles.preset} key={preset.id}>
          <input
            placeholder={untitledText}
            type="text"
            value={preset.label}
            onChange={e => changeName(preset.id, e.target.value)}
          />
          <button onClick={() => deletePreset(preset.id)}>
            <FaRegTrashAlt />
          </button>
          <button
            className={styles.primary}
            onClick={() => {
              override(preset.sounds);
              play();
              close();
            }}
          >
            <FaPlay />
          </button>
        </div>
      ))}
    </div>
  );
}
