import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from "react-native";
import Button from "@/src/components/Button";
import { PhoneVerificationScreenProps } from "@/src/navigation/NavigationTypes";
import { useTheme } from "@react-navigation/native";

const Registration = ({ navigation }: PhoneVerificationScreenProps) => {
  const { colors } = useTheme();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => navigation.navigate("Registration")}
        style={styles.backButton}
      >
        <Image source={require("../../Assets/icons/angle-left.png")} />
      </TouchableOpacity>
      <View style={[styles.progressBar, { backgroundColor: colors.primary }]} />
      <View style={{ paddingHorizontal: 14 }}>
        <Text style={styles.title}>Create an Account</Text>
        <Text style={styles.subtitle}>
          Enter your mobile number to verify your account
        </Text>

        {/* Phone Input */}
        <Text style={styles.label}>Phone</Text>
        <View style={styles.phoneContainer}>
          <View style={styles.countryCode}>
            <Image
              source={require("../../Assets/icons/Country=IN.png")}
              style={styles.flag}
            />
            <Text style={styles.countryText}>+91</Text>
          </View>
          <TextInput
            style={styles.phoneInput}
            placeholder="Mobile number"
            placeholderTextColor="#B0B0B0"
            keyboardType="phone-pad"
            value={phone}
            onChangeText={setPhone}
          />
        </View>

        <Text style={styles.label}>Password</Text>
        <View style={styles.passwordContainer}>
          <Image
            source={require("../../Assets/icons/lock.png")}
            style={styles.lockIcon}
          />
          <TextInput
            style={styles.passwordInput}
            placeholder="**********"
            placeholderTextColor="#B0B0B0"
            secureTextEntry={!passwordVisible}
            value={password}
            onChangeText={setPassword}
          />
          <TouchableOpacity
            onPress={() => setPasswordVisible(!passwordVisible)}
          >
            <Image
              source={require("../../Assets/icons/eye.png")}
              style={styles.eyeIcon}
            />
          </TouchableOpacity>
        </View>
        <Button
          buttonText="Sign up"
          handleButton={() => {}}
          outlined={false}
          disabled={true}
        />
      </View>
    </View>
  );
};

export default Registration;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: "center",
    // justifyContent: "center",
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
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#000",
    marginTop: 80,
  },
  subtitle: {
    fontSize: 14,
    color: "#6B6B6B",
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 5,
  },
  phoneContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 12,
    marginBottom: 15,
  },
  countryCode: {
    flexDirection: "row",
    alignItems: "center",
    paddingRight: 10,
    borderRightWidth: 1,
    borderRightColor: "#E0E0E0",
  },
  flag: {
    width: 20,
    height: 15,
    marginRight: 5,
  },
  countryText: {
    fontSize: 14,
    color: "#000",
  },
  phoneInput: {
    flex: 1,
    fontSize: 14,
    color: "#000",
    paddingLeft: 10,
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 12,
  },
  lockIcon: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  passwordInput: {
    flex: 1,
    fontSize: 14,
    color: "#000",
  },
  eyeIcon: {
    width: 20,
    height: 20,
  },
});
