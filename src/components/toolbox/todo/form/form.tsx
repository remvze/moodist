import { useState, useEffect } from 'react';

import { useTodoStore } from '@/stores/todo';

import styles from './form.module.css';

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

export function Form() {
  const [value, setValue] = useState('');
  const [currentLang, setCurrentLang] = useState('en');

  const addTodo = useTodoStore(state => state.addTodo);

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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!value.trim().length) return;

    addTodo(value);
    setValue('');
  };

  // 获取本地化文本
  const placeholderText = currentLang === 'zh' ? '我必须...' : 'I have to ...';
  const addText = currentLang === 'zh' ? '添加' : 'Add';

  return (
    <form onSubmit={handleSubmit}>
      <div className={styles.wrapper}>
        <input
          placeholder={placeholderText}
          type="text"
          value={value}
          onChange={e => setValue(e.target.value)}
        />
        <button type="submit">{addText}</button>
      </div>
    </form>
  );
}
