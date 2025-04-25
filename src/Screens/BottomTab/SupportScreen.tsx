import React from "react";

import { View, Text, Image, StyleSheet } from "react-native";

import Button from "@/src/components/Button";
import { WelcomeScreenProps } from "@/src/navigation/NavigationTypes";
import { useTheme } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import images from "@/src/Assets/images";
import icons from "@/src/Assets/icons";

// SupportScreen for application support
const SupportScreen = ({ navigation }: WelcomeScreenProps) => {
  const { colors, dark } = useTheme();
  const { t } = useTranslation();

  const styles = createStyles(colors);
  return (
    <View style={styles.container}>
      <Image
        source={dark ? images.supportDark : images.support}
        style={styles.image}
      />
      <Text style={styles.title}>{t("support.title")}</Text>
      <Text style={styles.subtitle}>{t("support.subtitle")}</Text>
      <Button
        buttonText={t("support.startChat")}
        icon={icons.chatFill}
        handleButton={() => console.log("Start Chat")}
        outlined={false}
      />
      <Button
        buttonText={t("support.viewFAQ")}
        icon={icons.question}
        handleButton={() => console.log("View FAQ")}
        outlined={true}
      />
    </View>
  );
};

export default SupportScreen;

// handled styles to dynamically take color values from theme to remove the need to write inline style

const createStyles = (colors: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      backgroundColor: colors.background,
      paddingHorizontal: 5,
    },
    image: {
      width: "90%",
      resizeMode: "contain",
      marginBottom: 30,
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
      marginBottom: 30,
      paddingHorizontal: 10,
    },
  });
