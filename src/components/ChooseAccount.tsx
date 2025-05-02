import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useTheme } from "@react-navigation/native";
import Button from "@/src/components/Button";
import images from "../Assets/images";
import icons from "../Assets/icons";
import { useTranslation } from "react-i18next";

import { useAppDispatch, useAppSelector } from "@/src/redux/store";
import { getCardsFromFirebase } from "@/src/redux/slices/cardSlice";
import { getCardType } from "@/src/utils/cardTypes";
import { setSelectedCard } from "../redux/slices/currentTransactionSlice";

const ChooseAccount = ({ user, amount, onContinue }) => {
  const { colors } = useTheme();
  const { t } = useTranslation();
  const styles = createStyles(colors);

  const dispatch = useAppDispatch();
  const { cards } = useAppSelector((state) => state.card);
  const [selectedCardId, setSelectedCardId] = useState(null);

  useEffect(() => {
    dispatch(getCardsFromFirebase());
  }, [dispatch]);

  const handleCardSelect = (id) => {
    setSelectedCardId(id);
  };

  return (
    <View style={styles.container}>
      {/* Profile Section */}
      <View style={styles.profileBox}>
        <Image source={images[user.pic]} style={styles.avatar} />
        <Text style={styles.name}>{user.name}</Text>
        <Text style={styles.email}>{user.email}</Text>
      </View>

      {/* Account Selection */}
      <Text style={styles.label}>{t("chooseAccount.title")}</Text>

      <ScrollView>
        {cards.map((card) => (
          <TouchableOpacity
            key={card.id}
            style={styles.cardBox}
            onPress={() => handleCardSelect(card.id)}
          >
            <Image
              source={icons[getCardType(card.card)]}
              style={styles.cardIcon}
            />
            <Text style={styles.cardLabel}>{t("chooseAccount.account")}</Text>
            <Text style={styles.cardNumber}>**** {card.card.slice(-4)}</Text>
            <View
              style={[
                styles.radioCircle,
                selectedCardId === card.id && {
                  borderColor: colors.primary,
                  backgroundColor: colors.primary,
                },
              ]}
            />
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Pay Button */}
      <Button
        buttonText={`${t("chooseAccount.pay")} ₹${amount}`}
        handleButton={() => {
          const selectedCard = cards.find((c) => c.id === selectedCardId);
          dispatch(setSelectedCard(selectedCard));
          onContinue(selectedCardId);
        }}
        disabled={!selectedCardId}
      />
    </View>
  );
};

export default ChooseAccount;

const createStyles = (colors) =>
  StyleSheet.create({
    container: {
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
      marginBottom: 14,
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
      borderColor: colors.border,
      backgroundColor: "transparent",
    },
  });
