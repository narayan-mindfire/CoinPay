import React from "react";

import { StatusBar } from "react-native";

import "../../src/i18n/i18n";
import { DarkThemeCustom, LightThemeCustom } from "../Themes/Theme";
import AuthStack from "./AuthStack";
import { RootStackParamList } from "./NavigationTypes";
import PrimaryStack from "./PrimaryStack";

import { RootState, useAppSelector } from "../redux/store";
import { navigationRef } from "./navigationRef";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SafeAreaProvider } from "react-native-safe-area-context";

// main navigation stack for app, contains two main navigators for auth flow and primary screens
const Stack = createNativeStackNavigator<RootStackParamList>();
const RootStack: React.FC = () => {
  const token = useAppSelector((state: RootState) => state.auth.token);
  //getting user logged in state on app start
  console.log("token", token);
  const theme = useAppSelector((state) => state.theme.theme);

  return (
    <SafeAreaProvider>
      <StatusBar
        barStyle={theme === "dark" ? "light-content" : "dark-content"}
        backgroundColor="transparent"
        translucent
      />
      <NavigationContainer
        ref={navigationRef}
        theme={theme === "dark" ? DarkThemeCustom : LightThemeCustom}
      >
        <Stack.Navigator id={undefined} screenOptions={{ headerShown: false }}>
          {token ? (
            <Stack.Screen name="PrimaryStack" component={PrimaryStack} />
          ) : (
            <Stack.Screen name="AuthStack" component={AuthStack} />
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default RootStack;
