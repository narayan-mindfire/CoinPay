import React from "react";

import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";

import icons from "@/src/Assets/icons";
import Button from "@/src/components/Button";
import Message from "@/src/components/Message";
import { CardListProps } from "@/src/navigation/NavigationTypes";

import { useAppDispatch, useAppSelector } from "@/src/redux/store";
import { getCardsFromFirebase } from "@/src/redux/slices/cardSlice";
import { getCardType } from "@/src/utils/cardTypes";
import { deleteCardFromFirebase } from "@/src/redux/slices/cardSlice";

import { useFocusEffect, useTheme } from "@react-navigation/native";
import { useTranslation } from "react-i18next";

const CardList = ({ navigation }: CardListProps) => {
  const { colors } = useTheme();
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { cards, loading } = useAppSelector((state) => state.card);
  const styles = createStyles(colors);

  useFocusEffect(
    React.useCallback(() => {
      dispatch(getCardsFromFirebase());
    }, [dispatch])
  );

  console.log(cards);

  return (
    <View style={styles.container}>
      <View style={styles.message}>
        <Message message={t("cardList.successMessage")} type="success" />
      </View>

      <View style={styles.cardsContainer}>
        <Text style={styles.title}>{t("cardList.title")}</Text>
        <Text style={styles.subtitle}>{t("cardList.subtitle")}</Text>

        <ScrollView style={styles.scrollContainer}>
          {cards.map((card) => (
            <View key={card.id} style={styles.cardItem}>
              <Image
                source={icons[getCardType(card.card)]}
                style={styles.cardIcon}
              />
              <View style={styles.cardDetails}>
                <Text style={styles.cardText}>{card.card}</Text>
              </View>
              <TouchableOpacity
                onPress={() =>
                  Alert.alert(
                    t("cardList.deleteTitle"),
                    t("cardList.deleteConfirm"),
                    [
                      {
                        text: t("common.cancel"),
                        style: "cancel",
                      },
                      {
                        text: t("common.delete"),
                        style: "destructive",
                        onPress: () =>
                          dispatch(deleteCardFromFirebase(card.id)),
                      },
                    ]
                  )
                }
                style={styles.trashButton}
              >
                <Image source={icons.trash} style={styles.deleteIcon} />
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>

        <Button
          buttonText={t("cardList.addAnother")}
          handleButton={() => navigation.navigate("CardForm")}
          outlined={false}
          disabled={false}
          icon={icons.plus}
        />
        <Button
          buttonText={t("cardList.button")}
          handleButton={() => navigation.navigate("BottomTab")}
          outlined={true}
          disabled={false}
        />
      </View>
    </View>
  );
};

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
      fontSize: 16,
      fontWeight: "400",
      color: colors.textTertiary,
      marginBottom: 20,
    },
    message: {
      justifyContent: "center",
      alignItems: "center",
    },
    cardsContainer: {
      paddingHorizontal: 14,
      flex: 1,
    },
    scrollContainer: {
      maxHeight: 600,
      marginBottom: 20,
    },
    cardItem: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      height: 50,
      borderRadius: 10,
      backgroundColor: colors.card,
      marginBottom: 12,
    },
    cardIcon: {
      width: 32,
      height: 32,
      resizeMode: "contain",
      marginRight: 12,
      marginLeft: 12,
    },
    cardText: {
      fontSize: 16,
      color: colors.textPrimary,
    },
    trashButton: {
      height: "100%",
      width: 45,
      backgroundColor: colors.backgroundError,
      justifyContent: "center",
      alignItems: "center",
      borderTopRightRadius: 10,
      borderBottomRightRadius: 10,
    },
    deleteIcon: {
      width: 24,
      height: 24,
      tintColor: colors.notification,
      resizeMode: "contain",
      paddingVertical: "auto",
    },
    cardDetails: {
      flex: 1,
      justifyContent: "center",
    },
  });

export default CardList;
