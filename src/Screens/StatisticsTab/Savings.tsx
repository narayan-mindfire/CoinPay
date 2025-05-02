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
import { useTranslation } from "react-i18next";

const savingData = [
  {
    logo: "creditCardPlus",
    title: "anonymous savings",
    dateTime: "1st Jan at 7:20pm",
    amount: "$15.99",
  },
  {
    logo: "creditCardPlus",
    title: "future plan",
    dateTime: "3rd Jan at 5:00pm",
    amount: "$9.99",
  },
  {
    logo: "creditCardPlus",
    title: "retirement savings",
    dateTime: "9th Sept at 3:00pm",
    amount: "$20.99",
  },
  {
    logo: "creditCardPlus",
    title: "emergency fund",
    dateTime: "1st Dec at 4:00am",
    amount: "$200.00",
  },
];

// savings shows user savings, this is static currently
const Savings = () => {
  const { colors } = useTheme();
  const { t } = useTranslation();

  const styles = createStyles(colors);
  const accBalance = useAppSelector((state) => state.auth.user.accBalance);

  return (
    <View style={styles.container}>
      <ScreenHeader title={t("savingsScreen.savings")} />
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
          title={t("savingsScreen.totalSavings")}
          icon={"sack"}
          amount={"500"}
          bgColor={"warning"}
        />
        <MoneyBox
          color={"black"}
          title={t("savingsScreen.availableBalance")}
          icon={"sendMoney"}
          amount={accBalance.toString()}
          bgColor={"secondary"}
        />
      </View>
      <BarChart data={[20, 20, 30, 40, 20]} screen="savings" />
      <View style={styles.heading}>
        <Text style={styles.listTitle}>{t("savingsScreen.savingsList")}</Text>
        <Image source={icons.filter} style={styles.filterIcon} />
      </View>
      <ScrollView style={styles.dataListContainer}>
        {savingData.map((item, index) => (
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

export default Savings;

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
