import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import enTranslation from './locales/en/translation.json';
import zhTranslation from './locales/zh/translation.json';

const resources = {
  en: {
    translation: enTranslation,
  },
  zh: {
    translation: zhTranslation,
  },
};

i18n.use(initReactI18next).init({
  debug: true,
  fallbackLng: 'en',
  interpolation: { escapeValue: false },
  lng: 'en',
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
