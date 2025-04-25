import React, { useEffect, useState } from "react";

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  ScrollView,
  Keyboard,
} from "react-native";

import Button from "@/src/components/Button";
import LoaderModal from "@/src/components/LoaderModal";
import icons from "@/src/Assets/icons";

import {
  validateEmail,
  validatePassword,
} from "@/src/utils/formFieldValidators";
import { loginUser } from "@/src/redux/slices/authSlice";
import { RootState, useAppDispatch, useAppSelector } from "@/src/redux/store";

import { useTranslation } from "react-i18next";
import { useTheme } from "@react-navigation/native";
import CustomTextField from "@/src/components/CustomTextField";

/**
 * Login Screen Component
 * Allows users to register using their phone number and password.
 */

const Login = () => {
  const { colors } = useTheme();
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const loading = useAppSelector((state: RootState) => state.auth.loading);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  const emailError = validateEmail(email);
  const passwordError = validatePassword(password);

  const styles = createStyles(colors, emailError);

  // Function to validate email input

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

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView
          contentContainerStyle={styles.contentContainer}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.container}>
            <Text style={styles.title}>{t("login.title")}</Text>
            <Text style={styles.subtitle}>{t("login.subtitle")}</Text>

            <Text style={styles.label}>{t("addEmail.label")}</Text>
            {/* email input */}
            <CustomTextField
              value={email}
              onChangeText={(text) => {
                setEmail(text);
                validateEmail(text);
              }}
              placeholder={t("addEmail.placeholder")}
              iconLeft={icons.envelope}
              error={emailError}
            />
            <Text style={styles.label}>{t("login.passwordLabel")}</Text>
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
            <TouchableOpacity>
              <Text style={styles.forgotLink}>{t("login.forgotPassword")}</Text>
            </TouchableOpacity>

            {/* button set to disabled when either password or phone number not given, button height adjusted based on keyboardvisibility */}
            <Button
              buttonText={t("login.loginButton")}
              handleButton={handleLogin}
              outlined={false}
              disabled={
                password === "" || passwordError !== "" || emailError !== ""
              }
              buttonStyles={{ marginTop: isKeyboardVisible ? 60 : 380 }}
            />
          </View>
          <LoaderModal visible={loading} />
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

// handled styles to dynamically take color values from theme to remove the need to write inline style
const createStyles = (colors: any, emailError: string) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
      paddingHorizontal: 14,
    },
    contentContainer: {
      flexGrow: 1,
      justifyContent: "center",
    },
    title: {
      fontSize: 28,
      fontWeight: "bold",
      color: colors.textPrimary,
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
    forgotLink: {
      fontSize: 16,
      color: colors.primary,
    },
  });
export default Login;
