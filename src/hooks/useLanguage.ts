import { useState, useEffect } from 'react';

export function useLanguage() {
  const [currentLang, setCurrentLang] = useState('en');

  useEffect(() => {
    // Detect language from URL path first
    const pathname = window.location.pathname;
    const isZhPage = pathname === '/zh' || pathname.startsWith('/zh/');

    // Then check URL parameter
    const urlParams = new URLSearchParams(window.location.search);
    const urlLang = urlParams.get('lang');

    // Finally check saved preference
    const savedLang = localStorage.getItem('moodist-language');

    const lang = urlLang || (isZhPage ? 'zh-CN' : savedLang) || 'en';
    setCurrentLang(lang);
  }, []);

  const changeLanguage = (lang: string) => {
    setCurrentLang(lang);
    localStorage.setItem('moodist-language', lang);

    // Update URL and navigate if needed
    const url = new URL(window.location.href);

    if (lang === 'zh-CN') {
      // Navigate to Chinese page
      window.location.href = `${window.location.origin}/zh`;
    } else {
      // Navigate to English page
      window.location.href = `${window.location.origin}/`;
    }
  };

  return {
    currentLang,
    changeLanguage,
    isChinese: currentLang === 'zh-CN'
  };
}