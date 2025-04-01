import React, { useRef } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  NavigationContainer,
  NavigationContainerRef,
} from "@react-navigation/native";
import OnboardingScreen from "../Screens/onboarding/onBoarding";
import Registration from "../Screens/registration/Registration";
import { RootStackParamList } from "./NavigationTypes";
import darkTheme from "../Themes/Dark";
import lightTheme from "../Themes/Light";
import { useColorScheme } from "react-native";

const Stack = createNativeStackNavigator<RootStackParamList>();

const RootStack: React.FC = () => {
  const navigationRef =
    useRef<NavigationContainerRef<RootStackParamList>>(null);
  const systemTheme = useColorScheme();
  return (
    <NavigationContainer
      theme={systemTheme === "dark" ? darkTheme : lightTheme}
    >
      <Stack.Navigator id={undefined} screenOptions={{ headerShown: false }}>
        <Stack.Screen name="OnBoarding" component={OnboardingScreen} />
        <Stack.Screen name="Registration" component={Registration} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootStack;
