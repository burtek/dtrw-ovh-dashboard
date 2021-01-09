import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import pl from './pl.json';
import en from './en.json';

i18n.use(LanguageDetector)
    .use(initReactI18next)
    .init({
        fallbackLng: 'en',
        interpolation: {
            escapeValue: false
        },
        resources: {
            pl: { translation: pl },
            en: { translation: en }
        }
    });
