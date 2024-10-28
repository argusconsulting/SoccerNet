import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';

import en from './locales/en.json';
import ar from './locales/ar.json';
import fr from './locales/fr.json';
import de from './locales/de.json';
import es from './locales/es.json';
import it from './locales/it.json';

i18n.use(initReactI18next).init({
  compatibilityJSON: 'v3',
  lng: 'ar', // Default language
  fallbackLng: 'ar', // Fallback language if the translation is missing
  resources: {
    en: {translation: en},
    ar: {translation: ar},
    fr: {translation: fr},
    it: {translation: it},
    de: {translation: de},
    es: {translation: es},
  },
  interpolation: {
    escapeValue: false, // React already escapes values to prevent XSS
  },
});

export default i18n;
