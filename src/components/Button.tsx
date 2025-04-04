import { Dimensions, StyleSheet, Text, TouchableOpacity } from "react-native";
import React from "react";
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
  return (
    <TouchableOpacity
      // checks if button needs to be disabled if no then checks for button to be outlined and applies styling conditionally
      style={[
        styles.button,
        disabled
          ? {
              backgroundColor: colors.textDisabled,
              borderColor: colors.textDisabled,
            }
          : outlined
          ? {
              backgroundColor: "rgba(0, 0, 0, 0)",
              borderColor: colors.borderAccent,
              borderWidth: 2,
            }
          : {
              backgroundColor: colors.primary,
              borderColor: colors.primary,
            },
        buttonStyles,
      ]}
      onPress={disabled ? () => {} : handleButton}
    >
      {/* conditionally  gives color to button text */}
      <Text
        style={[
          styles.buttonText,
          {
            color: disabled
              ? colors.textTertiary
              : outlined
              ? colors.primary
              : "#fff",
          },
        ]}
      >
        {buttonText}
      </Text>
    </TouchableOpacity>
  );
};

export default Button;

const createStyles = (colors: any) =>
  StyleSheet.create({
    button: {
      margin: 10,
      width: width * 0.8,
      borderWidth: 2,
      borderColor: colors.primary,
      borderRadius: 30,
      paddingVertical: 15,
      alignItems: "center",
      alignSelf: "center",
    },
    buttonText: {
      fontSize: 18,
      fontWeight: 500,
    },
  });
