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
import { LoginScreenProps } from "@/src/navigation/NavigationTypes";
import { useTheme } from "@react-navigation/native";
import icons from "@/src/Assets/icons";
import { useTranslation } from "react-i18next";
import { validateEmail } from "@/src/utils/formFieldValidators";
import { loginUser } from "@/src/redux/slices/authSlice";
import { useAppDispatch } from "@/src/redux/store";
/**
 * Login Screen Component
 * Allows users to register using their phone number and password.
 */

const Login = () => {
  const { colors } = useTheme();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const { t } = useTranslation();
  const emailError = validateEmail(email);

  const dispatch = useAppDispatch();
  const handleLogin = () => {
    console.log("logging in user");
    setTimeout(() => {
      dispatch(loginUser({ email, password }));
    }, 100);
  };

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
            <View style={{ paddingHorizontal: 14 }}>
              <Text style={styles.title}>{t("login.title")}</Text>
              <Text style={styles.subtitle}>{t("login.subtitle")}</Text>
              {/* Phone Input */}
              <Text style={styles.label}>{t("addEmail.label")}</Text>
              <View
                style={[
                  styles.emailContainer,
                  {
                    borderColor: emailError ? colors.error : colors.primary,
                  },
                ]}
              >
                <Image source={icons.envelope} style={styles.envelopeIcon} />

                <View style={styles.inputWrapper}>
                  {!email && (
                    <Text style={styles.placeholderText}>
                      {t("addEmail.placeholder")}
                    </Text>
                  )}
                  <TextInput
                    style={styles.emailInput}
                    placeholder=""
                    value={email}
                    onChangeText={(text) => {
                      setEmail(text);
                      validateEmail(text);
                    }}
                  />
                </View>
              </View>
              {emailError ? (
                <Text style={{ color: colors.error, fontSize: 12 }}>
                  {emailError}
                </Text>
              ) : null}
              <Text style={styles.label}>{t("login.passwordLabel")}</Text>
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
              <TouchableOpacity>
                <Text style={styles.forgotLink}>
                  {t("login.forgotPassword")}
                </Text>
              </TouchableOpacity>

              {/* button set to disabled when either password or phone number not given, button height adjusted based on keyboardvisibility */}
              <Button
                buttonText={t("login.loginButton")}
                handleButton={handleLogin}
                outlined={false}
                disabled={password === "" || emailError !== ""}
                buttonStyles={{ marginTop: isKeyboardVisible ? 60 : 320 }}
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
      fontSize: 32,
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
      marginTop: 7,
    },
    phoneContainer: {
      flexDirection: "row",
      alignItems: "center",
      borderColor: colors.border,
    },
    envelopeIcon: {
      width: 25,
      height: 25,
      marginRight: 10,
      tintColor: colors.border,
    },
    countryButton: {
      flexDirection: "row",
      alignItems: "center",
    },
    emailContainer: {
      flexDirection: "row",
      alignItems: "center",
      borderWidth: 2,
      borderColor: colors.border,
      borderRadius: 8,
      paddingHorizontal: 10,
      height: 50,
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
    emailInput: {
      fontSize: 18,
      color: colors.textTertiary,
      width: "100%",
    },
    inputWrapper: {
      flex: 1,
      position: "relative",
    },

    placeholderText: {
      position: "absolute",
      left: 0,
      top: "20%",
      transform: [{ translateY: -9 }],
      fontSize: 18,
      color: colors.textDisabled,
    },
    placeholderTextMobile: {
      position: "absolute",
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
    forgotLink: {
      marginTop: 10,
      fontSize: 16,
      color: colors.primary,
    },
  });
export default Login;
