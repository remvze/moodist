import { FaCoffee } from 'react-icons/fa/index';
import { useState, useEffect } from 'react';

import { SpecialButton } from '@/components/special-button';

import styles from './donate.module.css';

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

export function Donate() {
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

  const supportMeText = currentLang === 'zh' ? '支持我' : 'Support Me';
  const helpText = currentLang === 'zh' ? '帮助我保持Moodist无广告。' : 'Help me keep Moodist ad-free.';
  const donateText = currentLang === 'zh' ? '立即捐赠' : 'Donate Today';

  return (
    <div className={styles.donate}>
      <div className={styles.iconContainer}>
        <div className={styles.tail} />
        <div aria-hidden="true" className={styles.icon}>
          <FaCoffee />
        </div>
      </div>

      <div className={styles.title}>
        <span>{supportMeText}</span>
      </div>
      <p className={styles.desc}>{helpText}</p>
      <SpecialButton
        className={styles.button}
        href="https://buymeacoffee.com/remvze"
      >
        {donateText}
      </SpecialButton>
    </div>
  );
}
