import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { useTheme } from "@react-navigation/native";
import Button from "@/src/components/Button";
import images from "../Assets/images";
import icons from "../Assets/icons";

const ChooseAccount = ({ user, amount, onContinue }) => {
  const { colors } = useTheme();
  const styles = createStyles(colors);

  return (
    <View style={styles.container}>
      {/* Profile Section */}
      <View style={styles.profileBox}>
        <Image source={images[user.pic]} style={styles.avatar} />
        <Text style={styles.name}>{user.name}</Text>
        <Text style={styles.email}>{user.email}</Text>
      </View>

      {/* Account Selection */}
      <Text style={styles.label}>Choose Account</Text>
      <TouchableOpacity style={styles.cardBox}>
        <Image source={icons["mastercard"]} style={styles.cardIcon} />
        <Text style={styles.cardLabel}>Account</Text>
        <Text style={styles.cardNumber}>************3994</Text>
        <View style={styles.radioCircle} />
      </TouchableOpacity>

      {/* Pay Button */}
      <Button
        buttonText={`Pay $${amount}`}
        handleButton={onContinue}
        // customStyle={styles.payBtn}
      />
    </View>
  );
};

export default ChooseAccount;

const createStyles = (colors) =>
  StyleSheet.create({
    container: {
      padding: 20,
      backgroundColor: colors.background,
      borderRadius: 12,
    },
    profileBox: {
      backgroundColor: colors.backgroundModal,
      alignItems: "center",
      borderRadius: 16,
      padding: 20,
      marginBottom: 24,
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
      color: colors.textSecondary,
    },
    label: {
      fontSize: 14,
      fontWeight: "500",
      color: colors.textPrimary,
      marginBottom: 12,
    },
    cardBox: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: colors.backgroundModal,
      padding: 16,
      borderRadius: 14,
      justifyContent: "space-between",
      marginBottom: 24,
    },
    cardIcon: {
      width: 28,
      height: 28,
    },
    cardLabel: {
      flex: 1,
      marginLeft: 10,
      fontSize: 14,
      color: colors.textPrimary,
    },
    cardNumber: {
      fontSize: 14,
      color: colors.textSecondary,
      marginRight: 12,
    },
    radioCircle: {
      width: 20,
      height: 20,
      borderRadius: 10,
      borderWidth: 2,
      borderColor: "#ccc",
    },
    payBtn: {
      backgroundColor: "#3A00FF",
      borderRadius: 50,
    },
  });
