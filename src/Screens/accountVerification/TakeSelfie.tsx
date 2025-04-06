import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { TakeSelfieScreenProps } from "@/src/navigation/NavigationTypes";
import { useTheme } from "@react-navigation/native";
import icons from "@/src/Assets/icons";
import images from "@/src/Assets/images";

// Account Setup finishing page showing signup and login options
const FinishSetup = ({ navigation }: TakeSelfieScreenProps) => {
  const { colors, dark } = useTheme();
  const styles = createStyles(colors);
  return (
    <View style={styles.container}>
      <Image
        source={dark ? images.selfieImageDark : images.selfieImage}
        style={styles.image}
      />
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Take selfie to verify your identity</Text>
      </View>
      <View style={styles.subtitleContainer}>
        <Text style={styles.subtitle}>
          Quick and easy identification verification using your phone's camera.
          Confirm your identity with a self-captured photo.
        </Text>
      </View>
      <TouchableOpacity
        style={styles.scanButtonContainer}
        onPress={() => navigation.push("FinishSetup")}
      >
        <View style={styles.scanButton}>
          <Image source={icons.camera} tintColor={"#fff"} />
        </View>
        <Text style={styles.scanStyle}>Take Selfie</Text>
      </TouchableOpacity>
    </View>
  );
};

export default FinishSetup;

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
      // height: 150,
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
  });
