import React, { useEffect, useState } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";

import MoneyBox from "@/src/components/MoneyBox";
import BarChart from "@/src/components/BarChart";
import icons from "@/src/Assets/icons";
import TransactionItem from "@/src/components/TransactionItem";
import MonthModal from "@/src/components/MonthModal";

import { useTheme } from "@react-navigation/native";
import { useAppDispatch, useAppSelector } from "@/src/redux/store";
import { fetchUserTransactions } from "@/src/redux/slices/transactionSlice";
import images from "@/src/Assets/images";
import { collection, getDocs } from "@firebase/firestore";
import { db } from "@/firebaseConfig";
import { getMonthlyData } from "@/src/utils/getMonthlyData";
import { getCurrentMonth } from "@/src/utils/getCurrentMonth";
import ScreenHeader from "@/src/components/ScreenHeader";
import { useTranslation } from "react-i18next";

interface User {
  uid: string;
  name: string;
  email: string;
  image?: string;
}

// shows outgoing money from other users and analytics chart

const Spending = () => {
  const { colors } = useTheme();
  const styles = createStyles(colors);
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const accBalance = useAppSelector((state) => state.auth.user.accBalance);
  const currentUser = useAppSelector((state) => state.auth.user);
  const { transactions } = useAppSelector((state) => state.transaction);

  const [users, setUsers] = useState<User[]>([]);
  const [totalSpend, setTotalSpend] = useState(0);
  const [barChartData, setBarChartData] = useState<number[]>([0, 0, 0, 0, 0]);
  const [selectedMonth, setSelectedMonth] = useState(getCurrentMonth());
  const [showMonthModal, setShowMonthModal] = useState(false);
  const [spendingData, setSpendingData] = useState([]);

  // fetching users and setting them
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
      fetchUsers();
    }
  }, [currentUser?.uid]);

  // fetching and setting spending data
  useEffect(() => {
    if (currentUser?.uid && users.length > 0) {
      const recentTransactions = transactions
        .filter((tx) => tx.senderUID === currentUser.uid)
        .sort((a, b) => b.createdAt - a.createdAt)
        .slice(0, 5)
        .map((tx) => {
          const receiver = users.find((u) => u.uid === tx.receiverUID);
          const receiverName = receiver ? receiver.name : "Unknown";

          return {
            logo: "creditCardMinus",
            title: `${receiverName} - \n${tx.purpose || "Transfer"}`,
            dateTime: formatTimestamp(tx.createdAt),
            amount: `₹${tx.amount}`,
          };
        });

      setSpendingData(recentTransactions);
    }

    const helpr = getMonthlyData(
      transactions,
      currentUser.uid,
      "spending",
      selectedMonth
    );
    setBarChartData(helpr.periods);
    setTotalSpend(helpr.total);
  }, [currentUser?.uid, transactions, users, selectedMonth]);

  // formatting timestamp
  const formatTimestamp = (timestamp) => {
    if (!timestamp || !timestamp.seconds) return "";
    const date = new Date(timestamp.seconds * 1000);
    return date.toLocaleString("en-US");
  };

  return (
    <View style={styles.container}>
      <ScreenHeader title="Spending" />
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
          title={t("spendingScreen.totalSpend")}
          icon={"creditCardMinus"}
          amount={totalSpend.toString()}
          bgColor={"primary"}
        />
        <MoneyBox
          color={"black"}
          title={t("incomeScreen.availableBalance")}
          icon={"sendMoney"}
          amount={accBalance.toString()}
          bgColor={"secondary"}
        />
      </View>

      <BarChart data={barChartData} screen="spending" />

      <View style={styles.heading}>
        <Text style={styles.listTitle}>{t("spendingScreen.spendingList")}</Text>
        <Image source={icons.filter} style={styles.filterIcon} />
      </View>

      <ScrollView style={styles.dataListContainer}>
        {spendingData.length > 0 ? (
          spendingData.map((item, index) => (
            <TransactionItem
              key={index}
              logo={item.logo}
              name={item.title}
              time={item.dateTime}
              amount={item.amount}
              direction={false}
              giveTint={true}
            />
          ))
        ) : (
          <Text
            style={{ textAlign: "center", marginTop: 20, color: colors.text }}
          >
            {t("spendingScreen.noRecentTransactions")}
          </Text>
        )}
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

export default Spending;

const createStyles = (colors: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
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
    data: {
      paddingHorizontal: 25,
      flexDirection: "row",
      justifyContent: "space-between",
    },
    heading: {
      paddingHorizontal: "6%",
      marginTop: 150,
      flexDirection: "row",
      justifyContent: "space-between",
      marginVertical: 20,
    },
    listTitle: {
      fontSize: 24,
      fontWeight: "500",
      color: colors.textPrimary,
    },
    filterIcon: {
      width: 24,
      height: 24,
      tintColor: colors.textPrimary,
    },
    dataListContainer: {
      paddingHorizontal: "6%",
    },
  });
