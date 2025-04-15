import { Dimensions, StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import { useTheme } from "@react-navigation/native";
import icons from "../Assets/icons";

const { width } = Dimensions.get("window");

interface messageProps {
  message: string;
  type: "success" | "danger" | "warning" | "primary";
}

const getTintColor = (type: messageProps["type"]) => {
  const tintColors: Record<messageProps["type"], string> = {
    success: "#4CAF50",
    danger: "#F44336",
    warning: "#FF9800",
    primary: "#2196F3",
  };
  return tintColors[type];
};

const Message = ({ message, type }: messageProps) => {
  const { colors } = useTheme();
  const tintColor = getTintColor(type);
  const styles = createStyles(colors, tintColor);

  return (
    <View style={styles.container}>
      {/* Example icon usage */}
      <Image source={icons.check} style={styles.iconStyle} />
      <Text style={styles.messageText}>{message}</Text>
    </View>
  );
};

export default Message;

const createStyles = (colors: any, tintColor: string) =>
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
