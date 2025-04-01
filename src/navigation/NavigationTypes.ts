
import { NativeStackScreenProps } from "@react-navigation/native-stack"

export type RootStackParamList = {
  OnBoarding: undefined;
  Registration: undefined;
};

export type OnBoardingScreenProps = NativeStackScreenProps<RootStackParamList, "OnBoarding">;
export type RegistrationScreenProps = NativeStackScreenProps<RootStackParamList, "Registration">;
