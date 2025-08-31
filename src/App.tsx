import { Assets as NavigationAssets } from "@react-navigation/elements";
import { DarkTheme, DefaultTheme } from "@react-navigation/native";
import { Asset } from "expo-asset";
import { createURL } from "expo-linking";
import * as SplashScreen from "expo-splash-screen";
import * as React from "react";
import { useColorScheme } from "react-native";
import { Navigation } from "./navigation";
import { Provider } from "react-redux";
import { persistor, store } from "./redux/store";
import { PersistGate } from "redux-persist/integration/react";
import { useTranslation } from "react-i18next";
import { GestureHandlerRootView } from "react-native-gesture-handler";

Asset.loadAsync([
  ...NavigationAssets,
  require("./assets/SamsungA56.png"),
  require("./assets/iphone12.png"),
  require("./assets/spark40c.png"),
  require("./assets/yukon.png"),
  require("./assets/jeep.png"),
  require("./assets/villa.png"),
  require("./assets/apartment.png"),
]);

// SplashScreen.preventAutoHideAsync();

const prefix = createURL("/");

export function App() {
  const colorScheme = useColorScheme();

  const theme = colorScheme === "dark" ? DarkTheme : DefaultTheme;

  const { i18n } = useTranslation();

  return (
    <Provider store={store}>
      <PersistGate
        loading={null}
        persistor={persistor}
        onBeforeLift={() => {
          const { language } = store.getState().app;
          i18n.changeLanguage(language);

          SplashScreen.hideAsync();
        }}
      >
        <GestureHandlerRootView>
          <Navigation
            theme={theme}
            i18nIsDynamicList
            linking={{
              enabled: "auto",
              prefixes: [prefix],
            }}
          />
        </GestureHandlerRootView>
      </PersistGate>
    </Provider>
  );
}
