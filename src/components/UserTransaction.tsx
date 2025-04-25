import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { useTheme } from "@react-navigation/native";

const UserTransaction = ({
  name,
  email,
  amount,
  image,
  direction,
  handlePress,
}: {
  name: string;
  email: string;
  amount?: string;
  image: any;
  direction?: boolean;
  handlePress?: any;
}) => {
  const { colors } = useTheme();
  const styles = createStyles(colors, direction);

  return (
    <TouchableOpacity onPress={handlePress}>
      <View style={styles.container}>
        <Image source={image} style={styles.avatar} />
        <View style={styles.info}>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.email}>{email}</Text>
        </View>
        {amount && <Text style={styles.amount}>{amount}</Text>}
      </View>
    </TouchableOpacity>
  );
};

export default UserTransaction;

const createStyles = (colors: any, direction: boolean) =>
  StyleSheet.create({
    container: {
      flexDirection: "row",
      alignItems: "center",
      paddingVertical: 12,
    },
    avatar: {
      width: 40,
      height: 40,
      borderRadius: 20,
      marginRight: 12,
    },
    info: {
      flex: 1,
    },
    name: {
      fontSize: 16,
      fontWeight: "500",
      color: colors.textPrimary,
    },
    email: {
      fontSize: 13,
      color: colors.textSecondary,
    },
    amount: {
      fontSize: 15,
      fontWeight: "600",
      color: direction ? colors.success : colors.error,
    },
  });
