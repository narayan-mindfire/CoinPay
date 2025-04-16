import { View, Text, Image, StyleSheet } from "react-native";
import React from "react";
import icons from "../Assets/icons";
import { useTheme } from "@react-navigation/native";

type SpendingItemProps = {
  logo: string;
  name: string;
  time: string;
  amount: string;
};

const TransactionItem = ({ logo, name, time, amount }: SpendingItemProps) => {
  const { colors } = useTheme();
  const styles = createStyles(colors);
  return (
    <View style={styles.itemContainer}>
      <View style={styles.leftSection}>
        <Image source={icons[logo]} style={styles.logo} />
        <View>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.time}>{time}</Text>
        </View>
      </View>
      <Text style={styles.amount}>-{amount}</Text>
    </View>
  );
};

export default TransactionItem;

const createStyles = (colors: any) =>
  StyleSheet.create({
    itemContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",

      padding: 16,
      borderRadius: 12,
      borderBottomColor: colors.border,
      borderBottomWidth: 1,
      marginBottom: 12,
    },
    leftSection: {
      flexDirection: "row",
      alignItems: "center",
      gap: 12,
    },
    logo: {
      width: 40,
      height: 40,
      borderRadius: 20,
    },
    name: {
      color: colors.textPrimary,
      fontSize: 16,
      fontWeight: "600",
    },
    time: {
      color: colors.textTertiary,
      fontSize: 12,
    },
    amount: {
      color: colors.warning,
      fontWeight: "600",
      fontSize: 16,
    },
  });
