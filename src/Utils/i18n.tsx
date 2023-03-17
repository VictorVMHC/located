import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import en from './en.json';
import es from './es.json';

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources: {
      en: en,
      es: es,
    },
    react :{
      useSuspense:false,
    },
    compatibilityJSON: 'v3',
    lng: "en",
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;