import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  createStaticNavigation,
  StaticParamList,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Home } from "./screens/Home";
import { Settings } from "./screens/Settings";
import MaterialIcons from "@react-native-vector-icons/material-icons";
import { useTranslation } from "react-i18next";
import { Search } from "./screens/Search";
import { HeaderTitle } from "@react-navigation/elements";
import { Login } from "./screens/Login";
import { AdDetails } from "./screens/AdDetails";

export function HomeTabs() {
  const HomeTabs = createBottomTabNavigator();
  const { t } = useTranslation();
  return (
    <HomeTabs.Navigator>
      <HomeTabs.Screen
        name="Home"
        component={Home}
        options={{
          title: t("screens.home"),
          tabBarLabel: t("screens.home"),
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="home" color={color} size={size} />
          ),
        }}
      />
      <HomeTabs.Screen
        name="Settings"
        component={Settings}
        options={{
          title: t("screens.settings"),
          tabBarLabel: t("screens.settings"),
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="settings" color={color} size={size} />
          ),
        }}
      />
    </HomeTabs.Navigator>
  );
}

const RootStack = createNativeStackNavigator({
  screens: {
    Login: {
      screen: Login,
    },
    HomeTabs: {
      screen: HomeTabs,
      options: {
        title: "Home",
        headerShown: false,
      },
    },

    Search: {
      screen: Search,
      options: () => ({
        presentation: "modal",
        animation: "slide_from_bottom",
        headerTitle: () => {
          const { t } = useTranslation();
          return <HeaderTitle children={t("screens.search")} />;
        },
      }),
    },
    AdDetails: {
      screen: AdDetails,
      options: () => ({
        presentation: "modal",
        animation: "slide_from_bottom",
        headerTitle: () => {
          const { t } = useTranslation();
          return <HeaderTitle children={t("screens.details")} />;
        },
      }),
    },
  },
});

export const Navigation = createStaticNavigation(RootStack);

type RootStackParamList = StaticParamList<typeof RootStack>;

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
