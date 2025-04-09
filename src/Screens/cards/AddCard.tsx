import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import Button from "@/src/components/Button";
import { AddCardScreenProps } from "@/src/navigation/NavigationTypes";
import { useTheme } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import images from "@/src/Assets/images";

// AddCard page indicating completion of registration process
const AddCard = ({ navigation }: AddCardScreenProps) => {
  const { colors, dark } = useTheme();
  const styles = createStyles(colors);
  const { t } = useTranslation();
  return (
    <View style={styles.container}>
      <Image
        source={dark ? images.addCardDark : images.addCard}
        style={styles.image}
      />
      <Text style={styles.title}>{t("addCard.title")}</Text>
      <Text style={styles.subtitle}>{t("addCard.subtitle")}</Text>
      <Button
        buttonText={t("addCard.button")}
        handleButton={() => {
          navigation.push("CardForm");
        }}
        outlined={false}
        buttonStyles={{ marginTop: 100 }}
      />
    </View>
  );
};

export default AddCard;

// handled styles to dynamically take color values from theme to remove the need to write inline style

const createStyles = (colors: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: colors.background,
    },
    image: {
      width: "100%",
      height: 300,
      resizeMode: "contain",
      marginTop: -100,
      marginBottom: 50,
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
      marginBottom: 50,
      paddingHorizontal: 10,
    },
  });
