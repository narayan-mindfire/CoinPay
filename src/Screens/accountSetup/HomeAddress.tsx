import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TextInput,
  Keyboard,
} from "react-native";
import Button from "@/src/components/Button";
import {
  AddEmailProps,
  HomeAddressScreenProps,
} from "@/src/navigation/NavigationTypes";
import { useTheme } from "@react-navigation/native";
import icons from "@/src/Assets/icons";

/**
 * HomeAddress Screen Component
 * Allows users to add their name to account setup
 */

const HomeAddress = ({ navigation }: HomeAddressScreenProps) => {
  const { colors } = useTheme();
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [postCode, setPostCode] = useState("");
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  /**
   * Effect to listen for keyboard visibility changes.
   */
  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        setKeyboardVisible(true);
      }
    );

    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setKeyboardVisible(false);
      }
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  const styles = createStyles(colors);
  return (
    <View style={styles.container}>
      <View style={{ paddingHorizontal: 14 }}>
        <Text style={styles.title}>Home address</Text>
        <Text style={styles.subtitle}>
          this info needs to be accurate with your ID document
        </Text>
        {/* Address Input */}
        <Text style={styles.label}>Address Line</Text>
        <View style={styles.emailContainer}>
          <View style={styles.inputWrapper}>
            {!name && <Text style={styles.placeholderText}>Mr. Jhon Doe</Text>}
            <TextInput
              style={styles.emailInput}
              placeholder=""
              value={name}
              onChangeText={setName}
            />
          </View>
        </View>
        {/* city input  */}
        <Text style={styles.label}>City</Text>
        <View style={styles.emailContainer}>
          <View style={styles.inputWrapper}>
            {!city && <Text style={styles.placeholderText}>City, State</Text>}
            <TextInput
              style={styles.emailInput}
              placeholder=""
              value={city}
              onChangeText={setCity}
            />
          </View>
        </View>
        {/* postcode input  */}
        <Text style={styles.label}>Postcode</Text>
        <View style={styles.emailContainer}>
          <View style={styles.inputWrapper}>
            {!postCode && <Text style={styles.placeholderText}>Ex: 00000</Text>}
            <TextInput
              style={styles.emailInput}
              placeholder=""
              value={postCode}
              onChangeText={setPostCode}
            />
          </View>
        </View>

        {/* button set to disabled when either password or phone number not given, button height adjusted based on keyboardvisibility */}
        <Button
          buttonText="Continue"
          handleButton={() => {
            navigation.navigate("PersonalInfo");
          }}
          outlined={false}
          disabled={name === "" || city === "" || postCode === ""}
          buttonStyles={{ marginTop: isKeyboardVisible ? 20 : 220 }}
        />
      </View>
    </View>
  );
};

// handled styles to dynamically take color values from theme to remove the need to write inline style
const createStyles = (colors: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },

    title: {
      fontSize: 22,
      fontWeight: "bold",
      color: colors.textPrimary,
      marginTop: 30,
    },
    subtitle: {
      fontSize: 18,
      fontWeight: 400,
      color: colors.textTertiary,
      marginBottom: 20,
    },
    label: {
      fontSize: 16,
      fontWeight: "bold",
      color: colors.textPrimary,
      marginVertical: 7,
    },
    emailContainer: {
      flexDirection: "row",
      alignItems: "center",
      borderWidth: 2,
      borderColor: colors.border,
      borderRadius: 8,
      paddingHorizontal: 10,
      height: 50,
    },

    inputWrapper: {
      flex: 1,
      position: "relative",
    },

    placeholderText: {
      position: "absolute",
      left: 5,
      top: "40%",
      transform: [{ translateY: -8 }],
      fontSize: 18,
      color: colors.textDisabled,
    },

    emailInput: {
      fontSize: 18,
      color: colors.textTertiary,
      width: "100%",
    },

    modalContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    modalContent: {
      width: "80%",
      backgroundColor: colors.background,
      borderRadius: 10,
      borderWidth: 3,
      borderColor: colors.border,
      padding: 20,
      maxHeight: 400,
    },
    modalItem: {
      flexDirection: "row",
      alignItems: "center",
      paddingVertical: 10,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    modalFlag: {
      width: 24,
      height: 16,
      marginRight: 10,
    },
    modalText: {
      fontSize: 16,
      color: colors.textPrimary,
    },
    progressContainer: {
      width: "100%",
      alignItems: "center",
      top: 50,
      marginBottom: 30,
    },
  });

export default HomeAddress;
