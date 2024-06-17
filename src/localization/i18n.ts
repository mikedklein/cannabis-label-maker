import i18n from "i18next";
import { initReactI18next } from "react-i18next";

i18n.use(initReactI18next).init({
    fallbackLng: "en",
    resources: {
        en: {
            translation: {
                title: "Label Printer",
                description: "This is an example of translation in en",
            },
        },
        "es-MX": {
            translation: {
                title: "Impresora de etiquetas",
                description: "Este es un ejemplo de traducción en es-MX.",
            },
        },
    },
});
