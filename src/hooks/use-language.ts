import { useState, useEffect } from 'react';

export type Language = 'en' | 'zh';

// 安全地获取localStorage
function getLocalStorageItem(key: string, defaultValue: Language = 'en'): Language {
  if (typeof window !== 'undefined' && window.localStorage) {
    try {
      return (localStorage.getItem(key) as Language) || defaultValue;
    } catch {
      return defaultValue;
    }
  }
  return defaultValue;
}

// 安全地设置localStorage
function setLocalStorageItem(key: string, value: string): void {
  if (typeof window !== 'undefined' && window.localStorage) {
    try {
      localStorage.setItem(key, value);
    } catch {
      // 忽略错误
    }
  }
}

export function useLanguage() {
  const [currentLanguage, setCurrentLanguage] = useState<Language>('en');

  useEffect(() => {
    const savedLanguage = getLocalStorageItem('moodist-language');
    setCurrentLanguage(savedLanguage);
  }, []);

  const changeLanguage = (language: Language) => {
    setCurrentLanguage(language);
    setLocalStorageItem('moodist-language', language);
    
    // Dispatch custom event to notify other components
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('languageChanged', {
        detail: { language }
      }));
    }
  };

  const toggleLanguage = () => {
    const newLanguage: Language = currentLanguage === 'en' ? 'zh' : 'en';
    changeLanguage(newLanguage);
  };

  return {
    currentLanguage,
    changeLanguage,
    toggleLanguage
  };
}
