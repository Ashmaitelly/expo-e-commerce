import React, { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { Button, I18nManager } from "react-native";
import RNRestart from "react-native-restart";
import { LanguageCode, languages } from "../i18n/languages";

const LanguageToggle = () => {
  const { i18n } = useTranslation();
  const toggleLanguage = useCallback(() => {
    const newLang = i18n.language === "en" ? "ar" : "en";
    const isRTL = languages[newLang as LanguageCode].rtl;

    i18n.changeLanguage(newLang);

    if (I18nManager.isRTL !== isRTL) {
      I18nManager.forceRTL(isRTL);
      RNRestart.restart();
    }
  }, []);

  return (
    <Button
      title={
        i18n.language === "en" ? "Switch to Arabic" : "التبديل إلى الإنجليزية"
      }
      onPress={toggleLanguage}
    />
  );
};

export default LanguageToggle;
