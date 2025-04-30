// types for naivgation of all navigators of the app are defined here

import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
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
  CardList: undefined;
  BottomTab: any;
  ChooseRecepient: undefined;
  PurposeSelection: undefined;
  SendSummary: undefined;
  ChooseSender: undefined;
  PurposeSelectionReceive: undefined;
  ReceiveQR: undefined;
  DataPrivacy: undefined;
  Settings: undefined;
  ScanSend: undefined;
}

export type AddCardScreenProps = NativeStackScreenProps<PrimaryStackParamList, "AddCard">;
export type CardFormScreenProps = NativeStackScreenProps<PrimaryStackParamList, "CardForm">;
export type VerifyCardProps = NativeStackScreenProps<PrimaryStackParamList, "VerifyCard">;
export type CardListProps = NativeStackScreenProps<PrimaryStackParamList, "CardList">;
export type ChooseRecepientProps = NativeStackScreenProps<PrimaryStackParamList, "ChooseRecepient">;
export type PurposeSelectionProps = NativeStackScreenProps<PrimaryStackParamList, "PurposeSelection">;
export type SendSummaryProps = NativeStackScreenProps<PrimaryStackParamList, "SendSummary">;
export type ChooseSenderProps = NativeStackScreenProps<PrimaryStackParamList, "ChooseSender">;
export type PurposeSelectionReceiveProps = NativeStackScreenProps<PrimaryStackParamList, "PurposeSelectionReceive">;
export type ReceiveQRProps = NativeStackScreenProps<PrimaryStackParamList, "ReceiveQR">;
export type ScanSendProps = NativeStackScreenProps<PrimaryStackParamList, "ScanSend">;


export type BottomTabParamList = {
  Home: undefined;
  Statistics: undefined;
  Scan: undefined;
  Support: undefined;
  Profile: undefined;
};

export type HomeTabScreenProps = BottomTabScreenProps<BottomTabParamList, "Home">;
export type StaticticsTabScreenProps = BottomTabScreenProps<BottomTabParamList, "Statistics">;
export type ScanTabScreenProps = BottomTabScreenProps<BottomTabParamList, "Scan">;
export type SupportTabScreenProps = BottomTabScreenProps<BottomTabParamList, "Support">;
export type ProfileTabScreenProps = BottomTabScreenProps<BottomTabParamList, "Profile">;

export type StaticsTabParamList = {
  Spending: undefined;
  Income: undefined;
  Bills: undefined;   
  Savings: undefined;
};

export type SpendingTabScreenProps = BottomTabScreenProps<StaticsTabParamList, "Spending">;
export type IncomeTabScreenProps = BottomTabScreenProps<StaticsTabParamList, "Income">;
export type BillsTabScreenProps = BottomTabScreenProps<StaticsTabParamList, "Bills">;
export type SavingsTabScreenProps = BottomTabScreenProps<StaticsTabParamList, "Savings">;