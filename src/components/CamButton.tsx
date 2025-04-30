import React from "react";

import { StyleSheet, Text, TouchableOpacity, View, Image } from "react-native";

import icons from "@/src/Assets/icons";

import { useTranslation } from "react-i18next";
import { useTheme } from "@react-navigation/native";

interface camButtonProps {
  navigation: any;
  to: string;
  icon: string;
  text: string;
}

// cam button is another rounded button used frequently in app
const CamButton = ({ navigation, to, icon, text }: camButtonProps) => {
  const { t } = useTranslation();
  const { colors } = useTheme();

  const styles = createStyles(colors);
  return (
    <TouchableOpacity
      style={styles.scanButtonContainer}
      onPress={() => navigation.push(to)}
    >
      <View style={styles.scanButton}>
        <Image source={icons[icon]} style={styles.camButton} />
      </View>
      <Text style={styles.scanStyle}>{text}</Text>
    </TouchableOpacity>
  );
};

export default CamButton;

const createStyles = (colors: any) =>
  StyleSheet.create({
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
      marginTop: 5,
      color: colors.textPrimary,
      fontSize: 18,
      textAlign: "center",
    },
    camButton: {
      tintColor: colors.white,
    },
  });
