import { useState, type FormEvent, useEffect } from 'react';

import { cn } from '@/helpers/styles';
import { useSoundStore } from '@/stores/sound';
import { usePresetStore } from '@/stores/preset';

import styles from './new.module.css';

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

export function New() {
  const [name, setName] = useState('');
  const [currentLang, setCurrentLang] = useState('en');

  const noSelected = useSoundStore(state => state.noSelected());
  const sounds = useSoundStore(state => state.sounds);
  const addPreset = usePresetStore(state => state.addPreset);

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

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!name || noSelected) return;

    const _sounds: Record<string, number> = {};

    Object.keys(sounds)
      .filter(id => sounds[id].isSelected)
      .forEach(id => {
        _sounds[id] = sounds[id].volume;
      });

    addPreset(name, _sounds);

    setName('');
  };

  // 获取本地化文本
  const titleText = currentLang === 'zh' ? '新建预设' : 'New Preset';
  const placeholderText = currentLang === 'zh' ? '预设名称' : "Preset's Name";
  const saveText = currentLang === 'zh' ? '保存' : 'Save';
  const noSelectedText = currentLang === 'zh' ? '要创建预设，请先选择一些音效。' : 'To make a preset, first select some sounds.';

  return (
    <div className={styles.new}>
      <h3 className={styles.title}>{titleText}</h3>

      <form
        className={cn(styles.form, noSelected && styles.disabled)}
        onSubmit={handleSubmit}
      >
        <input
          disabled={noSelected}
          placeholder={placeholderText}
          required
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
        />
        <button disabled={noSelected}>{saveText}</button>
      </form>

      {noSelected && (
        <p className={styles.noSelected}>
          {noSelectedText}
        </p>
      )}
    </div>
  );
}
