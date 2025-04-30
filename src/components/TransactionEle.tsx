import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import ProfileIcon from "./ProfileIcon";
import icons from "../Assets/icons";
import { useTranslation } from "react-i18next";

export const TransactionEle = ({
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
  const { t } = useTranslation();
  const styles = createTransactionStyles(colors, color);
  return (
    <View
      style={[
        styles.transactionItem,
        {
          borderBottomWidth: label === t("home.savings") ? 0 : 1,
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
