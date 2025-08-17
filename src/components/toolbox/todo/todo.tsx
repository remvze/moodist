import { useState, useEffect } from 'react';

import { Modal } from '@/components/modal';
import { Form } from './form';
import { Todos } from './todos';

import styles from './todo.module.css';

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

interface TodoProps {
  onClose: () => void;
  show: boolean;
}

export function Todo({ onClose, show }: TodoProps) {
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

  // 获取本地化文本
  const titleText = currentLang === 'zh' ? '待办清单' : 'Todo Checklist';
  const descText = currentLang === 'zh' ? '超级简单的待办清单。' : 'Super simple todo list.';

  return (
    <Modal show={show} onClose={onClose}>
      <header className={styles.header}>
        <h2 className={styles.title}>{titleText}</h2>
        <p className={styles.desc}>{descText}</p>
      </header>

      <Form />
      <Todos />
    </Modal>
  );
}
