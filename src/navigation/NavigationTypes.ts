
import { NativeStackScreenProps } from "@react-navigation/native-stack"

export type RootStackParamList = {
  OnBoarding: undefined;
  Registration: undefined;
  PhoneVerification : undefined;
  OtpVerification: {phone : string, countryCode: string}
};

export type OnBoardingScreenProps = NativeStackScreenProps<RootStackParamList, "OnBoarding">;
export type RegistrationScreenProps = NativeStackScreenProps<RootStackParamList, "Registration">;
export type PhoneVerificationScreenProps = NativeStackScreenProps<RootStackParamList, "PhoneVerification">;
export type OtpVerificationProps = NativeStackScreenProps<RootStackParamList, "OtpVerification">;
