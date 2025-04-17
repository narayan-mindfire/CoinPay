import React from "react";

import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";

import icons from "@/src/Assets/icons";
import images from "@/src/Assets/images";

import { useTheme } from "@react-navigation/native";
import { useTranslation } from "react-i18next";

import { ScanIdScreenProps } from "@/src/navigation/NavigationTypes";

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
      <TouchableOpacity
        style={styles.scanButtonContainer}
        onPress={() => {
          navigation.navigate("ScanDoc");
        }}
      >
        <View style={styles.scanButton}>
          <Image source={icons.scanQr} tintColor="#fff" />
        </View>
        <Text style={styles.scanStyle}>{t("scanId.scanButton")}</Text>
      </TouchableOpacity>
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
    scanButtonContainer: {
      justifyContent: "center",
      alignItems: "center",
      marginTop: 40,
    },
    scanButton: {
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: colors.primary,
      borderRadius: 25,
      height: 50,
      width: 50,
    },
    scanStyle: {
      marginTop: 10,
      color: colors.textPrimary,
      fontSize: 18,
      textAlign: "center",
    },
  });
