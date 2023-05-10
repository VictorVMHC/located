import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { ReactNativeLanguageDetector, getLanguage } from 'react-native-localization-settings';

import en from './en.json';
import es from './es.json';
const current =getLanguage();
const currentCleaned = current.substring(0,5);
const currentCleanedCorrect = currentCleaned == "es-MX"? currentCleaned : "en-US" 
i18n
  .use(ReactNativeLanguageDetector)
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources: {
      'en-US': en,
      'es-MX': es,
    },
    lng: currentCleanedCorrect,
    react :{
      useSuspense:false,
    },
    compatibilityJSON: 'v3',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;