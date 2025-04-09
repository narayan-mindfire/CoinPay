
import { NativeStackScreenProps } from "@react-navigation/native-stack"

export type RootStackParamList = {
  AuthStack: any
  PrimaryStack: any
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
  TakeSelfie: undefined;
  FinishSetup: undefined;
  ScanDoc: undefined;
  SelfieCam: undefined;
  SetupPin: undefined;
  Welcome: undefined;
  Login: undefined;
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
export type TakeSelfieScreenProps = NativeStackScreenProps<AuthStackParamList, "TakeSelfie">;
export type FinishSetupScreenProps = NativeStackScreenProps<AuthStackParamList, "FinishSetup">;
export type ScanDocScreenProps = NativeStackScreenProps<AuthStackParamList, "ScanDoc">;
export type SelfieCamScreenProps = NativeStackScreenProps<AuthStackParamList, "SelfieCam">;
export type SetupPinScreenProps = NativeStackScreenProps<AuthStackParamList, "SetupPin">;
export type WelcomeScreenProps = NativeStackScreenProps<AuthStackParamList, "Welcome">;
export type LoginScreenProps = NativeStackScreenProps<AuthStackParamList, "Login">;


export type PrimaryStackParamList = {
  AddCard: undefined;
  CardForm: undefined;
  VerifyCard: undefined;
}

export type AddCardScreenProps = NativeStackScreenProps<PrimaryStackParamList, "AddCard">;
export type CardFormScreenProps = NativeStackScreenProps<PrimaryStackParamList, "CardForm">;
export type VerifyCardProps = NativeStackScreenProps<PrimaryStackParamList, "VerifyCard">;