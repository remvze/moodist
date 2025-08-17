import { useLanguage } from '@/hooks/use-language';
import '@/styles/language-switcher.css';

export function LanguageSwitcher() {
  const { currentLanguage, toggleLanguage } = useLanguage();

  return (
    <button
      onClick={toggleLanguage}
      className="language-switcher"
      aria-label={`Switch to ${currentLanguage === 'en' ? 'Chinese' : 'English'}`}
      title={`Switch to ${currentLanguage === 'en' ? 'Chinese' : 'English'}`}
    >
      {currentLanguage === 'en' ? 'ZH' : 'EN'}
    </button>
  );
}
