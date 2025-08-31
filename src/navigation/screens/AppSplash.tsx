import { useNavigation, useTheme } from "@react-navigation/native";
import React, { useEffect, useRef, useState } from "react";
import {
  View,
  ActivityIndicator,
  StyleSheet,
  Dimensions,
  Animated,
  Easing,
  Text,
} from "react-native";
import { store } from "../../redux/store";
import { useTranslation } from "react-i18next";

const { width } = Dimensions.get("window");

export function AppSplash() {
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();
  const { colors } = useTheme();
  const { t } = useTranslation();

  const fadeAnim = useRef(new Animated.Value(0)).current;

  // Fade-in title
  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
      easing: Easing.out(Easing.exp),
    }).start();
  }, []);

  // Simulate loading then fade out
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }).start(() => {
        const loggedIn = store.getState().app.loggedIn;
        if (loggedIn) {
          navigation.navigate("HomeTabs");
        } else {
          navigation.navigate("Login");
        }
      });
    }, 3000); // total splash duration
    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <Animated.Text
        style={[styles.title, { color: colors.text, opacity: fadeAnim }]}
      >
        {t("welcome")}
      </Animated.Text>

      {loading && (
        <ActivityIndicator
          size="large"
          color={colors.text}
          style={styles.indicator}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  indicator: {
    marginTop: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 30,
  },
});
