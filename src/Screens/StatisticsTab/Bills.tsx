import React from "react";

import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import MoneyBox from "@/src/components/MoneyBox";
import BarChart from "@/src/components/BarChart";
import TransactionItem from "@/src/components/TransactionItem";
import icons from "@/src/Assets/icons";

import { useTheme } from "@react-navigation/native";
import { useAppSelector } from "@/src/redux/store";
import { getCurrentMonth } from "@/src/utils/getCurrentMonth";
import ScreenHeader from "@/src/components/ScreenHeader";

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
  const accBalance = useAppSelector((state) => state.auth.user.accBalance);

  return (
    <View style={styles.container}>
      <ScreenHeader title="Bills" />
      <View style={styles.title}>
        <View style={{ flex: 1, alignItems: "flex-start" }}>
          <TouchableOpacity style={styles.monthPicker}>
            <Text style={styles.selectedMonthText}>{getCurrentMonth()}</Text>
            <Image source={icons.angleDown} style={styles.dropdownIcon} />
          </TouchableOpacity>
        </View>
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
          amount={accBalance.toString()}
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
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 20,
      paddingTop: 5,
      paddingLeft: 15,
      paddingRight: 15,
      justifyContent: "space-between",
    },
    titleLabel: {
      fontSize: 28,
      fontWeight: "500",
      color: colors.textPrimary,
      textAlign: "center",
    },
    monthPicker: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-evenly",
      backgroundColor: colors.backgroundModal,
      width: 120,
      padding: 10,
      borderRadius: 15,
    },
    dropdownIcon: {
      width: 20,
      height: 20,
      tintColor: colors.textPrimary,
    },
    selectedMonthText: {
      fontSize: 20,
      fontWeight: "500",
      color: colors.textPrimary,
      marginRight: 5,
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
  });
