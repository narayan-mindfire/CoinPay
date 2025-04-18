import React from "react";

import { Image, ScrollView, StyleSheet, Text, View } from "react-native";

import MoneyBox from "@/src/components/MoneyBox";
import BarChart from "@/src/components/BarChart";
import TransactionItem from "@/src/components/TransactionItem";
import icons from "@/src/Assets/icons";

import { useTheme } from "@react-navigation/native";

const spendingData = [
  {
    logo: "electricity",
    title: "Electricity Bill",
    dateTime: "1st Jan at 7:20pm",
    amount: "$20.00",
  },
  {
    logo: "phone",
    title: "Telephone bill",
    dateTime: "3rd Jan at 5:00pm",
    amount: "$10.00",
  },
  {
    logo: "tuition",
    title: "Tuition Fee",
    dateTime: "3rd Feb at 4:00pm",
    amount: "$300.00",
  },
  {
    logo: "invoice",
    title: "anonymous bill",
    dateTime: "1st Dec at 4:00am",
    amount: "$21.99",
  },
];

const Bills = () => {
  const { colors } = useTheme();
  const styles = createStyles(colors);
  return (
    <View style={styles.container}>
      <View style={styles.title}>
        <Image source={icons.angleLeft} style={styles.goBackIcon} />
        <Text style={styles.titleLabel}>Bills</Text>
      </View>
      <View style={styles.data}>
        <MoneyBox
          color={"white"}
          title={"total bills"}
          icon={"creditCardMinus"}
          amount={"500"}
          bgColor={"error"}
        />
        <MoneyBox
          color={"black"}
          title={"available balance"}
          icon={"sendMoney"}
          amount={"20,000"}
          bgColor={"secondary"}
        />
      </View>
      <BarChart data={[220, 120, 300, 400, 210]} screen="bills" />
      <View style={styles.heading}>
        <Text style={styles.listTitle}>Bills list</Text>
        <Image source={icons.filter} style={styles.filterIcon} />
      </View>
      <ScrollView style={styles.dataListContainer}>
        {spendingData.map((item, index) => (
          <TransactionItem
            key={index}
            logo={item.logo}
            name={item.title}
            time={item.dateTime}
            amount={item.amount}
            direction={false} // false represents outgoing
            giveTint={true}
          />
        ))}
      </ScrollView>
    </View>
  );
};

export default Bills;

const createStyles = (colors: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
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
      fontWeight: 500,
      color: colors.textPrimary,
    },
    text: {
      color: colors.text,
    },
    dataListContainer: {
      paddingHorizontal: "6%",
    },
    heading: {
      paddingHorizontal: "6%",
      marginTop: 150,
      flexDirection: "row",
      justifyContent: "space-between",
      marginVertical: 20,
    },
    filterIcon: {
      width: 24,
      height: 24,
      tintColor: colors.textPrimary,
    },
    listTitle: {
      fontSize: 24,
      fontWeight: 500,
      color: colors.textPrimary,
    },
    goBackIcon: {
      tintColor: colors.textPrimary,
      width: 24,
      height: 24,
      position: "absolute",
      left: 20,
    },
  });
