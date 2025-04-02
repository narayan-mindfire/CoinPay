import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import Button from "@/src/components/Button";
import { RegistrationScreenProps } from "@/src/navigation/NavigationTypes";
import { useTheme } from "@react-navigation/native";

const Registration = ({ navigation }: RegistrationScreenProps) => {
  const { colors } = useTheme();
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => navigation.navigate("OnBoarding")}
        style={styles.backButton}
      >
        <Image source={require("../../Assets/icons/angle-left.png")} />
      </TouchableOpacity>
      <View style={[styles.progressBar, { backgroundColor: colors.primary }]} />
      <Image
        source={require("../../Assets/registration/registration.png")}
        style={styles.image}
      />

      <Text style={styles.title}>
        Create your{"\n"} <Text style={styles.bold}>Coinpay account</Text>
      </Text>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
  },
  backButton: {
    position: "absolute",
    left: 5,
    top: 30,
  },
  progressBar: {
    position: "absolute",
    left: 0,
    top: 60,
    height: 5,
    width: 35,
    borderRadius: 2,
  },
  image: {
    width: 220,
    height: 150,
    resizeMode: "contain",
    marginBottom: 20,
  },
  title: {
    fontSize: 26,
    textAlign: "center",
    color: "#000",
    marginBottom: 10,
  },
  bold: {
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 14,
    color: "#6B6B6B",
    textAlign: "center",
    marginBottom: 30,
    paddingHorizontal: 30,
  },

  footerText: {
    fontSize: 12,
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
