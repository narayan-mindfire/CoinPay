import React from "react";

import { View, Text, Image, StyleSheet } from "react-native";

import images from "@/src/Assets/images";

import { useTranslation } from "react-i18next";
import { useTheme } from "@react-navigation/native";

import { TakeSelfieScreenProps } from "@/src/navigation/NavigationTypes";
import CamButton from "@/src/components/CamButton";

// take selfie screen that lets the user take selfie as verification and user profile image
const TakeSelfie = ({ navigation }: TakeSelfieScreenProps) => {
  const { t } = useTranslation();
  const { colors, dark } = useTheme();

  const styles = createStyles(colors);
  return (
    <View style={styles.container}>
      <Image
        source={dark ? images.selfieImageDark : images.selfieImage}
        style={styles.image}
      />
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{t("takeSelfie.title")}</Text>
      </View>
      <View style={styles.subtitleContainer}>
        <Text style={styles.subtitle}>{t("takeSelfie.subtitle")}</Text>
      </View>
      <CamButton
        navigation={navigation}
        to="SelfieCam"
        icon="camera"
        text={t("takeSelfie.button")}
      />
    </View>
  );
};

export default TakeSelfie;

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
      resizeMode: "contain",
      marginBottom: 20,
      marginTop: -50,
    },
    titleContainer: {
      width: "80%",
    },
    subtitleContainer: {
      width: "90%",
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
      marginBottom: 20,
      paddingHorizontal: 10,
    },
  });
