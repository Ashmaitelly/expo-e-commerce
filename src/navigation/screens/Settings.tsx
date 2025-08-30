import { Text } from "@react-navigation/elements";
import { Button, StyleSheet, View } from "react-native";
import LanguageToggle from "../../components/LanguageToggle";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/slices/userSlice";
import { StackActions, useNavigation } from "@react-navigation/native";

export function Settings() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Text>{t("screens.settings")}</Text>
      <LanguageToggle />
      <Button
        title={t("buttons.logout")}
        onPress={() => {
          dispatch(logout());
          navigation.dispatch(StackActions.replace("Login"));
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
  },
  row: {
    flexDirection: "row",
    gap: 10,
  },
});
