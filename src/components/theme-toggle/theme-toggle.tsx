import { useState, useEffect } from 'react';
import { FaSun, FaMoon } from 'react-icons/fa/index';
import { AnimatePresence, motion } from 'motion/react';

import styles from './theme-toggle.module.css';
import { fade } from '@/lib/motion';

export function ThemeToggle() {
  const [isDarkTheme, setIsDarkTheme] = useState<boolean>(false);

  useEffect(() => {
    // 从 localStorage 读取保存的主题，或使用系统偏好
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    const initialDarkTheme = savedTheme ? savedTheme === 'dark' : systemPrefersDark;
    setIsDarkTheme(initialDarkTheme);
    applyTheme(initialDarkTheme);
  }, []);

  const applyTheme = (isDark: boolean) => {
    const root = document.documentElement;
    const body = document.body;

    if (isDark) {
      root.classList.add('dark-theme');

      // 暗色主题 - 参考GitHub、VSCode等现代应用的深色主题
      root.style.setProperty('--bg-primary', '#0d1117');          // 主背景 - 深蓝灰色（类似GitHub）
      root.style.setProperty('--bg-secondary', '#161b22');        // 次要背景 - 稍浅的深蓝灰
      root.style.setProperty('--bg-tertiary', '#21262d');         // 第三背景 - 中深蓝灰
      root.style.setProperty('--bg-quaternary', '#30363d');       // 第四背景 - 蓝灰色

      // 前景色 - 暗色主题使用高对比度的浅色文字
      root.style.setProperty('--color-foreground', '#f0f6fc');    // 主前景色 - 高亮白色
      root.style.setProperty('--color-foreground-subtle', '#8b949e'); // 次要前景色 - 柔和灰色
      root.style.setProperty('--color-foreground-subtler', '#6e7681'); // 更次要前景色 - 中灰色
      root.style.setProperty('--color-muted', '#484f58');         // 静音色 - 深灰色
      root.style.setProperty('--color-border', '#30363d');        // 边框色 - 蓝灰色

      // 组件特定背景
      root.style.setProperty('--component-bg', '#161b22');        // 组件背景
      root.style.setProperty('--component-hover', '#21262d');     // 组件悬停背景
      root.style.setProperty('--component-active', '#30363d');    // 组件激活背景
      root.style.setProperty('--modal-bg', '#0d1117');            // 模态框背景
      root.style.setProperty('--input-bg', '#0d1117');            // 输入框背景

      // 直接设置body背景为深色
      body.style.backgroundColor = '#0d1117';
    } else {
      root.classList.remove('dark-theme');

      // 明亮主题 - 参考现代简洁设计，更干净的白色系
      root.style.setProperty('--bg-primary', '#ffffff');          // 主背景 - 纯白色
      root.style.setProperty('--bg-secondary', '#f8fafc');        // 次要背景 - 浅灰白（更深一点）
      root.style.setProperty('--bg-tertiary', '#f1f5f9');         // 第三背景 - 中浅灰（更深一点）
      root.style.setProperty('--bg-quaternary', '#e2e8f0');       // 第四背景 - 中灰色（更深一点）

      // 前景色 - 明亮主题使用深色文字，确保良好对比度
      root.style.setProperty('--color-foreground', '#1e293b');    // 主前景色 - 深灰蓝（更深一点）
      root.style.setProperty('--color-foreground-subtle', '#475569'); // 次要前景色 - 中深灰（更深一点）
      root.style.setProperty('--color-foreground-subtler', '#64748b'); // 更次要前景色 - 中灰色（更深一点）
      root.style.setProperty('--color-muted', '#94a3b8');         // 静音色 - 中灰（更深一点）
      root.style.setProperty('--color-border', '#cbd5e1');        // 边框色 - 中浅灰（更深一点）

      // 组件特定背景 - 明亮模式下使用浅色系
      root.style.setProperty('--component-bg', '#ffffff');        // 组件背景 - 白色
      root.style.setProperty('--component-hover', '#f8fafc');     // 组件悬停背景 - 浅灰白
      root.style.setProperty('--component-active', '#f1f5f9');    // 组件激活背景 - 中浅灰
      root.style.setProperty('--modal-bg', '#ffffff');            // 模态框背景 - 白色
      root.style.setProperty('--input-bg', '#ffffff');            // 输入框背景 - 白色

      // 直接设置body背景为白色
      body.style.backgroundColor = '#ffffff';
    }
  };

  const toggleTheme = () => {
    const newTheme = !isDarkTheme;
    setIsDarkTheme(newTheme);
    applyTheme(newTheme);
    localStorage.setItem('theme', newTheme ? 'dark' : 'light');
  };

  const variants = fade();

  return (
    <button
      className={styles.themeToggle}
      onClick={toggleTheme}
      aria-label={isDarkTheme ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      <AnimatePresence initial={false} mode="wait">
        <motion.span
          animate="show"
          aria-hidden="true"
          exit="hidden"
          initial="hidden"
          key={isDarkTheme ? 'moon' : 'sun'}
          variants={variants}
        >
          {isDarkTheme ? <FaMoon /> : <FaSun />}
        </motion.span>
      </AnimatePresence>
    </button>
  );
}