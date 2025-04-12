import React from "react";
import { View, Text } from "react-native";
import OnboardingScreen from "./Screens/onboarding/onBoarding";
import RootStack from "./navigation/RootStack";
import { Provider } from "react-redux";
import { store } from "./redux/store";

export const App = () => {
  return (
    <Provider store={store}>
      <RootStack />
    </Provider>
  );
};

export default App;
