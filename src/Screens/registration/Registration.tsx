import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import Button from "@/src/components/Button";
import { RegistrationScreenProps } from "@/src/navigation/NavigationTypes";
import { useTheme } from "@react-navigation/native";
import registrationImages from "@/src/Assets/registration";
import AnimatedProgressBar from "@/src/components/progressBar";
import icons from "@/src/Assets/icons";

// registration page showing signup and login options
const Registration = ({ navigation }: RegistrationScreenProps) => {
  const { colors, dark } = useTheme();
  const registrationDark = registrationImages.registrationDark;
  const registration = registrationImages.registration;
  const styles = createStyles(colors);
  return (
    <View style={styles.container}>
      <View style={styles.progressContainer}>
        <AnimatedProgressBar progress={0.15} />
      </View>
      <TouchableOpacity
        onPress={() => navigation.navigate("OnBoarding")}
        style={[styles.backButton]}
      >
        <Image source={icons.angleLeft} tintColor={colors.textPrimary} />
      </TouchableOpacity>
      <Image
        source={dark ? registrationDark : registration}
        style={styles.image}
      />
      <Text style={styles.title}>Create your{"\n"}Coinpay account</Text>
      <Text style={styles.subtitle}>
        Coinpay is a powerful tool that allows you to easily send, receive, and
        track all your transactions.
      </Text>
      <Button
        buttonText="Sign up"
        handleButton={() => {
          navigation.push("PhoneVerification");
        }}
        outlined={false}
      />
      <Button buttonText="Log in" handleButton={() => {}} outlined={true} />

      <Text style={styles.footerText}>
        By continuing you accept our{" "}
        <Text style={styles.linkText}>Terms of Service</Text> and{" "}
        <Text style={styles.linkText}>Privacy Policy</Text>
      </Text>
    </View>
  );
};

export default Registration;

// handled styles to dynamically take color values from theme to remove the need to write inline style

const createStyles = (colors: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: colors.background,
    },
    progressContainer: {
      width: "100%",
      alignItems: "center",
      // marginTop: 5,
    },
    backButton: {
      position: "absolute",
      left: 5,
      top: 40,
    },
    image: {
      width: "100%",
      // height: 150,
      resizeMode: "contain",
      marginBottom: 20,
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
    footerText: {
      fontSize: 18,
      color: "#6B6B6B",
      textAlign: "center",
      marginTop: 30,
      paddingHorizontal: 30,
    },
    linkText: {
      color: "rgba(48, 79, 254, 1)",
      textDecorationLine: "underline",
    },
  });
