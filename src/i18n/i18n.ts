import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import * as RNLocalize from "react-native-localize";

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
    // compatibilityJSON: "v3",
    resources,
    lng: "en",
    fallbackLng: "od",
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
