import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AuthStackParamList } from "./NavigationTypes";
import OnboardingScreen from "../Screens/onboarding/onBoarding";
import Registration from "../Screens/registration/Registration";
import PhoneVerification from "../Screens/registration/PhoneVerification";
import OtpVerification from "../Screens/registration/OtpVerification";
import AddEmail from "../Screens/accountSetup/AddEmail";
import AddCountry from "../Screens/accountSetup/AddCountry";
import HomeAddress from "../Screens/accountSetup/HomeAddress";
import PersonalInfo from "../Screens/accountSetup/PersonalInfo";
import ScanId from "../Screens/accountVerification/ScanId";

const Stack = createNativeStackNavigator<AuthStackParamList>();

const AuthStack: React.FC = () => {
  return (
    <Stack.Navigator id={undefined} screenOptions={{ headerShown: false }}>
      <Stack.Screen name="OnBoarding" component={OnboardingScreen} />
      <Stack.Screen name="Registration" component={Registration} />
      <Stack.Screen name="PhoneVerification" component={PhoneVerification} />
      <Stack.Screen name="OtpVerification" component={OtpVerification} />
      <Stack.Screen name="AddEmail" component={AddEmail} />
      <Stack.Screen name="AddCountry" component={AddCountry} />
      <Stack.Screen name="HomeAddress" component={HomeAddress} />
      <Stack.Screen name="PersonalInfo" component={PersonalInfo} />
      <Stack.Screen name="ScanId" component={ScanId} />
    </Stack.Navigator>
  );
};

export default AuthStack;
