import React, { useEffect, useState, useTransition } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Keyboard,
  Image,
} from "react-native";
import Button from "@/src/components/Button";
import { CardFormScreenProps } from "@/src/navigation/NavigationTypes";
import { useTheme } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import icons from "@/src/Assets/icons";

/**
 * CardForm Screen Component
 * Allows users to add their card details to the platform
 */

const CardForm = ({ navigation }: CardFormScreenProps) => {
  const { colors } = useTheme();
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [card, setCard] = useState("");
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
        <Text style={styles.title}>{t("cardForm.title")}</Text>
        <Text style={styles.subtitle}>{t("cardForm.subtitle")}</Text>
        {/* Address Input */}
        <Text style={styles.label}>{t("cardForm.nameLabel")}</Text>
        <View style={styles.emailContainer}>
          <View style={styles.inputWrapper}>
            {!address && (
              <Text style={styles.placeholderText}>
                {t("cardForm.namePlaceholder")}
              </Text>
            )}
            <TextInput
              style={styles.emailInput}
              placeholder=""
              value={address}
              onChangeText={setAddress}
            />
          </View>
        </View>
        {/* email input  */}
        <Text style={styles.label}>{t("cardForm.emailLabel")}</Text>
        <View style={styles.emailContainer}>
          <Image source={icons.envelope} tintColor={colors.border} />

          <View style={styles.inputWrapper}>
            {!email && (
              <Text style={styles.placeholderText}>
                {" "}
                {t("cardForm.emailPlaceholder")}
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
        {/* postcode input  */}
        <Text style={styles.label}>{t("cardForm.cardLabel")}</Text>
        <View style={styles.emailContainer}>
          <Image source={icons.mastercard} />

          <View style={styles.inputWrapper}>
            {!card && (
              <Text style={styles.placeholderText}>
                {t("cardForm.cardPlaceholder")}
              </Text>
            )}
            <TextInput
              style={styles.emailInput}
              placeholder=""
              value={card}
              onChangeText={setCard}
            />
          </View>
        </View>

        {/* button set to disabled when either password or phone number not given, button height adjusted based on keyboardvisibility */}
        <Button
          buttonText={t("cardForm.button")}
          handleButton={() => navigation.navigate("VerifyCard")}
          outlined={false}
          disabled={address === "" || email === "" || card === ""}
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
  });

export default CardForm;
