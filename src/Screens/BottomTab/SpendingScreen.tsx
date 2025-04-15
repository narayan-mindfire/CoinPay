import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import { useTheme } from "@react-navigation/native";
import icons from "@/src/Assets/icons";

const tabs = [
  { id: "spending", label: "Spending", icon: "wallet" },
  { id: "income", label: "Income", icon: "wallet" },
  { id: "bills", label: "Bills", icon: "wallet" },
  { id: "savings", label: "Savings", icon: "wallet" },
];

const BalanceBox = ({
  icon,
  text,
  amount,
  theme,
  colors,
}: {
  icon: string;
  text: string;
  amount: string;
  theme: "dark" | "light";
  colors: any;
}) => {
  const styles = createBalanceBoxStyles(colors);
  return (
    <View style={styles.boxContainer}>
      <View style={styles.labelContainer}>
        <Image
          source={icons[icon]}
          tintColor={theme === "dark" ? "black" : "white"}
          style={styles.iconStyle}
        />
        <Text style={styles.labelStyle}>{text}</Text>
      </View>
      <Text style={styles.amountStyle}>{amount}</Text>
    </View>
  );
};

const SpendingScreen = () => {
  const { colors } = useTheme();
  const styles = createStyles(colors);
  const [curData, setCurData] = useState("spending");
  const [month, setMonth] = useState("January");

  const getDataForTab = (tab: string) => {
    switch (tab) {
      case "spending":
        return [
          { icon: "wallet", text: "Total Spend", amount: "$500.00" },
          { icon: "bank", text: "Available", amount: "$20,000.00" },
        ];
      case "income":
        return [
          { icon: "wallet", text: "Total Income", amount: "$5,000.00" },
          { icon: "bank", text: "Saved", amount: "$1,500.00" },
        ];
      case "bills":
        return [
          { icon: "wallet", text: "Total Bills", amount: "$800.00" },
          { icon: "bank", text: "Paid", amount: "$600.00" },
        ];
      case "savings":
        return [
          { icon: "wallet", text: "Goal", amount: "$10,000.00" },
          { icon: "bank", text: "Saved", amount: "$3,000.00" },
        ];
      default:
        return [];
    }
  };

  const data = getDataForTab(curData);

  return (
    <View style={styles.container}>
      <Text style={styles.curDataLabel}>{curData}</Text>

      <View style={styles.monthBox}>
        <Text style={styles.monthLabel}>{month}</Text>
        <TouchableOpacity>
          <Image source={icons.angleDown} tintColor={colors.border} />
        </TouchableOpacity>
      </View>

      <View style={styles.balanceContainer}>
        {data.map((item, index) => (
          <BalanceBox
            key={index}
            icon={item.icon}
            text={item.text}
            amount={item.amount}
            theme="dark"
            colors={colors}
          />
        ))}
      </View>

      <View style={styles.tabContainer}>
        {tabs.map((tab) => (
          <TouchableOpacity
            key={tab.id}
            style={[styles.tabButton, curData === tab.id && styles.activeTab]}
            onPress={() => setCurData(tab.id)}
          >
            <Image source={icons[tab.icon]} style={styles.tabIcon} />
            <Text
              style={[
                styles.tabLabel,
                curData === tab.id && styles.activeTabLabel,
              ]}
            >
              {tab.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default SpendingScreen;

const createBalanceBoxStyles = (colors: any) =>
  StyleSheet.create({
    boxContainer: {
      height: 120,
      width: "48%",
      borderRadius: 16,
      backgroundColor: colors.primary,
      padding: 16,
      justifyContent: "space-between",
    },
    labelContainer: {
      flexDirection: "row",
      alignItems: "center",
    },
    iconStyle: {
      width: 20,
      height: 20,
      marginRight: 10,
    },
    labelStyle: {
      color: colors.textPrimary,
      fontSize: 14,
    },
    amountStyle: {
      color: colors.textPrimary,
      fontSize: 22,
      fontWeight: "bold",
    },
  });

const createStyles = (colors: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
      paddingHorizontal: 20,
      paddingTop: 40,
    },
    curDataLabel: {
      color: colors.textPrimary,
      fontSize: 24,
      fontWeight: "600",
      textAlign: "center",
      marginBottom: 20,
      textTransform: "capitalize",
    },
    monthBox: {
      backgroundColor: colors.backgroundModal,
      height: 50,
      width: 120,
      borderRadius: 15,
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingHorizontal: 16,
      alignSelf: "flex-start",
      marginBottom: 20,
    },
    monthLabel: {
      color: colors.textSecondary,
      fontSize: 18,
      fontWeight: "600",
    },
    balanceContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginBottom: 30,
    },
    tabContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
    },
    tabButton: {
      flex: 1,
      paddingVertical: 10,
      alignItems: "center",
      borderRadius: 10,
      backgroundColor: colors.card,
      marginHorizontal: 5,
    },
    activeTab: {
      backgroundColor: colors.primary,
    },
    tabLabel: {
      color: colors.textSecondary,
      fontSize: 14,
    },
    activeTabLabel: {
      color: "#fff",
      fontWeight: "600",
    },
    tabIcon: {
      width: 18,
      height: 18,
      marginBottom: 4,
      tintColor: colors.textSecondary,
    },
  });
