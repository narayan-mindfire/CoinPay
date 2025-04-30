import React, { useEffect, useState } from "react";

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
import { useAppDispatch, useAppSelector } from "@/src/redux/store";
import { getMonthlyData } from "@/src/utils/getMonthlyData";
import { collection, getDocs } from "@firebase/firestore";
import { db } from "@/firebaseConfig";
import images from "@/src/Assets/images";
import { fetchUserTransactions } from "@/src/redux/slices/transactionSlice";
import { getCurrentMonth } from "@/src/utils/getCurrentMonth";
import MonthModal from "@/src/components/MonthModal";
import ScreenHeader from "@/src/components/ScreenHeader";

import { useTranslation } from "react-i18next";

interface User {
  uid: string;
  name: string;
  email: string;
  image?: string;
}

// shows incoming money from other users and analytics chart
const Income = () => {
  const { colors } = useTheme();
  const dispatch = useAppDispatch();
  const { transactions } = useAppSelector((state) => state.transaction);
  const accBalance = useAppSelector((state) => state.auth.user.accBalance);
  const currentUser = useAppSelector((state) => state.auth.user);

  const { t } = useTranslation();

  const styles = createStyles(colors);

  const [users, setUsers] = useState<User[]>([]);
  const [barChartData, setBarChartData] = useState<number[]>([0, 0, 0, 0, 0]);
  const [monthlyIncome, setMonthlyIncome] = useState(0);
  const [selectedMonth, setSelectedMonth] = useState(getCurrentMonth());
  const [showMonthModal, setShowMonthModal] = useState(false);
  const [spendingData, setSpendingData] = useState([]);

  // getting users other than current user
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const userSnap = await getDocs(collection(db, "users"));
        const fetchedUsers: User[] = [];

        userSnap.forEach((doc) => {
          const data = doc.data();
          if (data.uid !== currentUser?.uid) {
            fetchedUsers.push({
              uid: data.uid,
              name: data.name || "Unnamed",
              email: data.email,
              image: data.image || images.profile,
            });
          }
        });

        setUsers(fetchedUsers);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    if (currentUser?.uid) {
      dispatch(fetchUserTransactions(currentUser.uid));
    }

    fetchUsers();
  }, [currentUser?.uid]);

  //getting transactions in which the receiver is the current user
  useEffect(() => {
    if (currentUser?.uid && users.length > 0) {
      const recentTransactions = transactions
        .filter((tx) => tx.receiverUID === currentUser.uid)
        .sort((a, b) => b.createdAt - a.createdAt)
        .slice(0, 5)
        .map((tx) => {
          const sender = users.find((u) => u.uid === tx.senderUID);
          const senderEmail = sender ? sender.name : "Unknown";

          return {
            logo: "creditCardPlus",
            title: `${senderEmail} - \n${tx.purpose || "Transfer"}`,
            dateTime: formatTimestamp(tx.createdAt),
            amount: `₹${tx.amount}`,
          };
        });

      setSpendingData(recentTransactions);
    }
    const helpr = getMonthlyData(
      transactions,
      currentUser.uid,
      "income",
      selectedMonth
    );
    setBarChartData(helpr.periods);
    setMonthlyIncome(helpr.total);
  }, [currentUser?.uid, transactions, users, selectedMonth]);

  // Helper function to format timestamp
  const formatTimestamp = (timestamp) => {
    if (!timestamp || !timestamp.seconds) return "";

    const date = new Date(timestamp.seconds * 1000);
    return date.toLocaleString("en-US");
  };

  return (
    <View style={styles.container}>
      <ScreenHeader title={t("incomeScreen.title")} />
      <View style={styles.title}>
        <View style={{ flex: 1, alignItems: "flex-start" }}>
          <TouchableOpacity
            style={styles.monthPicker}
            onPress={() => setShowMonthModal(true)}
          >
            <Text style={styles.selectedMonthText}>{selectedMonth}</Text>
            <Image source={icons.angleDown} style={styles.dropdownIcon} />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.data}>
        <MoneyBox
          color={"white"}
          title={t("incomeScreen.title")}
          icon={"coins"}
          amount={monthlyIncome.toString()}
          bgColor={"success"}
        />
        <MoneyBox
          color={"black"}
          title={t("incomeScreen.availableBalance")}
          icon={"sendMoney"}
          amount={accBalance.toString()}
          bgColor={"secondary"}
        />
      </View>
      <BarChart data={barChartData} screen="income" />
      <View style={styles.heading}>
        <Text style={styles.listTitle}>{t("incomeScreen.incomeList")}</Text>
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
      <MonthModal
        visible={showMonthModal}
        onSelectMonth={(month) => setSelectedMonth(month)}
        onClose={() => setShowMonthModal(false)}
        colors={colors}
      />
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
    selectedMonthText: {
      fontSize: 20,
      fontWeight: "500",
      color: colors.textPrimary,
      marginRight: 5,
    },
    dropdownIcon: {
      width: 20,
      height: 20,
      tintColor: colors.textPrimary,
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
