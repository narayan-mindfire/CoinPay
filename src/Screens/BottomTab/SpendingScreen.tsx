import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  Touchable,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { useTheme } from "@react-navigation/native";
import icons from "@/src/Assets/icons";

const BalanceBox = ({
  icon,
  text,
  amount,
  theme,
  bg,
  colors,
}: {
  icon: string;
  text: string;
  amount: string;
  bg: string;
  theme: "dark" | "light";
  colors: any;
}) => {
  const styles = createBalanceBoxStyles(colors);
  return (
    <View style={[styles.boxContainer, { backgroundColor: colors.primary }]}>
      <View style={styles.labelContainer}>
        <Image
          source={icons[icon]}
          tintColor={theme === "dark" ? "black" : "white"}
          style={styles.iconStyle}
        />
        <Text style={styles.labelStyle}>{text}</Text>
      </View>
      <Text style={styles.amountStyle}>{amount}</Text>
    </View>
  );
};
const SpendingScreen = () => {
  const { colors } = useTheme();
  const styles = createStyles(colors);
  const [curData, setCurData] = useState("spending");
  const [month, setMonth] = useState("January");
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.curDataLabel}>{curData}</Text>
        <View style={styles.monthBox}>
          <Text style={styles.monthLabel}>{month}</Text>
          <TouchableOpacity>
            <Image source={icons.angleDown} tintColor={colors.border} />
          </TouchableOpacity>
        </View>
        <View style={styles.balanceContainer}>
          <BalanceBox
            icon="this"
            text="hello"
            amount="33"
            theme="dark"
            bg="primary"
            colors
          />
          <BalanceBox
            icon="this"
            text="hello"
            amount="33"
            theme="dark"
            bg="secondary"
            colors
          />
        </View>
      </View>
    </View>
  );
};
export default SpendingScreen;

const createBalanceBoxStyles = (colors: any) =>
  StyleSheet.create({
    boxContainer: {
      height: 150,
      width: 200,
      backgroundColor: "yellow",
    },
    labelContainer: {},
    iconStyle: {},
    labelStyle: { color: colors.textPrimary },
    amountStyle: { color: colors.textPrimary },
  });
const createStyles = (colors: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
      marginLeft: "5%",
      marginRight: "5%",
    },
    curDataLabel: {
      color: colors.textPrimary,
      fontSize: 24,
      fontWeight: 600,
      textAlign: "center",
      marginBottom: 20,
    },
    monthBox: {
      backgroundColor: colors.backgroundModal,
      height: 50,
      width: 120,
      borderRadius: 15,
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingHorizontal: 16,
      alignSelf: "flex-start",
    },
    monthLabel: {
      color: colors.textSecondary,
      fontSize: 18,
      fontWeight: 600,
    },
    balanceContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
    },
  });
