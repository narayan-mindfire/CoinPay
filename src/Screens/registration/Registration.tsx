import React from "react";

import { View, Text, Image, StyleSheet } from "react-native";

import Button from "@/src/components/Button";
import registrationImages from "@/src/Assets/registration";

import { useTheme } from "@react-navigation/native";
import { useTranslation } from "react-i18next";

import { RegistrationScreenProps } from "@/src/navigation/NavigationTypes";

// registration page showing signup and login options
const Registration = ({ navigation }: RegistrationScreenProps) => {
  const { colors, dark } = useTheme();
  const { t } = useTranslation();

  const styles = createStyles(colors);

  const registrationDark = registrationImages.registrationDark;
  const registration = registrationImages.registration;

  return (
    <View style={styles.container}>
      <Image
        source={dark ? registrationDark : registration}
        style={styles.image}
      />
      <Text style={styles.title}>{t("registration.title")}</Text>
      <Text style={styles.subtitle}>{t("registration.subtitle")}</Text>
      <Button
        buttonText={t("registration.signup")}
        handleButton={() => {
          navigation.push("PhoneVerification");
        }}
        outlined={false}
      />
      <Button
        buttonText={t("registration.login")}
        handleButton={() => {
          navigation.push("Login");
        }}
        outlined={true}
      />

      <Text style={styles.footerText}>
        {t("registration.termsAndPolicy")}{" "}
        <Text style={styles.linkText}>{t("registration.terms")}</Text>{" "}
        {t("and")}{" "}
        <Text style={styles.linkText}>{t("registration.privacy")}</Text>
      </Text>
    </View>
  );
};

export default Registration;

// handled styles to dynamically take color values from theme to remove the need to write inline style

const createStyles = (colors: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: colors.background,
    },
    progressContainer: {
      width: "100%",
      alignItems: "center",
    },
    image: {
      width: "100%",
      resizeMode: "contain",
      marginBottom: 20,
    },
    title: {
      fontSize: 36,
      fontWeight: 800,
      textAlign: "center",
      color: colors.textPrimary,
      marginBottom: 10,
    },
    subtitle: {
      fontSize: 18,
      color: colors.textTertiary,
      textAlign: "center",
      marginBottom: 30,
      paddingHorizontal: 10,
    },
    footerText: {
      fontSize: 18,
      color: "#6B6B6B",
      textAlign: "center",
      marginTop: 30,
      paddingHorizontal: 30,
    },
    linkText: {
      color: colors.borderAccent,
      textDecorationLine: "underline",
    },
  });
