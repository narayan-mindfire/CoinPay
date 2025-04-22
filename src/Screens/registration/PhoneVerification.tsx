import React, { useEffect, useState } from "react";

import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  ScrollView,
  Keyboard,
} from "react-native";

import Button from "@/src/components/Button";
import icons from "@/src/Assets/icons";
import countryIcons from "@/src/Assets/icons/country-icons";
import countryCodes from "@/src/utils/country-code";
import CountryModal from "@/src/components/CountryModal";
import PhoneVerificationModal from "@/src/components/verifyPhoneModal";

import { PhoneVerificationScreenProps } from "@/src/navigation/NavigationTypes";
import {
  validateEmail,
  validatePassword,
  validatePhone,
} from "@/src/utils/formFieldValidators";

import { useTheme } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { RootState, useAppSelector } from "@/src/redux/store";
import { updateUserForm } from "@/src/redux/slices/userFormSlice";
import CustomTextField from "@/src/components/CustomTextField";
/**
 * PhoneVerification Screen Component
 * Allows users to register using their phone number and password.
 */

const PhoneVerification = ({ navigation }: PhoneVerificationScreenProps) => {
  const { colors } = useTheme();
  const { t } = useTranslation();

  const [passwordVisible, setPasswordVisible] = useState(false);
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [selectedCountry, setSelectedCountry] = useState({
    code: "IN",
    dialCode: "+91",
  });
  const [countryModalVisible, setCountryModalVisible] = useState(false);
  const [verifyModal, setVerifyModalVisible] = useState(false);
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const [email, setEmail] = useState("");

  const emailError = validateEmail(email);
  const passwordError = validatePassword(password);
  const phoneError = validatePhone(phone);

  const styles = createStyles(colors);

  /**
   * Effect to listen for keyboard visibility changes.
   */
  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        setKeyboardVisible(true);
      }
    );

    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setKeyboardVisible(false);
      }
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  const dispatch = useDispatch();
  const userForm = useAppSelector((state: RootState) => state.userForm);

  // Updating user data with email password and phone number

  const addData = () => {
    dispatch(
      updateUserForm({
        email,
        password,
        phone: selectedCountry.dialCode + phone,
      })
    );
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView
          contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.container}>
            {/* Country selection modal */}
            <CountryModal
              visible={countryModalVisible}
              data={countryCodes}
              onSelect={setSelectedCountry}
              onClose={() => setCountryModalVisible(false)}
              countryIcons={countryIcons}
            />
            <PhoneVerificationModal
              visible={verifyModal}
              phoneNumber={phone}
              countryCode={selectedCountry.dialCode}
              onConfirm={() => {
                navigation.push("OtpVerification", {
                  phone,
                  countryCode: selectedCountry.dialCode,
                });
                setVerifyModalVisible(false);
                t: t;
              }}
              onCancel={() => setVerifyModalVisible(false)}
              t={undefined}
            />
            <View style={{ paddingHorizontal: 14 }}>
              <Text style={styles.title}>{t("phoneVerification.title")}</Text>
              <Text style={styles.subtitle}>
                {t("phoneVerification.subtitle")}
              </Text>

              {/* Phone Input */}
              <Text style={styles.label}>
                {t("phoneVerification.phoneLabel")}
              </Text>
              <View style={styles.phoneContainer}>
                {/* Left Box - Country Code */}
                <View style={styles.leftBox}>
                  <TouchableOpacity
                    onPress={() => setCountryModalVisible(true)}
                    style={styles.countryButton}
                  >
                    <Image
                      source={countryIcons[selectedCountry.code]}
                      style={styles.flag}
                    />
                    <Text style={styles.countryText}>
                      {selectedCountry.dialCode}
                    </Text>
                  </TouchableOpacity>
                </View>

                {/* Right Box - Phone Input */}
                <CustomTextField
                  value={phone}
                  onChangeText={(text) => {
                    setPhone(text);
                    validatePhone(text);
                  }}
                  width={"73%"}
                  placeholder="Enter your phone number"
                  error={phoneError}
                  inputStyle={{ fontSize: 16 }}
                  keyboardType="phone-pad"
                  showPlaceholder={true}
                />
              </View>
              <Text style={styles.label}>{t("addEmail.label")}</Text>
              <CustomTextField
                value={email}
                onChangeText={(text) => {
                  setEmail(text);
                }}
                placeholder={t("addEmail.placeholder")}
                error={emailError}
                inputStyle={{ fontSize: 16 }}
                keyboardType="email-address"
                showPlaceholder={true}
                iconLeft={icons.envelope}
              />

              <Text style={styles.label}>
                {t("phoneVerification.passwordLabel")}
              </Text>
              <CustomTextField
                value={password}
                onChangeText={(text) => {
                  setPassword(text);
                }}
                placeholder={"◉◉◉◉◉◉◉"}
                error={passwordError}
                inputStyle={{ fontSize: 16, letterSpacing: 3 }}
                showPlaceholder={true}
                iconLeft={icons.lock}
                isPasswordField={true}
              />
              {/* button set to disabled when either password or phone number not given, button height adjusted based on keyboardvisibility */}
              <Button
                buttonText={t("phoneVerification.signUpButton")}
                handleButton={() => {
                  setVerifyModalVisible(true);
                  addData();
                }}
                outlined={false}
                disabled={
                  email === "" ||
                  password === "" ||
                  phone === "" ||
                  emailError !== "" ||
                  passwordError !== "" ||
                  phoneError !== ""
                }
                buttonStyles={{ marginTop: isKeyboardVisible ? 40 : 300 }}
              />
            </View>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

// handled styles to dynamically take color values from theme to remove the need to write inline style
const createStyles = (colors: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    title: {
      fontSize: 22,
      fontWeight: "bold",
      color: colors.textPrimary,
      marginTop: 30,
    },
    subtitle: {
      fontSize: 18,
      fontWeight: 400,
      color: colors.textTertiary,
      marginBottom: 20,
    },
    label: {
      fontSize: 14,
      fontWeight: "bold",
      color: colors.textPrimary,
      marginBottom: 5,
    },
    phoneContainer: {
      flexDirection: "row",
      alignItems: "center",
    },
    leftBox: {
      width: "25%",
      justifyContent: "center",
      alignItems: "center",
      borderWidth: 2,
      borderColor: colors.border,
      borderRadius: 8,
      height: 50,
      marginRight: "2%",
      marginBottom: 20,
    },
    countryButton: {
      flexDirection: "row",
      alignItems: "center",
    },
    flag: {
      width: 20,
      height: 15,
      marginRight: 5,
    },
    countryText: {
      fontSize: 18,
      color: colors.textPrimary,
    },
  });

export default PhoneVerification;
