
import { NativeStackScreenProps } from "@react-navigation/native-stack"

export type RootStackParamList = {
  AuthStack: any
};

export type AuthStackParamList = {
  OnBoarding: undefined;
  Registration: undefined;
  PhoneVerification : undefined;
  OtpVerification: {phone : string, countryCode: string};
  AddEmail: undefined;
  AddCountry: undefined;
  HomeAddress: undefined;
  PersonalInfo: undefined;
  ScanId: undefined;
}

export type OnBoardingScreenProps = NativeStackScreenProps<AuthStackParamList, "OnBoarding">;
export type RegistrationScreenProps = NativeStackScreenProps<AuthStackParamList, "Registration">;
export type PhoneVerificationScreenProps = NativeStackScreenProps<AuthStackParamList, "PhoneVerification">;
export type OtpVerificationProps = NativeStackScreenProps<AuthStackParamList, "OtpVerification">;
export type AddEmailProps = NativeStackScreenProps<AuthStackParamList, "AddEmail">;
export type AddCountryScreenProps = NativeStackScreenProps<AuthStackParamList, "AddCountry">;
export type HomeAddressScreenProps = NativeStackScreenProps<AuthStackParamList, "HomeAddress">;
export type PersonalInfoScreenProps = NativeStackScreenProps<AuthStackParamList, "PersonalInfo">;
export type ScanIdScreenProps = NativeStackScreenProps<AuthStackParamList, "ScanId">;