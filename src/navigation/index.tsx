import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  createStaticNavigation,
  StaticParamList,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Home } from "./screens/Home";

import { Settings } from "./screens/Settings";
import MaterialIcons from "@react-native-vector-icons/material-icons";
import i18n from "../i18n/i18n";
import { useTranslation } from "react-i18next";

export function HomeTabs() {
  const HomeTabs = createBottomTabNavigator();
  const { t } = useTranslation();
  return (
    <HomeTabs.Navigator>
      <HomeTabs.Screen
        name="Home"
        component={Home}
        options={{
          title: t("tabs.home"),
          tabBarLabel: t("tabs.home"),
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="home" color={color} size={size} />
          ),
        }}
      />
      <HomeTabs.Screen
        name="Settings"
        component={Settings}
        options={{
          title: t("tabs.settings"),
          tabBarLabel: t("tabs.settings"),
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
    HomeTabs: {
      screen: HomeTabs,
      options: {
        title: "Home",
        headerShown: false,
      },
    },

    // Settings: {
    //   screen: Settings,
    //   options: ({ navigation }) => ({
    //     presentation: "modal",
    //     headerRight: () => (
    //       <HeaderButton onPress={navigation.goBack}>
    //         <Text>Close</Text>
    //       </HeaderButton>
    //     ),
    //   }),
    // },
  },
});

export const Navigation = createStaticNavigation(RootStack);

type RootStackParamList = StaticParamList<typeof RootStack>;

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
