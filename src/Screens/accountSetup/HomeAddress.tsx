import React, { useEffect, useState } from "react";

import { View, Text, StyleSheet, TextInput, Keyboard } from "react-native";

import { HomeAddressScreenProps } from "@/src/navigation/NavigationTypes";
import Button from "@/src/components/Button";
import {
  validateAddress,
  validateCity,
  validatePostCode,
} from "@/src/utils/formFieldValidators";
import { useAppDispatch } from "@/src/redux/store";
import { updateUserForm } from "@/src/redux/slices/userFormSlice";

import { useTheme } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
/**
 * HomeAddress Screen Component
 * Allows users to add their address to account setup
 */

const HomeAddress = ({ navigation }: HomeAddressScreenProps) => {
  const { colors } = useTheme();
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [postCode, setPostCode] = useState("");
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  const cityError = validateCity(city);
  const addressError = validateAddress(address);
  const postCodeError = validatePostCode(postCode);

  const styles = createStyles(colors, addressError, cityError, postCodeError);
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

  const addData = () => {
    dispatch(
      updateUserForm({
        addressLine: address,
        city,
        postCode,
      })
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t("homeAddress.title")}</Text>
      <Text style={styles.subtitle}>{t("homeAddress.subtitle")}</Text>
      {/* Address Input */}
      <Text style={styles.label}>{t("homeAddress.addressLabel")}</Text>
      <View style={[styles.addressContainer]}>
        <View style={styles.inputWrapper}>
          {!address && (
            <Text style={styles.placeholderText}>
              {t("homeAddress.addressPlaceholder")}
            </Text>
          )}
          <TextInput
            style={styles.addressInput}
            placeholder=""
            value={address}
            onChangeText={(text) => {
              setAddress(text);
              validateAddress(text);
            }}
          />
        </View>
      </View>
      {addressError ? (
        <Text style={styles.addressError}>{addressError}</Text>
      ) : null}
      {/* city input  */}
      <Text style={styles.label}>{t("homeAddress.cityLabel")}</Text>
      <View style={styles.cityContainer}>
        <View style={styles.inputWrapper}>
          {!city && (
            <Text style={styles.placeholderText}>
              {t("homeAddress.cityPlaceholder")}
            </Text>
          )}
          <TextInput
            style={styles.addressInput}
            placeholder=""
            value={city}
            onChangeText={(text) => {
              setCity(text);
              validateCity(text);
            }}
          />
        </View>
      </View>
      {cityError ? <Text style={styles.cityError}>{cityError}</Text> : null}
      {/* postcode input  */}
      <Text style={styles.label}>{t("homeAddress.postCodeLabel")}</Text>
      <View style={styles.postCodeContainer}>
        <View style={styles.inputWrapper}>
          {!postCode && (
            <Text style={styles.placeholderText}>
              {t("homeAddress.postCodePlaceholder")}
            </Text>
          )}
          <TextInput
            style={styles.addressInput}
            placeholder=""
            value={postCode}
            onChangeText={(text) => {
              validatePostCode(text);
              setPostCode(text);
            }}
          />
        </View>
      </View>
      {postCodeError ? (
        <Text style={styles.postCodeError}>{postCodeError}</Text>
      ) : null}

      {/* button set to disabled when either password or phone number not given, button height adjusted based on keyboardvisibility */}
      <Button
        buttonText={t("homeAddress.continue")}
        handleButton={() => {
          navigation.navigate("PersonalInfo");
          addData();
        }}
        outlined={false}
        disabled={
          addressError !== "" || cityError !== "" || postCodeError !== ""
        }
        buttonStyles={{ marginTop: isKeyboardVisible ? 20 : 300 }}
      />
    </View>
  );
};

// handled styles to dynamically take color values from theme to remove the need to write inline style
const createStyles = (
  colors: any,
  addressError: string,
  cityError: string,
  postCodeError: string
) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
      paddingHorizontal: 14,
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
    cityContainer: {
      flexDirection: "row",
      alignItems: "center",
      borderWidth: 2,
      borderRadius: 8,
      paddingHorizontal: 10,
      height: 50,
      borderColor: cityError ? colors.error : colors.primary,
    },
    postCodeContainer: {
      flexDirection: "row",
      alignItems: "center",
      borderWidth: 2,
      borderRadius: 8,
      paddingHorizontal: 10,
      height: 50,
      borderColor: postCodeError ? colors.error : colors.primary,
    },
    addressContainer: {
      flexDirection: "row",
      alignItems: "center",
      borderWidth: 2,
      borderRadius: 8,
      paddingHorizontal: 10,
      height: 50,
      borderColor: addressError ? colors.error : colors.primary,
    },
    inputWrapper: {
      flex: 1,
      position: "relative",
    },
    placeholderText: {
      position: "absolute",
      top: "20%",
      transform: [{ translateY: -8 }],
      fontSize: 18,
      color: colors.textDisabled,
    },
    addressInput: {
      fontSize: 18,
      color: colors.textTertiary,
      width: "100%",
    },
    addressError: {
      color: colors.error,
      fontSize: 12,
    },
    cityError: {
      color: colors.error,
      fontSize: 12,
    },
    postCodeError: {
      color: colors.error,
      fontSize: 12,
    },
  });

export default HomeAddress;
