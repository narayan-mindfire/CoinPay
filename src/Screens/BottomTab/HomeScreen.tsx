import React, { useState } from "react";

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
import icons from "@/src/Assets/icons";
import images from "@/src/Assets/images";
import ProfileIcon from "@/src/components/ProfileIcon";

import { useTheme } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import ActionButton from "@/src/components/ActionButton";
import SearchBar from "@/src/components/SearchBar";
import { useAppSelector } from "@/src/redux/store";
import AddMoneyModal from "@/src/components/AddMoneyModal";

const HomeScreen = ({ navigation }) => {
  const { colors } = useTheme();
  const { t } = useTranslation();

  const styles = createStyles(colors);
  const accBalance = useAppSelector((state) => state.auth.user.accBalance);
  const [showModal, setShowModal] = useState(false);

  return (
    <ScrollView style={styles.container}>
      <AddMoneyModal visible={showModal} onCancel={() => setShowModal(false)} />

      <ImageBackground
        source={images.bg}
        resizeMode="cover"
        style={styles.image}
      >
        <View style={styles.contentContainer}>
          <View style={styles.balanceSection}>
            <View style={styles.searchBarRow}>
              <Image source={icons.tropyhStar} tintColor={colors.white} />
              <SearchBar
                value={t("home.searchPlaceholder")}
                onChangeText={() => {}}
                width={240}
              />
              <Image source={icons.bell} tintColor={"#fff"} />
            </View>
            <Text style={styles.currency}>{t("home.currency")}</Text>
            <Text style={styles.amount}>₹{accBalance}</Text>
            <TouchableOpacity
              style={styles.addButton}
              onPress={() => setShowModal(true)}
            >
              <Text style={styles.addText}>{t("home.addMoney")}</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.actions}>
            <ActionButton
              label={t("home.send")}
              icon="sendMoney"
              colors={colors}
              tintColor="primary"
              goTo="ChooseRecepient"
              navigation={navigation}
            />
            <ActionButton
              label={t("home.request")}
              icon="getMoney"
              colors={colors}
              tintColor="warning"
              goTo="ReceiveQR"
              navigation={navigation}
            />
            <ActionButton
              label={t("home.bank")}
              icon="bank"
              colors={colors}
              tintColor="warning"
              goTo="ChooseRecepient"
              navigation={navigation}
            />
          </View>
          <View style={styles.transactionHeading}>
            <Text style={styles.transactionTitle}>{t("home.transaction")}</Text>
            <TouchableOpacity
              onPress={() => navigation.navigate("StatisticsTab")}
            >
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
              label={t("home.spending")}
              amount="-500"
              color="primary"
              backgroundColor="backgroundAccent"
              colors={colors}
              navigation={navigation}
              screen="Spending"
            />
            <TransactionItem
              icon="coins"
              label={t("home.income")}
              amount="3000"
              color="success"
              colors={colors}
              backgroundColor="backgroundSuccess"
              navigation={navigation}
              screen="Income"
            />
            <TransactionItem
              icon="invoice"
              label={t("home.bills")}
              amount="-800"
              color="error"
              colors={colors}
              backgroundColor="backgroundError"
              navigation={navigation}
              screen="Bills"
            />
            <TransactionItem
              icon="sack"
              label={t("home.savings")}
              amount="1000"
              color="warning"
              colors={colors}
              backgroundColor="backgroundWarning"
              navigation={navigation}
              screen="Savings"
            />
          </View>
        </View>
      </ImageBackground>
    </ScrollView>
  );
};

const TransactionItem = ({
  icon,
  label,
  amount,
  color,
  colors,
  backgroundColor,
  navigation,
  screen,
}: {
  icon: string;
  label: string;
  amount: string | number;
  color: string;
  colors: any;
  backgroundColor: string;
  navigation: any;
  screen: any;
}) => {
  const styles = createTransactionStyles(colors, color);
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
      <ProfileIcon
        icon={icons[icon]}
        tintColor={colors[color]}
        bgColor={colors[backgroundColor]}
        size={40}
      />

      <Text style={styles.transactionLabel}>{label}</Text>
      <TouchableOpacity
        onPress={() => navigation.navigate("StatisticsTab", { screen })}
      >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Text style={styles.amountStyles}>
            {amount.toString().startsWith("-") ? amount : `+${amount}`}
          </Text>
          <Image
            source={icons.angleRight}
            tintColor={colors.textPrimary}
            style={styles.angleIcon}
          />
        </View>
      </TouchableOpacity>
    </View>
  );
};

const createTransactionStyles = (colors: any, color: string) =>
  StyleSheet.create({
    transactionItem: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      borderBottomColor: colors.border,
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
    amountStyles: {
      color: colors[color],
    },
  });

const { height: screenHeight } = Dimensions.get("window");

const createStyles = (colors: any) =>
  StyleSheet.create({
    image: {
      height: screenHeight * 0.37,
    },
    container: {
      backgroundColor: colors.background,
      flex: 1,
      marginTop: 5,
    },
    contentContainer: {
      padding: 16,
    },
    searchBarRow: {
      width: "100%",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    balanceSection: {
      alignItems: "center",
      marginBottom: 30,
    },
    currency: {
      marginTop: 20,
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
      marginVertical: 10,
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
