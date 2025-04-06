import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Keyboard,
} from "react-native";
import { useTheme } from "@react-navigation/native";
import { RegistrationScreenProps } from "@/src/navigation/NavigationTypes";
import Button from "@/src/components/Button";
import icons from "@/src/Assets/icons";
// import AnimatedProgressBar from "@/src/components/progressBar";

interface PhoneVerificationProps extends RegistrationScreenProps {
  phone?: string;
  countryCode?: string;
}

const PhoneVerification = ({ navigation, route }: PhoneVerificationProps) => {
  const { colors } = useTheme();
  const { phone } = (route.params as { phone: string }) || {};
  const { countryCode } = (route.params as { countryCode: string }) || {};
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const isOriginalState = code.every((digit) => digit === "");
  const [filled, setFilled] = useState(false);
  const inputRefs = useRef<Array<TextInput | null>>([]);
  const styles = createStyles(colors, isOriginalState);

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
      <Text style={styles.title}>Confirm your phone</Text>
      <Text style={styles.subtitle}>
        We sent a 6-digit code to {countryCode} {phone}
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
        Didn’t get a code?{" "}
        <TouchableOpacity>
          <Text style={styles.resendLink}>Resend</Text>
        </TouchableOpacity>
      </Text>

      <Button
        buttonText="Verify Your Number"
        handleButton={() => {
          navigation.push("AddCountry");
        }}
        outlined={false}
        disabled={!filled}
        buttonStyles={{ marginTop: isKeyboardVisible ? 150 : 380 }}
      />
    </View>
  );
};

export default PhoneVerification;

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
      marginTop: 20,
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
      textDecorationLine: "underline",
    },
  });
