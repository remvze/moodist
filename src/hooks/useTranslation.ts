import { useLanguage } from './useLanguage';
import { getTranslation } from '@/data/i18n';
import type { Translations } from '@/data/i18n';

export function useTranslation() {
  const { currentLang, isChinese, changeLanguage } = useLanguage();
  const translations: Translations = getTranslation(currentLang);

  const t = (key: keyof Translations, params?: Record<string, string | number>) => {
    let translation = getNestedValue(translations, key) as string;

    if (typeof translation !== 'string') {
      // Fallback to English if translation is missing
      const englishTranslations = getTranslation('en');
      translation = getNestedValue(englishTranslations, key) as string;
    }

    if (typeof translation !== 'string') {
      return key; // Return key if no translation found
    }

    // Replace parameters like {{count}}
    if (params) {
      return translation.replace(/\{\{(\w+)\}\}/g, (match, param) => {
        return params[param]?.toString() || match;
      });
    }

    return translation;
  };

  return {
    t,
    currentLang,
    isChinese,
    changeLanguage,
    translations
  };
}

function getNestedValue(obj: any, path: string) {
  return path.split('.').reduce((current, key) => current?.[key], obj);
}