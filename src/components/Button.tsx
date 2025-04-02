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
  return (
    <TouchableOpacity
      style={[
        styles.button,
        disabled
          ? { backgroundColor: colors.border }
          : outlined
          ? {
              backgroundColor: "#fff",
              borderWidth: 2,
              borderColor: colors.primary,
            }
          : { backgroundColor: colors.primary },
        buttonStyles,
      ]}
      onPress={handleButton}
    >
      <Text
        style={[
          styles.buttonText,
          {
            color: disabled
              ? "rgba(65, 65, 65, 1))"
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

const styles = StyleSheet.create({
  button: {
    margin: 10,
    width: width * 0.8,
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
