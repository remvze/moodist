export const THEME_STORAGE_KEY = 'moodist-theme';

export type Theme = 'dark' | 'light' | 'system';

export const themes: Theme[] = ['system', 'light', 'dark'];

export function resolveTheme(theme: Theme): Exclude<Theme, 'system'> {
  if (theme !== 'system') return theme;

  return window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light';
}

export function applyTheme(theme: Theme) {
  const resolvedTheme = resolveTheme(theme);
  const root = document.documentElement;

  root.dataset.theme = resolvedTheme;
  root.style.colorScheme = resolvedTheme;

  const themeColor = document.querySelector<HTMLMetaElement>(
    'meta[name="theme-color"]',
  );
  themeColor?.setAttribute(
    'content',
    resolvedTheme === 'dark' ? '#18181b' : '#fafafa',
  );

  window.dispatchEvent(new CustomEvent('themechange'));
}

export function toggleTheme() {
  const nextTheme =
    document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';

  localStorage.setItem(THEME_STORAGE_KEY, nextTheme);
  applyTheme(nextTheme);
}
