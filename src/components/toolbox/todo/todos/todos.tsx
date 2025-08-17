import { useState, useEffect } from 'react';

import { useTodoStore } from '@/stores/todo';

import { Todo } from './todo';
import styles from './todos.module.css';

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

export function Todos() {
  const [currentLang, setCurrentLang] = useState('en');
  const todos = useTodoStore(state => state.todos);
  const doneCount = useTodoStore(state => state.doneCount());

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
  const labelText = currentLang === 'zh' ? '您的待办事项' : 'Your Todos';
  const emptyText = currentLang === 'zh' ? '您没有任何待办事项。' : 'You don\'t have any todos.';

  return (
    <div className={styles.todos}>
      <header>
        <p className={styles.label}>{labelText}</p>
        <div className={styles.divider} />
        <p className={styles.counter}>
          {doneCount} / {todos.length}
        </p>
      </header>

      {todos.length > 0 ? (
        <>
          {todos.map(todo => (
            <Todo
              done={todo.done}
              id={todo.id}
              key={todo.id}
              todo={todo.todo}
            />
          ))}
        </>
      ) : (
        <p className={styles.empty}>{emptyText}</p>
      )}
    </div>
  );
}
