import { Text } from "@react-navigation/elements";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import LanguageToggle from "../../components/LanguageToggle";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import {
  StackActions,
  useNavigation,
  useTheme,
} from "@react-navigation/native";
import { logout } from "../../redux/slices/appSlice";
import { useState } from "react";

export function Settings() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { colors } = useTheme();
  const [loading, setLoading] = useState(false);

  const handleLogout = () => {
    setLoading(true);

    new Promise((resolve) => setTimeout(resolve, 1500)).then(() => {
      dispatch(logout());
      setLoading(false);
      navigation.dispatch(StackActions.replace("Login"));
    });
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={[styles.section, { backgroundColor: colors.card }]}>
        <Text style={[styles.sectionLabel, { color: colors.text }]}>
          {t("settings.language")}
        </Text>
        <LanguageToggle />
      </View>

      <TouchableOpacity
        style={[styles.logoutButton, { backgroundColor: colors.notification }]}
        onPress={handleLogout}
        disabled={loading}
      >
        <Text style={[styles.logoutText, { color: colors.text }]}>
          {t("login.logout")}
        </Text>
      </TouchableOpacity>

      {loading && (
        <View style={styles.loaderOverlay}>
          <ActivityIndicator size="large" color={colors.primary} />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },

  section: {
    padding: 15,
    borderRadius: 12,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },

  sectionLabel: {
    fontSize: 14,
    fontWeight: "500",
    marginBottom: 8,
  },

  logoutButton: {
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginTop: "auto",
  },

  logoutText: {
    fontSize: 16,
    fontWeight: "600",
  },

  loaderOverlay: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(0,0,0,0.3)",
    justifyContent: "center",
    alignItems: "center",
  },
});
