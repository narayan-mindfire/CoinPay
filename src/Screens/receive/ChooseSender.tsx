import React, { useEffect, useState } from "react";

import { View, Text, StyleSheet, FlatList } from "react-native";

import images from "@/src/Assets/images";
import CamButton from "@/src/components/CamButton";
import UserTransaction from "@/src/components/UserTransaction";
import SearchBar from "@/src/components/SearchBar";
import LoaderModal from "@/src/components/LoaderModal";

import { collection, getDocs } from "@firebase/firestore";
import { db } from "@/firebaseConfig";

import { fetchUserTransactions } from "@/src/redux/slices/transactionSlice";
import { useAppDispatch, useAppSelector } from "@/src/redux/store";

import { useTheme } from "@react-navigation/native";

const ChooseSender = ({ navigation }) => {
  const { colors } = useTheme();
  const styles = createStyles(colors);
  const dispatch = useAppDispatch();

  const { transactions, loading } = useAppSelector(
    (state) => state.transaction
  );

  const [searchQuery, setSearchQuery] = useState("");

  interface User {
    uid: string;
    name: string;
    email: string;
    image?: string;
  }

  const [users, setUsers] = useState<User[]>([]);

  const exactMatch = users.find(
    (user) => user.email.toLowerCase() === searchQuery.toLowerCase()
  );

  const currentUser = useAppSelector((state) => state.auth.user);

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

  const recentTransactions = transactions
    .filter((tx) => tx.receiverUID === currentUser?.uid)
    .sort((a, b) => b.createdAt - a.createdAt)
    .slice(0, 5);

  const handleRecipientClick = (recipient) => {
    navigation.navigate("PurposeSelectionReceive");
  };

  return (
    <View style={styles.container}>
      {/* loading screen when list of senders is loading  */}
      <LoaderModal visible={loading} />
      <Text style={styles.title}>Choose Sender</Text>
      <Text style={styles.subtitle}>
        Please select your send to request money.
      </Text>

      <SearchBar
        placeholder="Search *sender Email*"
        value={searchQuery}
        onChangeText={setSearchQuery}
      />

      {exactMatch && (
        <View style={styles.matchCard}>
          <Text style={styles.sectionTitle}>Send to</Text>
          <UserTransaction
            name={exactMatch.name}
            email={exactMatch.email}
            image={exactMatch.image}
          />
        </View>
      )}

      <Text style={styles.sectionTitle}>Most Recent</Text>

      <FlatList
        data={recentTransactions}
        removeClippedSubviews={false}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          const sender = users.find((u) => u.uid === item.senderUID);
          return (
            <UserTransaction
              name={sender?.name || "Unknown"}
              email={sender?.email || item.senderUID}
              amount={`₹${item.amount}`}
              image={sender?.image || images.profile}
              direction={true}
              handlePress={() => handleRecipientClick(sender)}
            />
          );
        }}
      />
      <CamButton
        navigation={navigation}
        to="PurposeSelectionReceive"
        icon="camera"
        text={"Scan to Pay"}
      />
    </View>
  );
};

export default ChooseSender;

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
