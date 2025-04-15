import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Keyboard,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import Button from "@/src/components/Button";
import { CardListProps } from "@/src/navigation/NavigationTypes";
import { useTheme } from "@react-navigation/native";
import icons from "@/src/Assets/icons";
import { useTranslation } from "react-i18next";
import Message from "@/src/components/Message";

const CardList = ({ navigation }: CardListProps) => {
  const { colors } = useTheme();
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const { t } = useTranslation();

  const [cards, setCards] = useState([
    { id: "1", cardNumber: "**** **** **** 1234", cardType: "visa" },
    { id: "2", cardNumber: "**** **** **** 5678", cardType: "mastercard" },
    { id: "3", cardNumber: "**** **** **** 9012", cardType: "amex" },
  ]);

  const deleteCard = (id: string) => {
    setCards((prev) => prev.filter((card) => card.id !== id));
  };

  useEffect(() => {
    const showListener = Keyboard.addListener("keyboardDidShow", () =>
      setKeyboardVisible(true)
    );
    const hideListener = Keyboard.addListener("keyboardDidHide", () =>
      setKeyboardVisible(false)
    );
    return () => {
      showListener.remove();
      hideListener.remove();
    };
  }, []);

  const styles = createStyles(colors);

  return (
    <View style={styles.container}>
      <View style={{ justifyContent: "center", alignItems: "center" }}>
        <Message message={t("cardList.successMessage")} type="success" />
      </View>

      <View style={{ paddingHorizontal: 14, flex: 1 }}>
        <Text style={styles.title}>{t("cardList.title")}</Text>
        <Text style={styles.subtitle}>{t("cardList.subtitle")}</Text>

        <ScrollView style={styles.scrollContainer}>
          {cards.map((card) => (
            <View key={card.id} style={styles.cardItem}>
              <Image source={icons[card.cardType]} style={styles.cardIcon} />
              <Text style={styles.cardText}>{card.cardNumber}</Text>
              <TouchableOpacity
                onPress={() => deleteCard(card.id)}
                style={styles.trashButton}
              >
                <Image source={icons.trash} style={styles.deleteIcon} />
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>

        <Button
          buttonText={t("cardList.button")}
          handleButton={() => navigation.navigate("BottomTab")}
          outlined={false}
          disabled={false}
          buttonStyles={{
            marginTop: isKeyboardVisible ? 20 : 40,
            marginBottom: isKeyboardVisible ? 10 : 30,
          }}
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
    scrollContainer: {
      maxHeight: 600,
      marginBottom: 20,
    },
    cardItem: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      //   paddingVertical: 12,
      //   paddingHorizontal: 14,
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
      flex: 1,
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
  });

export default CardList;
