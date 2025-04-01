import { Dimensions, StyleSheet, Text, TouchableOpacity } from "react-native";
import React from "react";
import { useTheme } from "@react-navigation/native";

const { width } = Dimensions.get("window");

interface ButtonProps {
  buttonText: String;
  handleButton: () => any;
}
const Button = ({ buttonText, handleButton }: ButtonProps) => {
  const { colors } = useTheme();
  return (
    <TouchableOpacity
      style={[styles.button, { backgroundColor: colors.primary }]}
      onPress={handleButton}
    >
      <Text style={[styles.buttonText]}>{buttonText}</Text>
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  button: {
    position: "absolute",
    bottom: 30,
    width: width * 0.8,
    borderRadius: 30,
    paddingVertical: 15,
    alignItems: "center",
    alignSelf: "center",
  },
  buttonText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: 500,
  },
});
