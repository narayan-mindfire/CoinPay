import React from "react";

import { Dimensions, StyleSheet, Text, View, Image } from "react-native";

import icons from "../Assets/icons";

import { useTheme } from "@react-navigation/native";

const { width } = Dimensions.get("window");

interface messageProps {
  message: string;
  type: "success" | "danger" | "warning" | "primary";
}

const Message = ({ message, type }: messageProps) => {
  const { colors } = useTheme();
  const styles = createStyles(colors);

  return (
    <View style={styles.container}>
      {/* Example icon usage */}
      <Image source={icons.check} style={styles.iconStyle} />
      <Text style={styles.messageText}>{message}</Text>
    </View>
  );
};

export default Message;

const createStyles = (colors: any) =>
  StyleSheet.create({
    container: {
      width: width * 0.9,
      height: 60,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "flex-start",
      padding: 16,
      borderRadius: 8,
      backgroundColor: colors.backgroundSuccess,
    },
    iconStyle: {
      width: 24,
      height: 24,
      borderRadius: 12,
      marginRight: 12,
      tintColor: "#fff",
      backgroundColor: colors.success,
    },
    messageText: {
      fontSize: 16,
      color: colors.success,
    },
  });
