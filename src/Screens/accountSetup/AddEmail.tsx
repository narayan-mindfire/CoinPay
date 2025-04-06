import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TextInput,
  Keyboard,
} from "react-native";
import Button from "@/src/components/Button";
import { AddEmailProps } from "@/src/navigation/NavigationTypes";
import { useTheme } from "@react-navigation/native";
import icons from "@/src/Assets/icons";
import { useTranslation } from "react-i18next";
/**
 * AddEmail Screen Component
 * Allows users to add their email to account setup
 */

const AddEmail = ({ navigation }: AddEmailProps) => {
  const { colors } = useTheme();
  const [email, setEmail] = useState("");
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const { t } = useTranslation();
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
    <View style={styles.container}>
      <View style={{ paddingHorizontal: 14 }}>
        <Text style={styles.title}>{t("addEmail.title")}</Text>
        <Text style={styles.subtitle}>{t("addEmail.subtitle")}</Text>
        {/* Email Input */}
        <Text style={styles.label}>{t("addEmail.label")}</Text>
        <View style={styles.emailContainer}>
          <Image source={icons.envelope} style={styles.lockIcon} />

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
              onChangeText={setEmail}
            />
          </View>
        </View>

        {/* button set to disabled when either password or phone number not given, button height adjusted based on keyboardvisibility */}
        <Button
          buttonText={t("addEmail.button")}
          handleButton={() => {
            navigation.navigate("HomeAddress");
          }}
          outlined={false}
          disabled={email === ""}
          buttonStyles={{ marginTop: isKeyboardVisible ? 180 : 420 }}
        />
      </View>
    </View>
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
      fontSize: 16,
      fontWeight: "bold",
      color: colors.textPrimary,
      marginBottom: 10,
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
    },
    inputContainer: {
      flex: 1,
      position: "relative",
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

    inputWrapper: {
      flex: 1,
      position: "relative",
    },

    placeholderText: {
      position: "absolute",
      left: 5,
      top: "40%",
      transform: [{ translateY: -8 }],
      fontSize: 18,
      color: colors.textDisabled,
    },

    emailInput: {
      fontSize: 18,
      color: colors.textTertiary,
      width: "100%",
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

export default AddEmail;
