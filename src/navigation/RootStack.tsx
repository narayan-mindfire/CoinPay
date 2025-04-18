import React, { useEffect } from "react";

import "../../src/i18n/i18n";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { useColorScheme, StatusBar } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { DarkThemeCustom, LightThemeCustom } from "../Themes/Theme";
import AuthStack from "./AuthStack";
import { RootStackParamList } from "./NavigationTypes";
import PrimaryStack from "./PrimaryStack";

import { RootState, useAppDispatch, useAppSelector } from "../redux/store";
import { loadUserFromStorage } from "../redux/slices/authSlice";

const Stack = createNativeStackNavigator<RootStackParamList>();
const RootStack: React.FC = () => {
  const dispatch = useAppDispatch();
  const token = useAppSelector((state: RootState) => state.authenticator.token);
  //getting user logged in state on app start
  console.log("token", token);
  useEffect(() => {
    dispatch(loadUserFromStorage());
  }, [dispatch]);
  const systemTheme = useColorScheme();
  const theme = useAppSelector((state) => state.theme.theme);

  return (
    <SafeAreaProvider>
      <StatusBar
        barStyle={systemTheme === "dark" ? "light-content" : "dark-content"}
        backgroundColor="transparent"
        translucent
      />
      <NavigationContainer
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
