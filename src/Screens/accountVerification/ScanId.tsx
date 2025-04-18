import React from "react";

import { View, Text, Image, StyleSheet } from "react-native";

import images from "@/src/Assets/images";

import { useTheme } from "@react-navigation/native";
import { useTranslation } from "react-i18next";

import { ScanIdScreenProps } from "@/src/navigation/NavigationTypes";
import CamButton from "@/src/components/CamButton";

// ScanId page that lets you scan a document/identity proof
const ScanId = ({ navigation }: ScanIdScreenProps) => {
  const { t } = useTranslation();
  const { colors, dark } = useTheme();

  const styles = createStyles(colors);

  return (
    <View style={styles.container}>
      <Image
        source={dark ? images.scanIdDark : images.scanId}
        style={styles.image}
      />
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{t("scanId.title")}</Text>
      </View>
      <View style={styles.subtitleContainer}>
        <Text style={styles.subtitle}>{t("scanId.subtitle")}</Text>
      </View>
      <CamButton
        navigation={navigation}
        to="ScanDoc"
        icon="scanQr"
        text="Scan"
      />
    </View>
  );
};

export default ScanId;

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
      marginTop: -70,
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
      marginBottom: 30,
      paddingHorizontal: 10,
    },
  });
