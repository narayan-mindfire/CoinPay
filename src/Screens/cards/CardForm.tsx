import React, { useEffect, useState } from "react";

import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Keyboard,
  Image,
} from "react-native";

import Button from "@/src/components/Button";
import icons from "@/src/Assets/icons";

import { useTranslation } from "react-i18next";
import { useTheme } from "@react-navigation/native";

import { CardFormScreenProps } from "@/src/navigation/NavigationTypes";
import { validateEmail } from "@/src/utils/formFieldValidators";
import CustomTextField from "@/src/components/CustomTextField";
/**
 * CardForm Screen Component
 * Allows users to add their card details to the platform
 */

const CardForm = ({ navigation }: CardFormScreenProps) => {
  const { colors } = useTheme();
  const { t } = useTranslation();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [card, setCard] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  const emailError = validateEmail(email);

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

  return (
    <View style={styles.container}>
      <View style={{ paddingHorizontal: 14 }}>
        <Text style={styles.title}>{t("cardForm.title")}</Text>
        <Text style={styles.subtitle}>{t("cardForm.subtitle")}</Text>
        {/* Address Input */}
        <Text style={styles.label}>{t("cardForm.nameLabel")}</Text>
        <CustomTextField
          value={name}
          onChangeText={(text) => {
            setName(text);
          }}
          placeholder={t("cardForm.namePlaceholder")}
          error=""
          touched={email !== ""}
          style={{ marginBottom: 5 }}
        />
        {/* email input  */}
        <Text style={styles.label}>{t("cardForm.emailLabel")}</Text>
        <CustomTextField
          value={email}
          onChangeText={(text) => {
            setEmail(text);
            validateEmail(text);
          }}
          placeholder={t("addEmail.placeholder")}
          iconLeft={icons.envelope}
          error={emailError}
          touched={email !== ""}
          style={{ marginBottom: 5 }}
        />
        {/* postcode input  */}
        <Text style={styles.label}>{t("cardForm.cardLabel")}</Text>
        <View style={styles.emailContainer}>
          <Image source={icons.mastercard} />

          <View style={styles.inputRow}>
            <TextInput
              style={[styles.inputField, styles.cardNumber]}
              placeholder="Card Number"
              placeholderTextColor={colors.textDisabled}
              value={card}
              onChangeText={setCard}
              keyboardType="number-pad"
              maxLength={16}
            />
            <TextInput
              style={[styles.inputField, styles.expiry]}
              placeholder="MM/YY"
              placeholderTextColor={colors.textDisabled}
              value={expiry}
              onChangeText={setExpiry}
              keyboardType="number-pad"
              maxLength={5}
            />
            <TextInput
              style={[styles.inputField, styles.cvv]}
              placeholder="CVV"
              placeholderTextColor={colors.textDisabled}
              value={cvv}
              onChangeText={setCvv}
              keyboardType="number-pad"
              maxLength={4}
              secureTextEntry
            />
          </View>
        </View>

        {/* button set to disabled when either password or phone number not given, button height adjusted based on keyboardvisibility */}
        <Button
          buttonText={t("cardForm.button")}
          handleButton={() => navigation.navigate("VerifyCard")}
          outlined={false}
          disabled={name === "" || email === "" || card === ""}
          buttonStyles={{ marginTop: isKeyboardVisible ? 20 : 300 }}
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
      marginVertical: 7,
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
      top: "20%",
      transform: [{ translateY: -8 }],
      fontSize: 18,
      color: colors.textDisabled,
    },
    emailInput: {
      fontSize: 18,
      color: colors.textTertiary,
      width: "100%",
    },
    inputRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginVertical: 10,
      gap: 10,
    },
    inputField: {
      backgroundColor: "transparent",
      paddingHorizontal: 10,
      borderWidth: 0,
      borderRadius: 6,
      fontSize: 16,
    },
    cardNumber: {
      flex: 2.5,
      color: colors.textPrimary,
    },
    expiry: {
      flex: 1,
      color: colors.textPrimary,
    },
    cvv: {
      flex: 0.8,
      color: colors.textPrimary,
    },
  });

export default CardForm;
