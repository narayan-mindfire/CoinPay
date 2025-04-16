import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { useTheme } from "@react-navigation/native";
import MoneyBox from "@/src/components/MoneyBox";

const Savings = () => {
  const { colors } = useTheme();
  const styles = createStyles(colors);
  return (
    <View style={styles.container}>
      <View style={styles.title}>
        <Text style={styles.titleLabel}>Savings</Text>
      </View>
      <View style={styles.data}>
        <MoneyBox
          color={"white"}
          title={"total spend"}
          icon={"creditCardMinus"}
          amount={"500"}
          bgColor={"blue"}
        />
        <MoneyBox
          color={"black"}
          title={"available balance"}
          icon={"sendMoney"}
          amount={"20,000"}
          bgColor={"yellow"}
        />
      </View>
    </View>
  );
};

export default Savings;

const createStyles = (colors: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      //   justifyContent: "center",
      //   alignItems: "center",
      backgroundColor: colors.background,
    },
    data: {
      paddingHorizontal: 25,
      flexDirection: "row",
      justifyContent: "space-between",
    },
    title: {
      justifyContent: "center",
      alignItems: "center",
      marginVertical: 40,
    },
    titleLabel: {
      fontSize: 28,
      fontWeight: 600,
      color: colors.textPrimary,
    },
    text: {
      color: colors.text,
    },
  });
