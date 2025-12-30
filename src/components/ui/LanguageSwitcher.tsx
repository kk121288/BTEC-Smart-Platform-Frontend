import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';

export function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const currentLang = i18n.language;

  useEffect(() => {
    // Set document direction based on language
    document.documentElement.dir = currentLang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = currentLang;
  }, [currentLang]);

  const toggleLanguage = () => {
    const newLang = currentLang === 'en' ? 'ar' : 'en';
    i18n.changeLanguage(newLang);
  };

  return (
    <button
      onClick={toggleLanguage}
      className="flex items-center space-x-2 px-4 py-2 bg-cyan-500/20 border border-cyan-500/50 text-cyan-400 rounded-lg hover:bg-cyan-500/30 transition-all duration-200"
      title={currentLang === 'en' ? 'Switch to Arabic' : 'التبديل إلى الإنجليزية'}
    >
      <span className="text-sm font-semibold">
        {currentLang === 'en' ? '🇸🇦 العربية' : '🇬🇧 English'}
      </span>
    </button>
  );
}
