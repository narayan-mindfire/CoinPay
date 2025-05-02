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
import AddMoneyModal from "@/src/components/AddMoneyModal";
import SearchBar from "@/src/components/SearchBar";
import ActionButton from "@/src/components/ActionButton";

import { useTheme } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import { useAppSelector } from "@/src/redux/store";
import { TransactionEle } from "@/src/components/TransactionEle";

const { height: screenHeight } = Dimensions.get("window");

// this is the main landing page of app after user is authenticated
const HomeScreen = ({ navigation }) => {
  const { colors } = useTheme();
  const { t } = useTranslation();
  const accBalance = useAppSelector((state) => state.auth.user.accBalance);

  const [showModal, setShowModal] = useState(false);
  const [searchText, setSearchText] = useState("");

  const styles = createStyles(colors);

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
                placeholder={t("home.searchPlaceholder")}
                value={searchText}
                onChangeText={(text) => {
                  setSearchText(text);
                }}
                width={240}
              />
              <Image source={icons.bell} tintColor={colors.white} />
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
            <TransactionEle
              icon="creditCardMinus"
              label={t("home.spending")}
              amount="-500"
              color="primary"
              backgroundColor="backgroundAccent"
              colors={colors}
              navigation={navigation}
              screen="Spending"
            />
            <TransactionEle
              icon="coins"
              label={t("home.income")}
              amount="3000"
              color="success"
              colors={colors}
              backgroundColor="backgroundSuccess"
              navigation={navigation}
              screen="Income"
            />
            <TransactionEle
              icon="invoice"
              label={t("home.bills")}
              amount="-800"
              color="error"
              colors={colors}
              backgroundColor="backgroundError"
              navigation={navigation}
              screen="Bills"
            />
            <TransactionEle
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
