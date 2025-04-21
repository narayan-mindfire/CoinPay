import React, { useState, useRef, useEffect } from "react";

import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Keyboard,
} from "react-native";

import Button from "@/src/components/Button";

import { useTheme } from "@react-navigation/native";
import { useTranslation } from "react-i18next";

import { VerifyCardProps } from "@/src/navigation/NavigationTypes";

interface VerifyProps extends VerifyCardProps {
  email: string;
}

const VerifyCard = ({ navigation, route }: VerifyProps) => {
  const { colors } = useTheme();
  const { t } = useTranslation();

  const { email } = (route.params as { email: string }) || {};

  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const [filled, setFilled] = useState(false);
  const inputRefs = useRef<Array<TextInput | null>>([]);
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  const isOriginalState = code.every((digit) => digit === "");

  const styles = createStyles(colors, isOriginalState);

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

  // Handles user input for OTP fields, managing deletion, navigation, and completion state dynamically.
  const handleKeyPress = (event: any, index: number) => {
    const key = event.nativeEvent.key;
    setCode((prevCode) => {
      const newCode = [...prevCode];

      // handling if backspace -> need to focus back
      if (key === "Backspace") {
        if (newCode[index] !== "") {
          newCode[index] = "";
        } else if (index > 0) {
          newCode[index - 1] = "";
          inputRefs.current[index - 1]?.focus();
        }
      }
      //handling if key is a number -> focus next and set code
      else if (/^\d$/.test(key)) {
        newCode[index] = key;
        if (index < 5) {
          inputRefs.current[index + 1]?.focus();
        }
      }
      //if every place is filled enable the verification button
      if (newCode.every((digit) => digit !== "")) setFilled(true);
      else setFilled(false);

      return newCode;
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t("verifyCard.title")}</Text>
      <Text style={styles.subtitle}>
        {t("verifyCard.subtitle")}
        {email}
      </Text>
      <View style={styles.inputContainer}>
        {code.map((digit, index) => (
          <TextInput
            key={index}
            ref={(el) => (inputRefs.current[index] = el)}
            style={styles.input}
            keyboardType="numeric"
            maxLength={1}
            value={digit}
            onKeyPress={(event) => handleKeyPress(event, index)}
          />
        ))}
      </View>
      <Text style={styles.resendText}>
        {t("verifyCard.resendText")}
        <TouchableOpacity>
          <Text style={styles.resendLink}>{t("verifyCard.resendLink")}</Text>
        </TouchableOpacity>
      </Text>

      <Button
        buttonText={t("verifyCard.verifyButton")}
        handleButton={() => {
          navigation.push("CardList");
        }}
        outlined={false}
        disabled={!filled}
        buttonStyles={{ marginTop: isKeyboardVisible ? 200 : 400 }}
      />
    </View>
  );
};

export default VerifyCard;

// stylesheet made dynamic
const createStyles = (colors: any, isOriginalState: boolean) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
      alignItems: "center",
      marginTop: 30,
    },
    progressContainer: {
      width: "100%",
      alignItems: "center",
      top: 20,
      marginBottom: 30,
    },
    title: {
      fontSize: 24,
      fontWeight: "700",
      color: colors.textPrimary,
      alignSelf: "flex-start",
      marginLeft: 20,
    },
    subtitle: {
      fontSize: 16,
      color: colors.textSecondary,
      textAlign: "left",
      alignSelf: "flex-start",
      marginLeft: 20,
      marginBottom: 30,
    },

    inputContainer: {
      flexDirection: "row",
      justifyContent: "center",
      marginBottom: 20,
    },
    input: {
      width: 40,
      height: 50,
      borderBottomWidth: 2,
      borderBottomColor: isOriginalState ? colors.border : colors.borderAccent,
      textAlign: "center",
      fontSize: 20,
      marginHorizontal: 5,
      color: colors.borderAccent,
    },
    resendText: {
      fontSize: 16,
      color: colors.textSecondary,
      marginBottom: 30,
    },
    resendLink: {
      color: colors.primary,
    },
  });
