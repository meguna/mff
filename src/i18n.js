import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import commonEn from './translations/common_en.json';
import commonJa from './translations/common_ja.json';

// import Backend from 'i18next-xhr-backend';
// import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    lng: 'en',
    debug: false,
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
    resources: {
      en: {
        common: commonEn,
      },
      ja: {
        common: commonJa,
      },
    },
  });

export default i18n;
