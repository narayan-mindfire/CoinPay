import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { useTheme } from "@react-navigation/native";
import icons from "@/src/Assets/icons";
import images from "@/src/Assets/images";
import Button from "@/src/components/Button";
import Message from "@/src/components/Message";

const SendSummary = ({ navigation }) => {
  const { colors } = useTheme();
  const styles = createStyles(colors);

  return (
    <View style={styles.container}>
      {/* Top success message */}
      <Message
        message="Transaction Complete! - 01 Jan 2023 at 5:00 pm"
        type="success"
      />

      {/* Profile section */}
      <View style={styles.profileBox}>
        <Image source={images.profile} style={styles.avatar} />
        <Text style={styles.name}>Mehedi Hasan</Text>
        <Text style={styles.email}>helloyouthmind@gmail.com</Text>
        <Text style={styles.linkText}>Coinpay Transaction ID: JD869KQ</Text>
      </View>

      {/* Account info */}
      <Text style={styles.label}>Account</Text>
      <View style={styles.cardBox}>
        <Image source={icons["mastercard"]} style={styles.cardIcon} />
        <Text style={styles.cardLabel}>Account</Text>
        <Text style={styles.cardNumber}>************3994</Text>
        <View style={[styles.radioFill, { backgroundColor: colors.primary }]} />
      </View>

      {/* Buttons */}
      <Button
        buttonText="Back to Homepage"
        handleButton={() => navigation.navigate("BottomTab")}
        outlined={false}
      />
      <Button
        buttonText="Make another Payment"
        handleButton={() => navigation.goBack()}
        outlined={true}
        // customStyle={{ marginTop: 10 }}
      />

      {/* Footer */}
      <Text style={styles.footerText}>
        Thank you for using our app to send money. If you have any questions or
        concerns, please don’t hesitate to{" "}
        <Text style={styles.contactUs}>contact us.</Text>
      </Text>
    </View>
  );
};

export default SendSummary;

const createStyles = (colors: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      padding: 20,
      backgroundColor: colors.background,
    },
    profileBox: {
      backgroundColor: colors.card,
      alignItems: "center",
      borderRadius: 16,
      padding: 20,
      marginVertical: 24,
      width: "100%",
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
      color: colors.text,
    },
    email: {
      fontSize: 13,
      color: colors.textSecondary || colors.text,
    },
    linkText: {
      fontSize: 12,
      color: colors.link || colors.primary,
      marginTop: 4,
    },
    label: {
      alignSelf: "flex-start",
      fontSize: 14,
      fontWeight: "500",
      color: colors.text,
      marginBottom: 12,
    },
    cardBox: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: colors.card,
      padding: 16,
      borderRadius: 14,
      justifyContent: "space-between",
      width: "100%",
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
      color: colors.text,
    },
    cardNumber: {
      fontSize: 14,
      color: colors.textSecondary || colors.text,
      marginRight: 12,
    },
    radioFill: {
      width: 16,
      height: 16,
      borderRadius: 8,
    },
    footerText: {
      fontSize: 12,
      textAlign: "center",
      marginTop: 30,
      color: colors.textSecondary || colors.text,
    },
    contactUs: {
      color: colors.link || colors.primary,
    },
  });
