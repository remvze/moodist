import { useEffect, useState } from 'react';
import { useSSR } from './use-ssr';

const themeMatch = '(prefers-color-scheme: dark)';

export function useDarkTheme() {
  const { isBrowser } = useSSR();
  const [isDarkTheme, setIsDarkTheme] = useState<boolean>(false);

  useEffect(() => {
    if (!isBrowser) return;

    const themeMediaQuery = window.matchMedia(themeMatch);

    function handleThemeChange(event: MediaQueryListEvent) {
      setIsDarkTheme(event.matches);
    }

    themeMediaQuery.addEventListener('change', handleThemeChange);
    setIsDarkTheme(themeMediaQuery.matches);

    return () =>
      themeMediaQuery.removeEventListener('change', handleThemeChange);
  }, [isBrowser]);

  return isDarkTheme;
}
