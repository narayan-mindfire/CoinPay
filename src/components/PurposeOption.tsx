import React from "react";

import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

import { useTheme } from "@react-navigation/native";
import ProfileIcon from "@/src/components/ProfileIcon";

// component showing the purposes to select from before making a transaction
const PurposeOption = ({ item, isSelected, onSelect }) => {
  const { colors } = useTheme();
  const styles = createStyles(colors);

  return (
    <TouchableOpacity
      onPress={onSelect}
      style={[
        styles.optionContainer,
        {
          borderBottomColor: isSelected ? colors.primary : colors.border,
          backgroundColor: colors.backgroundModal,
        },
      ]}
    >
      <ProfileIcon
        icon={item.icon}
        tintColor={colors[item.tintColor]}
        bgColor={colors[item.bgColor]}
      />
      <View style={styles.textContainer}>
        <Text style={styles.optionTitle}>{item.title}</Text>
        <Text style={styles.optionSubtitle}>{item.description}</Text>
      </View>
      <View
        style={[
          styles.radioOuter,
          { borderColor: isSelected ? colors.primary : colors.background },
        ]}
      >
        {isSelected && (
          <View
            style={[styles.radioInner, { backgroundColor: colors.primary }]}
          />
        )}
      </View>
    </TouchableOpacity>
  );
};

export default PurposeOption;

const createStyles = (colors) =>
  StyleSheet.create({
    optionContainer: {
      flexDirection: "row",
      alignItems: "center",
      borderBottomWidth: 2,
      borderRadius: 14,
      padding: 14,
      marginBottom: 14,
    },
    textContainer: {
      flex: 1,
      marginLeft: 12,
    },
    optionTitle: {
      fontSize: 16,
      fontWeight: "600",
      color: colors.textPrimary,
    },
    optionSubtitle: {
      fontSize: 13,
      color: colors.textSecondary,
      marginTop: 2,
    },
    radioOuter: {
      width: 20,
      height: 20,
      borderWidth: 2,
      borderRadius: 10,
      justifyContent: "center",
      alignItems: "center",
    },
    radioInner: {
      width: 10,
      height: 10,
      borderRadius: 5,
    },
  });
