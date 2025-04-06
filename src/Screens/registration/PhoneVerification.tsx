import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  ScrollView,
  Keyboard,
} from "react-native";
import Button from "@/src/components/Button";
import { PhoneVerificationScreenProps } from "@/src/navigation/NavigationTypes";
import { useTheme } from "@react-navigation/native";
import icons from "@/src/Assets/icons";
import countryIcons from "@/src/Assets/icons/country-icons";
import countryCodes from "@/src/utils/country-code";
import CountryModal from "@/src/components/CountryModal";
import PhoneVerificationModal from "@/src/components/verifyPhoneModal";

/**
 * Registration Screen Component
 * Allows users to register using their phone number and password.
 */

const Registration = ({ navigation }: PhoneVerificationScreenProps) => {
  const { colors } = useTheme();
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

  const styles = createStyles(colors);
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
              }}
              onCancel={() => setVerifyModalVisible(false)}
            />
            <View style={{ paddingHorizontal: 14 }}>
              <Text style={styles.title}>Create an Account</Text>
              <Text style={styles.subtitle}>
                Enter your mobile number to verify your account
              </Text>

              {/* Phone Input */}
              <Text style={styles.label}>Phone</Text>
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
                <View style={styles.rightBox}>
                  {!phone && (
                    <Text style={styles.placeholderText}>
                      {" "}
                      {"      "}Mobile number
                    </Text>
                  )}
                  <TextInput
                    style={styles.phoneInput}
                    placeholder=""
                    keyboardType="phone-pad"
                    value={phone}
                    onChangeText={setPhone}
                  />
                </View>
              </View>

              <Text style={styles.label}>Password</Text>
              <View style={styles.passwordContainer}>
                <Image source={icons.lock} style={styles.lockIcon} />

                <View style={styles.inputWrapper}>
                  {!password && (
                    <Text style={styles.placeholderText}> ◉ ◉ ◉ ◉ ◉ ◉ ◉</Text>
                  )}
                  <TextInput
                    style={styles.passwordInput}
                    placeholder=""
                    secureTextEntry={!passwordVisible}
                    value={password}
                    onChangeText={setPassword}
                  />
                </View>

                <TouchableOpacity
                  onPress={() => setPasswordVisible(!passwordVisible)}
                >
                  <Image
                    source={passwordVisible ? icons.eyeSlash : icons.eye}
                    style={styles.eyeIcon}
                  />
                </TouchableOpacity>
              </View>

              {/* button set to disabled when either password or phone number not given, button height adjusted based on keyboardvisibility */}
              <Button
                buttonText="Sign up"
                handleButton={() => {
                  setVerifyModalVisible(true);
                }}
                outlined={false}
                disabled={password === "" || phone === ""}
                buttonStyles={{ marginTop: isKeyboardVisible ? 180 : 420 }}
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
      borderColor: colors.border,
    },

    leftBox: {
      width: "25%",
      justifyContent: "center",
      alignItems: "center",
      borderWidth: 2,
      borderColor: colors.border,
      borderRadius: 8,
      marginBottom: 15,
      height: 50,
      marginRight: "2%",
    },
    countryButton: {
      flexDirection: "row",
      alignItems: "center",
    },

    rightBox: {
      width: "73%",
      justifyContent: "center",
      paddingHorizontal: 10,
      borderRadius: 8,
      marginBottom: 15,
      height: 50,
      borderWidth: 2,
      borderColor: colors.border,
    },

    countryCode: {
      flexDirection: "row",
      alignItems: "center",
      paddingRight: 10,
      borderRightWidth: 1,
      borderRightColor: colors.border,
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
    phoneInput: {
      flex: 1,
      fontSize: 18,
      color: colors.textTertiary,
      paddingLeft: 10,
      letterSpacing: 2,
    },
    inputContainer: {
      flex: 1,
      position: "relative",
    },
    passwordContainer: {
      flexDirection: "row",
      alignItems: "center",
      borderWidth: 2,
      borderColor: colors.border,
      borderRadius: 8,
      paddingHorizontal: 10,
      height: 50,
    },

    inputWrapper: {
      flex: 1,
      position: "relative",
    },

    placeholderText: {
      position: "absolute",
      left: 0,
      top: "45%",
      transform: [{ translateY: -9 }],
      fontSize: 18,
      color: colors.textDisabled,
    },

    passwordInput: {
      fontSize: 18,
      color: colors.textTertiary,
      width: "100%",
      letterSpacing: 5,
    },

    lockIcon: {
      width: 25,
      height: 25,
      marginRight: 10,
      tintColor: colors.border,
    },

    eyeIcon: {
      width: 25,
      height: 25,
      tintColor: colors.border,
    },
    modalContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    modalContent: {
      width: "80%",
      backgroundColor: colors.background,
      borderRadius: 10,
      borderWidth: 3,
      borderColor: colors.border,
      padding: 20,
      maxHeight: 400,
    },
    modalItem: {
      flexDirection: "row",
      alignItems: "center",
      paddingVertical: 10,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    modalFlag: {
      width: 24,
      height: 16,
      marginRight: 10,
    },
    modalText: {
      fontSize: 16,
      color: colors.textPrimary,
    },
    progressContainer: {
      width: "100%",
      alignItems: "center",
      top: 50,
      marginBottom: 30,
    },
  });

export default Registration;
