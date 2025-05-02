import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import { store } from "../redux/store";

import en from "./locales/en";
import hi from "./locales/hi"; 
import od from "./locales/od";

const resources = {
  en: { translation: en },
  hi: { translation: hi },
  od: {translation: od},
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: store.getState().language.language,
    fallbackLng: "en",
    interpolation: {
      escapeValue: false,
    },
  });

  store.subscribe(() => {
    const lang = store.getState().language.language;
    if (i18n.language !== lang) {
      i18n.changeLanguage(lang);
    }
  });

export default i18n;
