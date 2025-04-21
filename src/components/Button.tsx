import React from "react";

import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  ViewStyle,
  TextStyle,
} from "react-native";

import { useTheme } from "@react-navigation/native";

const { width } = Dimensions.get("window");

interface ButtonProps {
  buttonText: string;
  handleButton: () => any;
  outlined?: boolean;
  disabled?: boolean;
  buttonStyles?: object;
}

const Button = ({
  buttonText,
  handleButton,
  outlined,
  disabled,
  buttonStyles = {},
}: ButtonProps) => {
  const { colors } = useTheme();
  const styles = createStyles(colors);

  const buttonStateStyle = disabled
    ? styles.buttonDisabled
    : outlined
    ? styles.buttonOutlined
    : styles.buttonFilled;

  const textStateStyle = disabled
    ? styles.textDisabled
    : outlined
    ? styles.textOutlined
    : styles.textFilled;

  return (
    <TouchableOpacity
      style={[styles.buttonBase, buttonStateStyle, buttonStyles as ViewStyle]}
      onPress={disabled ? () => {} : handleButton}
    >
      <Text style={[styles.buttonText, textStateStyle]}>{buttonText}</Text>
    </TouchableOpacity>
  );
};

export default Button;

const createStyles = (colors: any) =>
  StyleSheet.create({
    buttonBase: {
      margin: 10,
      width: width * 0.8,
      borderWidth: 2,
      borderRadius: 30,
      paddingVertical: 15,
      alignItems: "center",
      alignSelf: "center",
    },
    buttonFilled: {
      backgroundColor: colors.primary,
      borderColor: colors.primary,
    },
    buttonOutlined: {
      backgroundColor: "transparent",
      borderColor: colors.borderAccent,
    },
    buttonDisabled: {
      backgroundColor: colors.textDisabled,
      borderColor: colors.textDisabled,
    },
    buttonText: {
      fontSize: 18,
      fontWeight: "500" as TextStyle["fontWeight"],
    },
    textFilled: {
      color: "#fff",
    },
    textOutlined: {
      color: colors.primary,
    },
    textDisabled: {
      color: colors.textTertiary,
    },
  });
