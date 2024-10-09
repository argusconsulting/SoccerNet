import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';

import en from './locales/en.json';
import arb from './locales/arb.json';
import french from './locales/french.json';
import german from './locales/german.json';
import spanish from './locales/spanish.json';
import italian from './locales/italian.json';

i18n.use(initReactI18next).init({
  compatibilityJSON: 'v3',
  lng: 'arb', // Default language
  fallbackLng: 'arb', // Fallback language if the translation is missing
  resources: {
    en: {translation: en},
    arb: {translation: arb},
    french: {translation: french},
    italian: {translation: italian},
    german: {translation: german},
    spanish: {translation: spanish},
  },
  interpolation: {
    escapeValue: false, // React already escapes values to prevent XSS
  },
});

export default i18n;
