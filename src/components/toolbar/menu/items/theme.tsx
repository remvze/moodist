import { useEffect, useState } from 'react';
import { LuLaptop, LuMoon, LuSun } from 'react-icons/lu/index';

import { Item } from '../item';

import {
  applyTheme,
  THEME_STORAGE_KEY,
  themes,
  type Theme as ThemePreference,
} from '@/lib/theme';

const icons = {
  dark: <LuMoon />,
  light: <LuSun />,
  system: <LuLaptop />,
};

export function Theme() {
  const [theme, setTheme] = useState<ThemePreference>('system');

  useEffect(() => {
    const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);
    const preference = themes.includes(savedTheme as ThemePreference)
      ? (savedTheme as ThemePreference)
      : 'system';

    setTheme(preference);
    applyTheme(preference);

    const syncTheme = () => {
      const saved = localStorage.getItem(THEME_STORAGE_KEY);
      setTheme(
        themes.includes(saved as ThemePreference)
          ? (saved as ThemePreference)
          : 'system',
      );
    };

    const media = window.matchMedia('(prefers-color-scheme: dark)');
    const handleSystemThemeChange = () => {
      const currentPreference = localStorage.getItem(THEME_STORAGE_KEY);
      if (!currentPreference || currentPreference === 'system') {
        applyTheme('system');
      }
    };

    media.addEventListener('change', handleSystemThemeChange);
    window.addEventListener('themechange', syncTheme);
    return () => {
      media.removeEventListener('change', handleSystemThemeChange);
      window.removeEventListener('themechange', syncTheme);
    };
  }, []);

  function selectTheme(nextTheme: ThemePreference) {
    setTheme(nextTheme);
    localStorage.setItem(THEME_STORAGE_KEY, nextTheme);
    applyTheme(nextTheme);
  }

  return (
    <>
      <Item
        active={theme === 'system'}
        icon={icons.system}
        label="System theme"
        onClick={() => selectTheme('system')}
      />
      <Item
        active={theme === 'light'}
        icon={icons.light}
        label="Light theme"
        onClick={() => selectTheme('light')}
      />
      <Item
        active={theme === 'dark'}
        icon={icons.dark}
        label="Dark theme"
        onClick={() => selectTheme('dark')}
      />
    </>
  );
}
