import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import enTranslation from './locales/en/translation.json';
import zh_CN_Translation from './locales/zh-CN/translation.json';
import zh_TW_Translation from './locales/zh-TW/translation.json';
import jaTranslation from './locales/ja/translation.json';

const resources = {
  en: {
    translation: enTranslation,
  },
  ja: {
    translation: jaTranslation,
  },
  'zh-CN': {
    translation: zh_CN_Translation,
  },
  'zh-TW': {
    translation: zh_TW_Translation,
  },
};

i18n.use(initReactI18next).init({
  fallbackLng: 'en',
  interpolation: { escapeValue: false },
  missingKeyHandler: (lngs, ns, key, fallbackValue, updateMissing, options) => {
    const resolvedLng = lngs && lngs.length > 0 ? lngs[0] : i18n.language;
    const value = i18n.getResource(resolvedLng, ns || 'translation', key);

    if (typeof value === 'object' && value !== null) {
      console.warn(
        `i18next: Key '${key}' in namespace '${
          ns || 'translation'
        }' resolved to an object, but expected a string. Check your t() call.`,
        options,
      );
    } else {
      console.warn(
        `i18next: Missing key '${key}' in namespace '${
          ns || 'translation'
        }' for language(s) '${lngs.join(', ')}'.`,
      );
    }

    return fallbackValue || key;
  },
  react: { useSuspense: false },
  resources,
  returnObjects: true,
});

export default i18n;
