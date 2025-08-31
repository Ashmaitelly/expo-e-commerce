import React, { useCallback } from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { useTranslation } from "react-i18next";
import { I18nManager } from "react-native";
import RNRestart from "react-native-restart";
import { LanguageCode, languages } from "../i18n/languages";
import i18n from "../i18n/i18n";
import { useDispatch } from "react-redux";
import { setLanguage } from "../redux/slices/appSlice";
import { useTheme } from "@react-navigation/native";

const LanguageToggle = () => {
  const dispatch = useDispatch();
  const { colors } = useTheme();
  const { t } = useTranslation();

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

  const buttonText =
    i18n.language === "en" ? "Switch to Arabic" : "التبديل إلى الإنجليزية";

  return (
    <TouchableOpacity
      style={[styles.button, { backgroundColor: colors.primary }]}
      onPress={toggleLanguage}
      activeOpacity={0.8}
    >
      <Text style={[styles.buttonText, { color: colors.text }]}>
        {buttonText}
      </Text>
    </TouchableOpacity>
  );
};

export default LanguageToggle;

const styles = StyleSheet.create({
  button: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 3,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "600",
  },
});
