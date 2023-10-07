import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import en from ".//translations/en.json";
import es from ".//translations/es.json";
import ca from "./translations/ca.json";

const resources = {
    en: {
        translation: en,
    },
    es: {
        translation: es,
    },
    ca: {
        translation: ca,
    },
};

i18n
    .use(initReactI18next)
    .init({
        compatibilityJSON: 'v3',
        resources,
        fallbackLng: "en", // Unavaialable language
        interpolation: {
            escapeValue: false,
        },
    });

export default i18n;