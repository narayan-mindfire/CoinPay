import React, { useRef } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  NavigationContainer,
  NavigationContainerRef,
} from "@react-navigation/native";
import OnboardingScreen from "../Screens/onboarding/onBoarding";
import Registration from "../Screens/registration/Registration";
import { RootStackParamList } from "./NavigationTypes";
import { useColorScheme } from "react-native";

import PhoneVerification from "../Screens/registration/PhoneVerification";
import { DarkThemeCustom, LightThemeCustom } from "../Themes/Theme";
import OtpVerification from "../Screens/registration/OtpVerification";

const Stack = createNativeStackNavigator<RootStackParamList>();

const RootStack: React.FC = () => {
  const navigationRef =
    useRef<NavigationContainerRef<RootStackParamList>>(null);
  const systemTheme = useColorScheme();
  return (
    <NavigationContainer
      theme={systemTheme === "dark" ? DarkThemeCustom : LightThemeCustom}
    >
      <Stack.Navigator id={undefined} screenOptions={{ headerShown: false }}>
        <Stack.Screen name="OnBoarding" component={OnboardingScreen} />
        <Stack.Screen name="Registration" component={Registration} />
        <Stack.Screen name="PhoneVerification" component={PhoneVerification} />
        <Stack.Screen name="OtpVerification" component={OtpVerification} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootStack;
