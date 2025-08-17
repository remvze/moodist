import { useState, useEffect } from 'react';
import { Modal } from '@/components/modal';
import { New } from './new';
import { List } from './list';

import styles from './presets.module.css';

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

interface PresetsModalProps {
  onClose: () => void;
  show: boolean;
}

export function PresetsModal({ onClose, show }: PresetsModalProps) {
  const [currentLang, setCurrentLang] = useState('en');

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

  const titleText = currentLang === 'zh' ? '预设' : 'Presets';

  return (
    <Modal show={show} onClose={onClose}>
      <h2 className={styles.title}>{titleText}</h2>
      <New />
      <div className={styles.divider} />
      <List close={onClose} />
    </Modal>
  );
}
