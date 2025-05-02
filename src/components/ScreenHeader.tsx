import React from "react";

import { StyleSheet, Text, TouchableOpacity, View, Image } from "react-native";

import icons from "../Assets/icons";
import { useTheme } from "@react-navigation/native";
import { goBack } from "../navigation/navigationRef";

interface ScreenHeaderProps {
  title: string | null;
}

// this component is used for the headers of primary stack screens
const ScreenHeader = ({ title }: ScreenHeaderProps) => {
  const { colors } = useTheme();
  const styles = createStyles(colors);

  return (
    <View style={styles.title}>
      <View style={{ flex: 1, alignItems: "flex-start" }}>
        <TouchableOpacity onPress={goBack}>
          <Image source={icons.angleLeft} tintColor={colors.textPrimary} />
        </TouchableOpacity>
      </View>
      <View style={{ flex: 1, alignItems: "center" }}>
        <Text style={styles.titleLabel}>{title}</Text>
      </View>
      <View style={{ flex: 1, alignItems: "flex-end" }} />
    </View>
  );
};

export default ScreenHeader;

const createStyles = (colors: any) =>
  StyleSheet.create({
    title: {
      flexDirection: "row",
      backgroundColor: colors.background,
      alignItems: "center",
      marginBottom: 20,
      paddingLeft: 15,
      paddingRight: 15,
      justifyContent: "space-between",
    },
    titleLabel: {
      fontSize: 24,
      fontWeight: "400",
      color: colors.textPrimary,
      textAlign: "center",
    },
  });
