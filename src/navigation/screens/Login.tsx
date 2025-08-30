import { Text } from "@react-navigation/elements";
import {
  StackActions,
  useNavigation,
  useTheme,
} from "@react-navigation/native";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Button,
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  I18nManager,
} from "react-native";
import { authenticateUser } from "../../services/authenticateUser";
import { useDispatch } from "react-redux";
import { login } from "../../redux/slices/appSlice";

export function Login() {
  //boilerplate hooks
  const { t } = useTranslation();
  const navigation = useNavigation();
  const { colors } = useTheme();
  const dispatch = useDispatch();
  //state
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  //use effect to clear error when changing values
  useEffect(() => {
    setError(false);
  }, [password, username]);

  return (
    <KeyboardAvoidingView
      style={[styles.container]}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <Text style={[styles.title, { color: colors.text }]}>{t("welcome")}</Text>

      <TextInput
        style={[styles.input, { borderColor: "grey", color: colors.text }]}
        placeholder={t("login.username")}
        placeholderTextColor={"grey"}
        keyboardType="email-address"
        autoCapitalize="none"
        value={username}
        onChangeText={setUsername}
        textAlign={I18nManager.isRTL ? "right" : "left"}
      />
      <TextInput
        style={[styles.input, { borderColor: "grey", color: colors.text }]}
        placeholderTextColor={"grey"}
        placeholder={t("login.password")}
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        textAlign={I18nManager.isRTL ? "right" : "left"}
      />

      <TouchableOpacity
        style={[styles.button, { backgroundColor: colors.primary }]}
        onPress={() => {
          if (authenticateUser(username, password)) {
            dispatch(login(username));
            navigation.dispatch(StackActions.replace("HomeTabs"));
          } else {
            setError(true);
          }
        }}
      >
        <Text style={[styles.buttonText, { color: colors.text }]}>
          {t("login.login")}
        </Text>
      </TouchableOpacity>
      <Text style={{ color: colors.notification, marginTop: 10 }}>
        {error ? t("login.error") : ""}
      </Text>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 30,
  },
  input: {
    width: "100%",
    height: 50,
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 15,
  },
  button: {
    width: "100%",
    height: 50,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "600",
  },
});
