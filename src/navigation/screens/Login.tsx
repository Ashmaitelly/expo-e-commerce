import { Text } from "@react-navigation/elements";
import {
  StackActions,
  useNavigation,
  useTheme,
} from "@react-navigation/native";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  ActivityIndicator,
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
  const { t } = useTranslation();
  const navigation = useNavigation();
  const { colors } = useTheme();
  const dispatch = useDispatch();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setError(false);
  }, [password, username]);

  const handleLogin = () => {
    setLoading(true);
    setError(false);

    // Simulate a network/login delay of 2 seconds
    new Promise((resolve) => setTimeout(resolve, 2000)).then(() => {
      const success = authenticateUser(username, password);

      setLoading(false);

      if (success) {
        dispatch(login(username));
        navigation.dispatch(StackActions.replace("HomeTabs"));
      } else {
        setError(true);
      }
    });
  };

  return (
    <KeyboardAvoidingView
      style={[styles.container]}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
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
        onPress={handleLogin}
        disabled={loading}
      >
        <Text style={[styles.buttonText, { color: colors.text }]}>
          {t("login.login")}
        </Text>
      </TouchableOpacity>

      <Text style={{ color: colors.notification, marginTop: 10 }}>
        {error ? t("login.error") : ""}
      </Text>

      {loading && (
        <View style={styles.loaderOverlay}>
          <ActivityIndicator size="large" color={colors.primary} />
        </View>
      )}
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
