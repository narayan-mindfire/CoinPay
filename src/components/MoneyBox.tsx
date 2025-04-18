import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import icons from "../Assets/icons";
import { useTheme } from "@react-navigation/native";

interface MoneyBoxProps {
  color: string;
  title: string;
  icon: keyof typeof icons;
  amount: string;
  bgColor: string;
}

const MoneyBox = ({ color, title, icon, amount, bgColor }: MoneyBoxProps) => {
  const { colors } = useTheme();
  const styles = createStyles(colors[bgColor], color);

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Image source={icons[icon]} style={styles.icon} resizeMode="contain" />
        <Text style={styles.title}>{title}</Text>
      </View>
      <Text style={styles.amount}>${amount}.00</Text>
    </View>
  );
};

export default MoneyBox;

const createStyles = (backgroundColor: string, color: string) =>
  StyleSheet.create({
    container: {
      backgroundColor,
      borderRadius: 12,
      paddingHorizontal: 26,
      paddingVertical: 16,
      justifyContent: "center",
      width: 165,
    },
    row: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 0,
    },
    icon: {
      width: 18,
      height: 18,
      tintColor: color,
    },
    title: {
      color,
      fontSize: 14,
      marginLeft: 6,
      fontWeight: "400",
    },
    amount: {
      color,
      fontSize: 26,
      fontWeight: "bold",
    },
  });
