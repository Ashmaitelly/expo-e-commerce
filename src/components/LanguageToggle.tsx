import React, { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { Button, I18nManager } from "react-native";
import RNRestart from "react-native-restart";
import { LanguageCode, languages } from "../i18n/languages";
import i18n from "../i18n/i18n";
import { useDispatch } from "react-redux";
import { setLanguage } from "../redux/slices/appSlice";

const LanguageToggle = () => {
  const dispatch = useDispatch();
  const toggleLanguage = useCallback(() => {
    const newLang = i18n.language === "en" ? "ar" : "en";
    const isRTL = languages[newLang as LanguageCode].rtl;

    i18n.changeLanguage(newLang);
    dispatch(setLanguage(newLang));

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
      onPress={() => toggleLanguage()}
    />
  );
};

export default LanguageToggle;
