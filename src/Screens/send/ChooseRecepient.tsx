import React, { useEffect, useState } from "react";

import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
} from "react-native";

import images from "@/src/Assets/images";
import CamButton from "@/src/components/CamButton";
import UserTransaction from "@/src/components/UserTransaction";
import SearchBar from "@/src/components/SearchBar";
import LoaderModal from "@/src/components/LoaderModal";

import { useAppDispatch, useAppSelector } from "@/src/redux/store";
import { fetchUserTransactions } from "@/src/redux/slices/transactionSlice";
import {
  setReceiverUID,
  setSenderUID,
} from "@/src/redux/slices/currentTransactionSlice";

import { collection, getDocs } from "firebase/firestore";
import { db } from "@/firebaseConfig";

import { useTranslation } from "react-i18next";
import { useTheme } from "@react-navigation/native";

interface User {
  uid: string;
  name: string;
  email: string;
  image?: string;
}

const ChooseRecepient = ({ navigation }) => {
  const { colors } = useTheme();
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const [users, setUsers] = useState<User[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  const currentUser = useAppSelector((state) => state.auth.user);
  const { transactions, loading } = useAppSelector(
    (state) => state.transaction
  );

  const styles = createStyles(colors);

  // fetching users from firebase to display in recent transactions

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

  const filteredResults = users.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const exactMatch = users.find(
    (item) => item.email.toLowerCase() === searchQuery.toLowerCase()
  );

  const handleRecipientClick = (recipient) => {
    dispatch(setSenderUID(currentUser.uid));
    dispatch(setReceiverUID(recipient.uid));
    navigation.navigate("PurposeSelection");
  };

  // data to display in recent transactions
  const recentTransactions = transactions
    .filter((tx) => tx.senderUID === currentUser?.uid)
    .sort((a, b) => b.createdAt - a.createdAt)
    .slice(0, 5);

  return (
    <View style={styles.container}>
      {/* loading screen when list of senders is loading  */}
      <LoaderModal visible={loading} />
      <Text style={styles.title}>{t("chooseRecipient.title")}</Text>

      <Text style={styles.subtitle}>{t("chooseRecipient.subtitle")}</Text>

      <SearchBar
        placeholder={t("chooseRecipient.searchPlaceholder")}
        value={searchQuery}
        onChangeText={setSearchQuery}
      />

      {exactMatch && (
        <View style={styles.matchCard}>
          <Text style={styles.sectionTitle}>{t("chooseRecipient.sendTo")}</Text>
          <UserTransaction
            name={exactMatch.name}
            email={exactMatch.email}
            amount=""
            image={exactMatch.image}
          />
        </View>
      )}

      <Text style={styles.sectionTitle}>{t("chooseRecipient.mostRecent")}</Text>
      {loading && <LoaderModal visible={loading} />}
      <FlatList
        data={recentTransactions}
        removeClippedSubviews={false}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          const receiver = users.find((u) => u.uid === item.receiverUID);
          return (
            <UserTransaction
              name={receiver?.name || "Unknown"}
              email={receiver?.email || item.receiverUID}
              amount={`₹${item.amount}`}
              image={images.profile}
              direction={false}
              handlePress={() => handleRecipientClick(receiver)}
            />
          );
        }}
      />

      <CamButton
        navigation={navigation}
        to="ScanSend"
        icon="camera"
        text={t("chooseRecipient.scanToPay")}
      />
    </View>
  );
};

export default ChooseRecepient;

const createStyles = (colors: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
      paddingHorizontal: 25,
      paddingTop: 30,
    },
    title: {
      fontSize: 22,
      fontWeight: "700",
      color: colors.textPrimary,
    },
    subtitle: {
      fontSize: 14,
      color: colors.textTertiary,
      marginTop: 5,
      marginBottom: 20,
    },
    sectionTitle: {
      fontSize: 16,
      fontWeight: "600",
      marginTop: 25,
      marginBottom: 10,
      color: colors.textPrimary,
    },
    matchCard: {
      marginTop: 20,
      padding: 12,
      backgroundColor: colors.card,
      borderRadius: 14,
      shadowColor: "#000",
      shadowOpacity: 0.1,
      shadowRadius: 10,
      elevation: 4,
    },
  });
