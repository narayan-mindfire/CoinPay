import React, { useState } from "react";

import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

import Button from "@/src/components/Button";

import { useAppDispatch } from "@/src/redux/store";
import { updateUserForm } from "@/src/redux/slices/userFormSlice";

import { useTheme } from "@react-navigation/native";
import { useTranslation } from "react-i18next";

import { SetupPinScreenProps } from "@/src/navigation/NavigationTypes";
/**
 * SetupPin Screen Component
 * Allows users to add their email to account setup
 */

const SetupPin = ({ navigation }: SetupPinScreenProps) => {
  const dispatch = useAppDispatch();
  const { colors } = useTheme();
  const { t } = useTranslation();

  const [pin, setPin] = useState("");

  const styles = createStyles(colors);

  const addData = () => {
    dispatch(
      updateUserForm({
        passcode: pin,
      })
    );
  };
  return (
    <View style={styles.container}>
      <View style={{ paddingHorizontal: 14 }}>
        <Text style={styles.title}>{t("setupPin.title")}</Text>
        <Text style={styles.subtitle}>{t("setupPin.subtitle")}</Text>
      </View>
      <View style={styles.passcodeContainer}>
        {[0, 1, 2, 3].map((index) => (
          <View
            key={index}
            style={pin.length > index ? styles.filledDot : styles.emptyDot}
          />
        ))}
      </View>
      <View style={styles.keyboardContainer}>
        {[
          { num: "1" },
          { num: "2" },
          { num: "3" },
          { num: "4" },
          { num: "5" },
          { num: "6" },
          { num: "7" },
          { num: "8" },
          { num: "9" },
          { num: "" },
          { num: "0" },
          { num: "back" },
        ].map((key, index) => {
          if (key.num === "") {
            return <View key={index} style={styles.keyButton}></View>;
          }
          return (
            <TouchableOpacity
              key={index}
              style={styles.keyButton}
              onPress={() => {
                if (key.num === "back") {
                  setPin((prev) => prev.slice(0, -1));
                } else {
                  if (pin.length < 4) setPin((prev) => prev + key.num);
                }
              }}
            >
              {key.num === "back" ? (
                <Text
                  onPress={() => setPin((prev) => prev.slice(0, -1))}
                  style={styles.keyText}
                >
                  ⌫
                </Text>
              ) : (
                <Text
                  onPress={() => {
                    if (pin.length < 4) setPin((prev) => prev + key.num);
                  }}
                  style={styles.keyText}
                >
                  {key.num}
                </Text>
              )}
            </TouchableOpacity>
          );
        })}
      </View>
      <Button
        buttonText={t("setupPin.continue")}
        handleButton={() => {
          navigation.push("FinishSetup");
          addData();
        }}
        outlined={false}
        disabled={pin.length === 4 ? false : true}
      />
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
    passcodeContainer: {
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "row",
      marginTop: "20%",
      gap: 10,
    },
    filledDot: {
      width: 20,
      height: 20,
      borderRadius: 10,
      marginHorizontal: 8,
      backgroundColor: colors.textPrimary,
    },
    emptyDot: {
      width: 20,
      height: 20,
      borderRadius: 10,
      marginHorizontal: 8,
      backgroundColor: colors.textDisabled,
    },

    keyboardContainer: {
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: "center",
      marginTop: 220,
    },
    keyButton: {
      width: 125,
      backgroundColor: colors.background,
      height: 50,
      marginVertical: 8,
      marginHorizontal: 0,
      borderRadius: 12,
      justifyContent: "center",
      alignItems: "center",
      borderBottomWidth: 1,
      borderBottomLeftRadius: 15,
      borderBottomRightRadius: 15,
      borderBottomColor: colors.border,
    },
    keyText: {
      fontSize: 22,
      textAlign: "center",
      fontWeight: "600",
      lineHeight: 28,
      letterSpacing: 2,
      color: colors.textPrimary,
    },
    keyWrapper: {
      textAlign: "center",
      alignItems: "center",
      justifyContent: "center",
    },
    keyLetters: {
      fontSize: 10,
      color: "#555",
      textAlign: "center",
      lineHeight: 14,
      fontWeight: "100",
    },
    backspace: {
      fontSize: 24,
      color: "#000",
    },
  });

export default SetupPin;
