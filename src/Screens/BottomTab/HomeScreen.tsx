import icons from "@/src/Assets/icons";
import { useTheme } from "@react-navigation/native";
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import { Dimensions } from "react-native";

import images from "@/src/Assets/images";
const HomeScreen = () => {
  const { colors } = useTheme();
  const styles = createStyles(colors);
  return (
    <ScrollView style={styles.container}>
      <ImageBackground
        source={images.bg}
        resizeMode="cover"
        style={styles.image}
      >
        <View style={styles.contentContainer}>
          <View style={styles.balanceSection}>
            <Text style={styles.currency}>US Dollar</Text>
            <Text style={styles.amount}>$20,000</Text>
            <TouchableOpacity style={styles.addButton}>
              <Text style={styles.addText}>Add Money</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.actions}>
            <ActionButton
              label="Send"
              icon="sendMoney"
              colors={colors}
              tintColor="primary"
            />
            <ActionButton
              label="Request"
              icon="getMoney"
              colors={colors}
              tintColor="warning"
            />
            <ActionButton
              label="Bank"
              icon="bank"
              colors={colors}
              tintColor="warning"
            />
          </View>
          <View style={styles.transactionHeading}>
            <Text style={styles.transactionTitle}>Transaction</Text>
            <TouchableOpacity>
              <Image
                source={icons.arrowRight}
                style={styles.arrowStyles}
                tintColor={colors.textSecondary}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.transactionCard}>
            <TransactionItem
              icon="creditCardMinus"
              label="Spending"
              amount="-500"
              color="primary"
              backgroundColor="backgroundAccent"
              colors={colors}
            />
            <TransactionItem
              icon="coins"
              label="Income"
              amount="3000"
              color="success"
              colors={colors}
              backgroundColor="backgroundSuccess"
            />
            <TransactionItem
              icon="invoice"
              label="Bills"
              amount="-800"
              color="error"
              colors={colors}
              backgroundColor="backgroundError"
            />
            <TransactionItem
              icon="sack"
              label="Savings"
              amount="1000"
              color="warning"
              colors={colors}
              backgroundColor="backgroundWarning"
            />
          </View>
        </View>
      </ImageBackground>
    </ScrollView>
  );
};

const ActionButton = ({
  label,
  icon,
  colors,
  tintColor,
}: {
  label: string;
  icon: string;
  colors: any;
  tintColor: string;
}) => {
  const styles = createActionButtonStyles(colors);
  return (
    <View style={{ alignItems: "center" }}>
      <View style={styles.actionButton}>
        <Image
          source={icons[icon]}
          tintColor={colors[tintColor]}
          style={[styles.actionIcon]}
        />
      </View>
      <Text style={styles.actionLabel}>{label}</Text>
    </View>
  );
};

const TransactionItem = ({
  icon,
  label,
  amount,
  color,
  colors,
  backgroundColor,
}: {
  icon: string;
  label: string;
  amount: string | number;
  color: string;
  colors: any;
  backgroundColor: string;
}) => {
  const styles = createTransactionStyles(colors);
  return (
    <View
      style={[
        styles.transactionItem,
        {
          borderBottomWidth: label === "Savings" ? 0 : 1,
          paddingVertical: 15,
        },
      ]}
    >
      <View
        style={[
          styles.transactionIconStyles,
          { backgroundColor: colors[backgroundColor] },
        ]}
      >
        <Image source={icons[icon]} tintColor={colors[color]} />
      </View>
      <Text style={styles.transactionLabel}>{label}</Text>
      <View style={{ flexDirection: "row" }}>
        <Text style={[{ color: colors[color] }]}>
          {amount.toString().startsWith("-") ? amount : `+${amount}`}
        </Text>
        <Image
          source={icons.angleRight}
          tintColor={colors.textPrimary}
          style={styles.angleIcon}
        />
      </View>
    </View>
  );
};

const createActionButtonStyles = (colors: any) =>
  StyleSheet.create({
    actionIcon: {
      height: 34,
      width: 34,
      padding: 20,
    },
    actionButton: {
      paddingTop: 16,
      paddingBottom: 4,
    },
    actionLabel: {
      color: colors.textSecondary,
      fontWeight: 600,
      textAlign: "center",
      paddingBottom: 16,
    },
  });

const createTransactionStyles = (colors: any) =>
  StyleSheet.create({
    transactionItem: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      //   marginBottom: 12,
      borderBottomColor: colors.border,
      //   paddingVertical: 20,
    },
    transactionLabel: {
      color: colors.textSecondary,
      flex: 1,
      marginLeft: 10,
      fontSize: 18,
    },
    angleIcon: {
      marginLeft: 5,
      height: 20,
      width: 20,
    },
    transactionIconStyles: {
      padding: 10,
      borderRadius: 30,
    },
  });

const { height: screenHeight } = Dimensions.get("window");

const createStyles = (colors: any) =>
  StyleSheet.create({
    image: {
      height: screenHeight * 0.3,
    },
    container: {
      backgroundColor: colors.background,
      flex: 1,
      marginTop: 40,
    },
    contentContainer: {
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
      backgroundColor: "transparent",
      paddingVertical: 10,
      paddingHorizontal: 24,
      borderRadius: 24,
      borderWidth: 2,
      borderColor: "#fff",
    },
    addText: {
      color: "white",
      fontWeight: "bold",
    },
    actions: {
      flexDirection: "row",
      justifyContent: "space-around",
      marginVertical: 20,
      backgroundColor: colors.backgroundModal,
      borderRadius: 15,
    },

    transactionTitle: {
      color: colors.textPrimary,
      fontSize: 23,
      fontWeight: "500",
      marginBottom: 10,
    },
    transactionCard: {
      backgroundColor: colors.backgroundModal,
      borderRadius: 12,
      paddingHorizontal: 16,
    },
    transactionHeading: {
      flexDirection: "row",
      justifyContent: "space-between",
      paddingVertical: 15,
    },
    arrowStyles: {
      height: 28,
      width: 28,
    },
  });

export default HomeScreen;
