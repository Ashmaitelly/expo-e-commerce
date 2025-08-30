import { Text } from "@react-navigation/elements";
import { StackActions, useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import { Button, StyleSheet, View } from "react-native";

export function Login() {
  const { t } = useTranslation();
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Text>Login</Text>
      <Button
        title={t("buttons.login")}
        onPress={() => navigation.dispatch(StackActions.replace("HomeTabs"))}
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
