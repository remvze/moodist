import { useState, useEffect } from 'react';
import { Modal } from '@/components/modal';

import styles from './shortcuts.module.css';

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

interface ShortcutsModalProps {
  onClose: () => void;
  show: boolean;
}

export function ShortcutsModal({ onClose, show }: ShortcutsModalProps) {
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

  const shortcuts = [
    {
      keys: ['Shift', 'H'],
      label: currentLang === 'zh' ? '快捷键列表' : 'Shortcuts List',
    },
    {
      keys: ['Shift', 'Alt', 'P'],
      label: currentLang === 'zh' ? '预设' : 'Presets',
    },
    {
      keys: ['Shift', 'S'],
      label: currentLang === 'zh' ? '分享音效' : 'Share Sounds',
    },
    {
      keys: ['Shift', 'Alt', 'T'],
      label: currentLang === 'zh' ? '睡眠定时器' : 'Sleep Timer',
    },
    {
      keys: ['Shift', 'C'],
      label: currentLang === 'zh' ? '倒计时' : 'Countdown Timer',
    },
    {
      keys: ['Shift', 'P'],
      label: currentLang === 'zh' ? '番茄钟' : 'Pomodoro',
    },
    {
      keys: ['Shift', 'N'],
      label: currentLang === 'zh' ? '记事本' : 'Notepad',
    },
    {
      keys: ['Shift', 'T'],
      label: currentLang === 'zh' ? '待办清单' : 'Todo Checklist',
    },
    {
      keys: ['Shift', 'B'],
      label: currentLang === 'zh' ? '呼吸练习' : 'Breathing Exercise',
    },
    {
      keys: ['Shift', 'Space'],
      label: currentLang === 'zh' ? '切换播放' : 'Toggle Play',
    },
    {
      keys: ['Shift', 'R'],
      label: currentLang === 'zh' ? '取消全选音效' : 'Unselect All Sounds',
    },
  ];

  const headingText = currentLang === 'zh' ? '键盘快捷键' : 'Keyboard Shortcuts';

  return (
    <Modal show={show} onClose={onClose}>
      <h1 className={styles.heading}>{headingText}</h1>
      <div className={styles.shortcuts}>
        {shortcuts.map(shortcut => (
          <Row
            key={shortcut.label}
            keys={shortcut.keys}
            label={shortcut.label}
          />
        ))}
      </div>
    </Modal>
  );
}

interface RowProps {
  keys: Array<string>;
  label: string;
}

function Row({ keys, label }: RowProps) {
  return (
    <div className={styles.row}>
      <p className={styles.label}>{label}</p>
      <div className={styles.divider} />
      <div className={styles.keys}>
        {keys.map(key => (
          <Key key={`${label}-${key}`}>{key}</Key>
        ))}
      </div>
    </div>
  );
}

interface KeyProps {
  children: React.ReactNode;
}

function Key({ children }: KeyProps) {
  return <div className={styles.key}>{children}</div>;
}
