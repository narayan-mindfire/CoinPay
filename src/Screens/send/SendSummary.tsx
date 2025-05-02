import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image } from "react-native";

import icons from "@/src/Assets/icons";
import images from "@/src/Assets/images";
import Button from "@/src/components/Button";
import Message from "@/src/components/Message";

import { useAppDispatch, useAppSelector } from "@/src/redux/store";
import { useTheme } from "@react-navigation/native";
import { useTranslation } from "react-i18next";

import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "@/firebaseConfig";
import { clearCurrentTransaction } from "@/src/redux/slices/currentTransactionSlice";
import { getCardType } from "@/src/utils/cardTypes";

// shows the summary of the current transaction

const SendSummary = ({ navigation, route }: any) => {
  const { colors } = useTheme();
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const isRequest = route?.params?.isRequest || false;
  const requestUser = route?.params?.user || null;

  const transaction = useAppSelector((state) => state.currentTransaction);
  const selectedCard = transaction.selectedCard;
  console.log("selected card: ", selectedCard);
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

  // fetching receiver's details to be displayed in screen
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
        message={
          isRequest
            ? t("sendSummary.requestMessage")
            : t("sendSummary.successMessage", {
                date: formattedDate,
                time: formattedTime,
              })
        }
        type="success"
      />

      {/* showing the receiver's details for send screen else the one whom it is requested */}
      {(receiver || requestUser) && (
        <View style={styles.profileBox}>
          <Image source={images.profile} style={styles.avatar} />
          <Text style={styles.name}>
            {isRequest ? requestUser?.name : receiver?.name}
          </Text>
          <Text style={styles.email}>
            {isRequest ? requestUser?.email : receiver?.email}
          </Text>
          <Text style={styles.linkText}>{t("sendSummary.coinpayID")}</Text>
        </View>
      )}

      {!isRequest && (
        <Text style={styles.label}>{t("sendSummary.account")}</Text>
      )}
      {!isRequest && selectedCard && (
        <View style={styles.cardBox}>
          <Image
            source={icons[getCardType(selectedCard.card)]}
            style={styles.cardIcon}
          />
          <Text style={styles.cardLabel}>{t("sendSummary.account")}</Text>
          <Text style={styles.cardNumber}>
            **** {selectedCard.card.slice(-4)}
          </Text>
        </View>
      )}

      <Button
        buttonText={t("sendSummary.backHome")}
        handleButton={() => {
          navigation.navigate("BottomTab");
          dispatch(clearCurrentTransaction());
        }}
        outlined={false}
      />

      {!isRequest && (
        <Button
          buttonText={t("sendSummary.anotherPayment")}
          handleButton={() => {
            navigation.navigate("ChooseRecepient");
            dispatch(clearCurrentTransaction());
          }}
          outlined={true}
        />
      )}

      <Text style={styles.footerText}>
        {t("sendSummary.thankYou")}
        <Text style={styles.contactUs}>{t("sendSummary.contactUs")}</Text>
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
      color: colors.textPrimary,
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
      color: colors.textPrimary,
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
      color: colors.textPrimary,
    },
    cardNumber: {
      fontSize: 14,
      color: colors.textSecondary,
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
      color: colors.textSecondary,
    },
    contactUs: {
      color: colors.link || colors.primary,
    },
  });
