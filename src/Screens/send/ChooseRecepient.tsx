import React, { useState } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { useTheme } from "@react-navigation/native";
import images from "@/src/Assets/images";
import CamButton from "@/src/components/CamButton";
import UserTransaction from "@/src/components/UserTransaction";
import SearchBar from "@/src/components/SearchBar";

const recentRecipients = Array(5).fill({
  name: "Mehedi Hasan",
  email: "helloyouthmind@gmail.com",
  amount: "-$100",
  image: images.profile,
});

const ChooseRecepient = ({ navigation }) => {
  const { colors } = useTheme();
  const styles = createStyles(colors);

  const [searchQuery, setSearchQuery] = useState("");

  const filteredResults = recentRecipients.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const exactMatch = recentRecipients.find(
    (item) => item.email.toLowerCase() === searchQuery.toLowerCase()
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Choose Recipient</Text>
      <Text style={styles.subtitle}>
        Please select your recipient to send money.
      </Text>

      <SearchBar
        placeholder="Search * Recipient Email*"
        value={searchQuery}
        onChangeText={setSearchQuery}
      />

      {exactMatch && (
        <View style={styles.matchCard}>
          <Text style={styles.sectionTitle}>Send to</Text>
          <UserTransaction
            name={exactMatch.name}
            email={exactMatch.email}
            amount={exactMatch.amount}
            image={exactMatch.image}
          />
        </View>
      )}

      <Text style={styles.sectionTitle}>Most Recent</Text>

      <FlatList
        data={filteredResults}
        removeClippedSubviews={false}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item }) => (
          <UserTransaction
            name={item.name}
            email={item.email}
            amount={item.amount}
            image={item.image}
          />
        )}
      />
      <CamButton
        navigation={navigation}
        to="PurposeSelection"
        icon="camera"
        text={"Scan to Pay"}
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
