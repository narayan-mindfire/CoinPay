// screens/HomeScreen.tsx

import icons from "@/src/Assets/icons";
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";

const HomeScreen = () => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.balanceSection}>
        <Text style={styles.currency}>US Dollar</Text>
        <Text style={styles.amount}>$20,000</Text>
        <TouchableOpacity style={styles.addButton}>
          <Text style={styles.addText}>Add Money</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.actions}>
        <ActionButton label="Send" icon="send" />
        <ActionButton label="Request" icon="cash-plus" />
        <ActionButton label="Bank" icon="bank" />
      </View>

      <Text style={styles.transactionTitle}>Transaction</Text>
      <View style={styles.transactionCard}>
        <TransactionItem
          icon="cart"
          label="Spending"
          amount="-500"
          color="red"
        />
        <TransactionItem
          icon="cash"
          label="Income"
          amount="3000"
          color="green"
        />
        <TransactionItem
          icon="file-document"
          label="Bills"
          amount="-800"
          color="orange"
        />
        <TransactionItem
          icon="piggy-bank"
          label="Savings"
          amount="1000"
          color="#FFC107"
        />
      </View>
    </ScrollView>
  );
};

const ActionButton = ({ label, icon }: { label: string; icon: string }) => (
  <View style={{ alignItems: "center" }}>
    <View style={styles.actionButton}>
      <Image source={icons[icon]} />
    </View>
    <Text style={{ color: "white", marginTop: 5 }}>{label}</Text>
  </View>
);

const TransactionItem = ({
  icon,
  label,
  amount,
  color,
}: {
  icon: string;
  label: string;
  amount: string | number;
  color: string;
}) => (
  <View style={styles.transactionItem}>
    {/* <Icon name={icon} size={24} color={color} /> */}
    <Text style={styles.transactionLabel}>{label}</Text>
    <Text style={{ color }}>
      {amount.toString().startsWith("-") ? amount : `+${amount}`}
    </Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    backgroundColor: "gray",
    flex: 1,
    padding: 16,
  },
  balanceSection: {
    alignItems: "center",
    marginBottom: 30,
  },
  currency: {
    color: "white",
    fontSize: 16,
  },
  amount: {
    fontSize: 36,
    color: "white",
    fontWeight: "bold",
    marginVertical: 10,
  },
  addButton: {
    backgroundColor: "#675DFF",
    paddingVertical: 10,
    paddingHorizontal: 24,
    borderRadius: 24,
  },
  addText: {
    color: "white",
    fontWeight: "bold",
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 20,
  },
  actionButton: {
    backgroundColor: "#292833",
    padding: 16,
    borderRadius: 20,
  },
  transactionTitle: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  transactionCard: {
    backgroundColor: "#292833",
    borderRadius: 12,
    padding: 16,
  },
  transactionItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  transactionLabel: {
    color: "white",
    flex: 1,
    marginLeft: 10,
  },
});

export default HomeScreen;
