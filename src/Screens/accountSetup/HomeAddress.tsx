import React, { useEffect, useState, useTransition } from "react";
import { View, Text, StyleSheet, TextInput, Keyboard } from "react-native";
import Button from "@/src/components/Button";
import { HomeAddressScreenProps } from "@/src/navigation/NavigationTypes";
import { useTheme } from "@react-navigation/native";
import { useTranslation } from "react-i18next";

/**
 * HomeAddress Screen Component
 * Allows users to add their address to account setup
 */

const HomeAddress = ({ navigation }: HomeAddressScreenProps) => {
  const { colors } = useTheme();
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [postCode, setPostCode] = useState("");
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
        <Text style={styles.title}>{t("homeAddress.title")}</Text>
        <Text style={styles.subtitle}>{t("homeAddress.subtitle")}</Text>
        {/* Address Input */}
        <Text style={styles.label}>{t("homeAddress.addressLabel")}</Text>
        <View style={styles.emailContainer}>
          <View style={styles.inputWrapper}>
            {!address && (
              <Text style={styles.placeholderText}>
                {t("homeAddress.addressPlaceholder")}
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
        {/* city input  */}
        <Text style={styles.label}>{t("homeAddress.cityLabel")}</Text>
        <View style={styles.emailContainer}>
          <View style={styles.inputWrapper}>
            {!city && (
              <Text style={styles.placeholderText}>
                {t("homeAddress.cityPlaceholder")}
              </Text>
            )}
            <TextInput
              style={styles.emailInput}
              placeholder=""
              value={city}
              onChangeText={setCity}
            />
          </View>
        </View>
        {/* postcode input  */}
        <Text style={styles.label}>{t("homeAddress.postCodeLabel")}</Text>
        <View style={styles.emailContainer}>
          <View style={styles.inputWrapper}>
            {!postCode && (
              <Text style={styles.placeholderText}>
                {t("homeAddress.postCodePlaceholder")}
              </Text>
            )}
            <TextInput
              style={styles.emailInput}
              placeholder=""
              value={postCode}
              onChangeText={setPostCode}
            />
          </View>
        </View>

        {/* button set to disabled when either password or phone number not given, button height adjusted based on keyboardvisibility */}
        <Button
          buttonText={t("homeAddress.continue")}
          handleButton={() => {
            navigation.navigate("PersonalInfo");
          }}
          outlined={false}
          disabled={address === "" || city === "" || postCode === ""}
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

export default HomeAddress;
