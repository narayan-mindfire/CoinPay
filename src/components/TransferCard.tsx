import React from "react";

import { View, Text, StyleSheet, Image, TextInput } from "react-native";

import Button from "@/src/components/Button";
import countryIcons from "../Assets/icons/country-icons";
import images from "../Assets/images";

import { useTheme } from "@react-navigation/native";
import { useTranslation } from "react-i18next";

// this components shown while making a transaction
const TransferCard = ({ user, amount, setAmount, onContinue }) => {
  const { colors } = useTheme();
  const { t } = useTranslation();

  const styles = createStyles(colors);

  return (
    <View style={styles.container}>
      <Image source={images[user.pic]} style={styles.avatar} />
      <Text style={styles.name}>{user.name}</Text>
      <Text style={styles.email}>{user.email}</Text>

      <View style={styles.inputWrapper}>
        <Image source={countryIcons["US"]} style={styles.flagIcon} />
        <TextInput
          value={amount}
          onChangeText={setAmount}
          keyboardType="numeric"
          placeholder="0"
          style={styles.amountInput}
          placeholderTextColor={colors.textSecondary}
        />
      </View>
      <Button
        buttonText={t("purposeSelection.continue")}
        handleButton={onContinue}
      />
    </View>
  );
};

export default TransferCard;

const createStyles = (colors) =>
  StyleSheet.create({
    container: {
      alignItems: "center",
      backgroundColor: colors.backgroundModal,
      padding: 20,
      borderRadius: 20,
    },
    avatar: {
      width: 60,
      height: 60,
      borderRadius: 30,
      marginBottom: 12,
    },
    name: {
      fontSize: 16,
      fontWeight: "600",
      color: colors.textPrimary,
    },
    email: {
      fontSize: 13,
      color: colors.textSecondary,
      marginBottom: 20,
    },
    inputWrapper: {
      alignItems: "center",
      width: "100%",
      marginBottom: 16,
    },

    flagIcon: {
      width: 28,
      height: 28,
      marginBottom: 8,
      borderRadius: 40,
    },

    amountInput: {
      fontSize: 28,
      color: colors.textPrimary,
      textAlign: "center",
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
      width: "60%",
      paddingVertical: 10,
    },
  });
