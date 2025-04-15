import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import Button from "@/src/components/Button";
import { WelcomeScreenProps } from "@/src/navigation/NavigationTypes";
import { useTheme } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import images from "@/src/Assets/images";

// Welcome page indicating completion of registration process
const Welcome = ({ navigation }: WelcomeScreenProps) => {
  const { colors, dark } = useTheme();
  const styles = createStyles(colors);
  const { t } = useTranslation();
  return (
    <View style={styles.container}>
      <Image
        source={dark ? images.welcomeDark : images.welcome}
        style={styles.image}
      />
      <Text style={styles.title}>{t("welcome.title")}</Text>
      <Text style={styles.subtitle}>{t("welcome.subtitle")}</Text>
      <Button
        buttonText={t("welcome.continue")}
        handleButton={() => {
          navigation.push("Login");
        }}
        outlined={false}
      />
    </View>
  );
};

export default Welcome;

// handled styles to dynamically take color values from theme to remove the need to write inline style

const createStyles = (colors: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: colors.background,
      paddingHorizontal: 5,
    },
    image: {
      width: "100%",
      resizeMode: "contain",
      marginTop: -100,
      marginBottom: 100,
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
