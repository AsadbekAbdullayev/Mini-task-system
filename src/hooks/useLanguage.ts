import { useTranslation } from 'react-i18next';

export const useLanguage = () => {
  const { i18n } = useTranslation();

  

  
  const changeLanguage = (lang: 'en' | 'uz' | 'ru') => {
    i18n.changeLanguage(lang);
    // Optionally save to localStorage
    localStorage.setItem('i18nextLng', lang);
  };

  return {
    currentLanguage: i18n.language,
    changeLanguage,
    isRTL: i18n.dir() === 'rtl'
  };
}; 
