import React from "react";
import "../../src/i18n/i18n";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  NavigationContainer,
  useNavigation,
  useNavigationState,
  useTheme,
} from "@react-navigation/native";
import {
  useColorScheme,
  StatusBar,
  View,
  StyleSheet,
  Image,
  useWindowDimensions,
  TouchableOpacity,
} from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Animated, {
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
import AuthStack from "./AuthStack";
import { RootStackParamList } from "./NavigationTypes";
import { DarkThemeCustom, LightThemeCustom } from "../Themes/Theme";
import icons from "../Assets/icons";
import PrimaryStack from "./PrimaryStack";

const Stack = createNativeStackNavigator<RootStackParamList>();

const numberOfSteps = 13;

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
      case "FinishSetup":
        return 10;
      case "SetupPin":
        return 11;
      case "Welcome":
        return 12;
      default:
        return 0;
    }
  });
}

const Progress = () => {
  const { colors } = useTheme();
  const styles = createStyles(colors);
  const navigation = useNavigation();
  const { width } = useWindowDimensions();
  const step = useInStepScreen();

  const style = useAnimatedStyle(() => {
    return {
      width: withTiming((step * width) / numberOfSteps, { duration: 500 }),
    };
  }, [step, width]);
  console.log(step);
  return (
    <View style={styles.wrapper}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.backButton}
      >
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

const RootStack: React.FC = () => {
  const systemTheme = useColorScheme();

  return (
    <SafeAreaProvider>
      <StatusBar
        barStyle={systemTheme === "dark" ? "light-content" : "dark-content"}
        backgroundColor="transparent"
        translucent
      />
      <NavigationContainer
        theme={systemTheme === "dark" ? DarkThemeCustom : LightThemeCustom}
      >
        <Progress />
        <Stack.Navigator id={undefined} screenOptions={{ headerShown: false }}>
          <Stack.Screen name="AuthStack" component={AuthStack} />
          {/* <Stack.Screen name="PrimaryStack" component={PrimaryStack} /> */}
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default RootStack;

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
