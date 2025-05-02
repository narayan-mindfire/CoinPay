import React from "react";

import { View, FlatList, StyleSheet } from "react-native";

import UserTransaction from "./UserTransaction";
import { useTheme } from "@react-navigation/native";

// the modal shows search results for selection of other users for sending or receiving money
const UserSearchModal = ({
  handleRecipientClick,
  filteredResults,
  setShowModal,
  setSearchQuery,
}) => {
  const { colors } = useTheme();
  const styles = createStyles(colors);
  return (
    <View style={styles.modalContainer}>
      <FlatList
        data={filteredResults}
        keyExtractor={(item) => item.uid}
        renderItem={({ item }) => (
          <UserTransaction
            name={item.name}
            email={item.email}
            image={item.image}
            amount=""
            handlePress={() => {
              handleRecipientClick(item);
              setShowModal(false);
              setSearchQuery("");
            }}
          />
        )}
      />
    </View>
  );
};

export default UserSearchModal;

const createStyles = (colors: any) =>
  StyleSheet.create({
    modalContainer: {
      position: "absolute",
      top: 150,
      left: 20,
      right: 20,
      bottom: 100,
      backgroundColor: colors.backgroundModal,
      borderRadius: 10,
      padding: 10,
      elevation: 10,
      zIndex: 999,
    },
  });
