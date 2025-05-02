import React from "react";

import {
  View,
  StyleSheet,
  useWindowDimensions,
  Image,
  TouchableOpacity,
} from "react-native";

import { useTheme, useNavigationState } from "@react-navigation/native";
import Animated, {
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";

import icons from "../Assets/icons";
import { goBack } from "../navigation/navigationRef";

const numberOfSteps = 12;

// checking for current screen then mapping it to a number representing progress
function useInStepScreen() {
  return useNavigationState((state) => {
    const current = state?.routes[state.index];
    if (current?.name !== "AuthStack") return 0;
    const nestedState = current?.state;
    const nestedRoute = nestedState?.routes[nestedState.index];
    const name = nestedRoute?.name;
    switch (name) {
      case "OnBoarding":
        return 0;
      case "Registration":
        return 1;
      case "PhoneVerification":
        return 2;
      case "OtpVerification":
        return 3;
      case "AddCountry":
        return 4;
      case "AddEmail":
        return 5;
      case "HomeAddress":
        return 6;
      case "PersonalInfo":
        return 7;
      case "ScanId":
        return 8;
      case "TakeSelfie":
        return 9;
      case "SetupPin":
        return 10;
      case "FinishSetup":
        return 11;
      case "Welcome":
        return 12;
      default:
        return -1;
    }
  });
}

// this is the header component for authentication
export const Progress = () => {
  const { colors } = useTheme();
  const { width } = useWindowDimensions();

  const step = useInStepScreen();

  const styles = createStyles(colors);

  const style = useAnimatedStyle(() => {
    return {
      width: withTiming((step * width) / numberOfSteps, { duration: 500 }),
    };
  }, [step, width]);

  // dont need back button for onboarding screen
  if (step === 0) return null;

  return (
    <View style={styles.wrapper}>
      <TouchableOpacity onPress={() => goBack()} style={styles.backButton}>
        <Image
          source={icons.angleLeft}
          style={{ tintColor: colors.textPrimary }}
        />
      </TouchableOpacity>
      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].includes(step) && (
        <View style={styles.progressContainer}>
          <Animated.View style={[styles.progress, style]} />
        </View>
      )}
    </View>
  );
};

const createStyles = (colors: any) =>
  StyleSheet.create({
    wrapper: {
      paddingTop: 40,
      backgroundColor: colors.background,
    },
    backButton: {
      marginLeft: 16,
      marginBottom: 10,
    },
    progressContainer: {
      height: 6,
      width: "100%",
      backgroundColor: colors.backgroundModal,
    },
    progress: {
      height: 12,
      borderTopRightRadius: 3,
      borderBottomRightRadius: 3,
      backgroundColor: colors.primary,
    },
  });
