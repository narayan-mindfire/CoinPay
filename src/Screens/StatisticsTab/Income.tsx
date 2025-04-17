import React from "react";

import { Image, ScrollView, StyleSheet, Text, View } from "react-native";

import MoneyBox from "@/src/components/MoneyBox";
import BarChart from "@/src/components/BarChart";
import TransactionItem from "@/src/components/TransactionItem";
import icons from "@/src/Assets/icons";

import { useTheme } from "@react-navigation/native";

const spendingData = [
  {
    logo: "sack",
    title: "Salary",
    dateTime: "1st Jan at 7:20pm",
    amount: "$4000.00",
  },
  {
    logo: "sack",
    title: "Freelance Work",
    dateTime: "3rd Jan at 5:00pm",
    amount: "$9.99",
  },
  {
    logo: "sack",
    title: "Investment",
    dateTime: "9th Sept at 3:00pm",
    amount: "$200.34",
  },
  {
    logo: "sack",
    title: "Gift",
    dateTime: "27th Dec at 4:00am",
    amount: "$30.00",
  },
];

const Income = () => {
  const { colors } = useTheme();
  const styles = createStyles(colors);
  return (
    <View style={styles.container}>
      <View style={styles.title}>
        <Image source={icons.angleLeft} style={styles.goBackIcon} />
        <Text style={styles.titleLabel}>Income</Text>
      </View>
      <View style={styles.data}>
        <MoneyBox
          color={"white"}
          title={"total income"}
          icon={"coins"}
          amount={"500"}
          bgColor={"success"}
        />
        <MoneyBox
          color={"black"}
          title={"available balance"}
          icon={"sendMoney"}
          amount={"20,000"}
          bgColor={"secondary"}
        />
      </View>
      <BarChart data={[2000, 200, 230, 40, 20]} screen="income" />
      <View style={styles.heading}>
        <Text style={styles.listTitle}>Income list</Text>
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
            direction={true} // represents incoming money
            giveTint={true}
          />
        ))}
      </ScrollView>
    </View>
  );
};

export default Income;

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
