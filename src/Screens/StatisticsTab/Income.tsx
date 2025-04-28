import React, { useEffect, useState } from "react";

import { Image, ScrollView, StyleSheet, Text, View } from "react-native";

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

interface User {
  uid: string;
  name: string;
  email: string;
  image?: string;
}

const Income = () => {
  const { colors } = useTheme();
  const dispatch = useAppDispatch();
  const styles = createStyles(colors);
  const accBalance = useAppSelector((state) => state.auth.user.accBalance);
  const currentUser = useAppSelector((state) => state.auth.user);
  const { transactions } = useAppSelector((state) => state.transaction);
  console.log(
    transactions.filter((tx) => tx.senderUID === currentUser.uid)[0].createdAt
  );

  const [users, setUsers] = useState<User[]>([]);
  const [barChartData, setBarChartData] = useState<number[]>([0, 0, 0, 0, 0]);
  const [monthlyIncome, setMonthlyIncome] = useState(0);

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

  const [spendingData, setSpendingData] = useState([]);

  useEffect(() => {
    if (currentUser?.uid && users.length > 0) {
      const recentTransactions = transactions
        .filter((tx) => tx.receiverUID === currentUser.uid)
        .sort((a, b) => b.createdAt - a.createdAt)
        .slice(0, 5)
        .map((tx) => {
          const sender = users.find((u) => u.uid === tx.senderUID);
          const senderEmail = sender ? sender.email : "Unknown";

          return {
            logo: "creditCardPlus",
            title: `${senderEmail} - \n${tx.purpose || "Transfer"}`,
            dateTime: formatTimestamp(tx.createdAt),
            amount: `₹${tx.amount}`,
          };
        });

      setSpendingData(recentTransactions);
    }
    const helpr = getMonthlyData(transactions, currentUser.uid, "income");
    setBarChartData(helpr.periods);
    setMonthlyIncome(helpr.total);
  }, [currentUser?.uid, transactions, users]);

  // Helper function to format timestamp
  const formatTimestamp = (timestamp) => {
    if (!timestamp || !timestamp.seconds) return "";

    const date = new Date(timestamp.seconds * 1000);
    const options: Intl.DateTimeFormatOptions = {
      day: "numeric",
      month: "short",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    };
    return date.toLocaleString("en-US", options);
  };

  return (
    <View style={styles.container}>
      <View style={styles.title}>
        <Text style={styles.titleLabel}>Income</Text>
      </View>
      <View style={styles.data}>
        <MoneyBox
          color={"white"}
          title={"total income"}
          icon={"coins"}
          amount={monthlyIncome.toString()}
          bgColor={"success"}
        />
        <MoneyBox
          color={"black"}
          title={"available balance"}
          icon={"sendMoney"}
          amount={accBalance.toString()}
          bgColor={"secondary"}
        />
      </View>
      <BarChart data={barChartData} screen="income" />
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
      marginBottom: 40,
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
  });
