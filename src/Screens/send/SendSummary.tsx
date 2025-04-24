import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image } from "react-native";

import icons from "@/src/Assets/icons";
import images from "@/src/Assets/images";
import Button from "@/src/components/Button";
import Message from "@/src/components/Message";

import { useAppSelector } from "@/src/redux/store";
import { useTheme } from "@react-navigation/native";

import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "@/firebaseConfig";

const SendSummary = ({ navigation }) => {
  const { colors } = useTheme();
  const transaction = useAppSelector((state) => state.currentTransaction);
  const [receiver, setReceiver] = useState(null);

  const transactionDateTime = new Date();
  const formattedDate = transactionDateTime.toLocaleDateString(undefined, {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
  const formattedTime = transactionDateTime.toLocaleTimeString(undefined, {
    hour: "2-digit",
    minute: "2-digit",
  });

  useEffect(() => {
    const fetchReceiverData = async () => {
      const receiverQuery = query(
        collection(db, "users"),
        where("uid", "==", transaction.receiverUID)
      );
      const querySnapshot = await getDocs(receiverQuery);
      if (!querySnapshot.empty) {
        const receiverData = querySnapshot.docs[0].data();
        setReceiver(receiverData);
      }
    };

    if (transaction.receiverUID) {
      fetchReceiverData();
    }
  }, [transaction.receiverUID]);

  const styles = createStyles(colors);

  return (
    <View style={styles.container}>
      <Message
        message={`Transaction Complete! - ${formattedDate} at ${formattedTime}`}
        type="success"
      />

      {receiver && (
        <View style={styles.profileBox}>
          <Image source={images.profile} style={styles.avatar} />
          <Text style={styles.name}>{receiver.name}</Text>
          <Text style={styles.email}>{receiver.email}</Text>
          <Text style={styles.linkText}>Coinpay Transaction ID: 12345</Text>
        </View>
      )}

      <Text style={styles.label}>Account</Text>
      <View style={styles.cardBox}>
        <Image source={icons["mastercard"]} style={styles.cardIcon} />
        <Text style={styles.cardLabel}>Account</Text>
        <Text style={styles.cardNumber}>************3994</Text>
        <View style={[styles.radioFill, { backgroundColor: colors.primary }]} />
      </View>

      <Button
        buttonText="Back to Homepage"
        handleButton={() => navigation.navigate("BottomTab")}
        outlined={false}
      />
      <Button
        buttonText="Make another Payment"
        handleButton={() => navigation.goBack()}
        outlined={true}
      />

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
