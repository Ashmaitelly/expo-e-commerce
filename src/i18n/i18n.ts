import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import * as RNLocalize from "react-native-localize";

import en from "./locales/en.json";
import ar from "./locales/ar.json";

const resources = {
  en: { translation: en },
  ar: { translation: ar },
};

const fallback = { languageTag: "en", isRTL: false };

const { languageTag, isRTL } =
  RNLocalize.findBestAvailableLanguage(Object.keys(resources)) || fallback;

i18n.use(initReactI18next).init({
  compatibilityJSON: "v3",
  resources,
  lng: languageTag,
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
