import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AuthStackParamList } from "./NavigationTypes";

import Registration from "../Screens/registration/Registration";
import PhoneVerification from "../Screens/registration/PhoneVerification";
import OtpVerification from "../Screens/registration/OtpVerification";
import AddEmail from "../Screens/accountSetup/AddEmail";
import AddCountry from "../Screens/accountSetup/AddCountry";
import HomeAddress from "../Screens/accountSetup/HomeAddress";
import PersonalInfo from "../Screens/accountSetup/PersonalInfo";
import ScanId from "../Screens/accountVerification/ScanId";
import TakeSelfie from "../Screens/accountVerification/TakeSelfie";
import FinishSetup from "../Screens/accountVerification/FinishSetup";
import ScanDoc from "../Screens/accountVerification/ScanDoc";
import SelfieCam from "../Screens/accountVerification/SelfieCam";
import SetupPin from "../Screens/pinSetup/SetupPin";
import Welcome from "../Screens/welcome/Welcome";
import Login from "../Screens/login/Login";
import { Progress } from "../components/Progress";
import OnboardingScreen from "../Screens/OnBoarding/onBoarding";

const Stack = createNativeStackNavigator<AuthStackParamList>();

//auth stack lists all screens of the authentication flow
const AuthStack: React.FC = () => {
  return (
    <>
      <Progress />
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
        <Stack.Screen name="TakeSelfie" component={TakeSelfie} />
        <Stack.Screen name="FinishSetup" component={FinishSetup} />
        <Stack.Screen name="ScanDoc" component={ScanDoc} />
        <Stack.Screen name="SelfieCam" component={SelfieCam} />
        <Stack.Screen name="SetupPin" component={SetupPin} />
        <Stack.Screen name="Welcome" component={Welcome} />
        <Stack.Screen name="Login" component={Login} />
      </Stack.Navigator>
    </>
  );
};

export default AuthStack;
