import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

import en from '../locales/en/common.json';
import uz from '../locales/uz/common.json';
import ru from '../locales/ru/common.json';

const resources = {
	en: {
		translation: en,
	},
	uz: {
		translation: uz,
	},
	ru: {
		translation: ru,
	},
};
const selectedLanguage = localStorage.getItem('i18nextLng') || 'uz';
i18n
	.use(Backend)
	.use(LanguageDetector)
	.use(initReactI18next) // passes i18n down to react-i18next
	.init({
		resources,
		detection: {},
		debug: false,
		lng: selectedLanguage,
		fallbackLng: selectedLanguage,
		keySeparator: false,
		supportedLngs: Object.keys(resources),
		interpolation: {
			escapeValue: false,
		},
		react: { useSuspense: false },
	});

export const changeLanguage = (lng: string) => {
	i18n.changeLanguage(lng);
	localStorage.setItem('i18nextLng', lng);
};

export default i18n;
