import React from "react";

import { View, Text, Image, StyleSheet } from "react-native";

import Button from "./Button";
import images from "@/src/Assets/images";

import { useTranslation } from "react-i18next";
import { useTheme } from "@react-navigation/native";

// request user components to request amount from users
const RequestUser = ({ user, amount, onContinue }) => {
  const { colors } = useTheme();
  const { t } = useTranslation();

  const styles = createStyles(colors);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t("sendRequest.title")}</Text>
      <Text style={styles.subtitle}>{t("sendRequest.subtitle")}</Text>

      <View style={styles.profileCard}>
        <Image source={images[user.pic]} style={styles.avatar} />
        <Text style={styles.name}>{user.name}</Text>
        <Text style={styles.email}>{user.email}</Text>
      </View>

      <Button
        buttonText={t("sendRequest.buttonText", { amount: `${amount}` })}
        handleButton={onContinue}
      />
    </View>
  );
};

export default RequestUser;

const createStyles = (colors: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      backgroundColor: colors.background,
      alignItems: "center",
    },
    title: {
      fontSize: 24,
      fontWeight: "700",
      color: colors.textPrimary,
      marginBottom: 4,
    },
    subtitle: {
      fontSize: 14,
      color: colors.textTertiary,
      marginBottom: 24,
    },
    profileCard: {
      backgroundColor: colors.card,
      width: "100%",
      alignItems: "center",
      padding: 24,
      borderRadius: 16,
      marginBottom: 30,
    },
    avatar: {
      width: 60,
      height: 60,
      borderRadius: 30,
      marginBottom: 8,
    },
    name: {
      fontSize: 16,
      fontWeight: "600",
      color: colors.textPrimary,
    },
    email: {
      fontSize: 13,
      color: colors.textTertiary,
    },
  });
