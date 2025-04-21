import React from "react";
import { View, TextInput, StyleSheet } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useTheme } from "@react-navigation/native";

const SearchBar = ({
  placeholder,
  value,
  onChangeText,
}: {
  placeholder?: string;
  value: string;
  onChangeText: (text: string) => void;
}) => {
  const { colors } = useTheme();
  const styles = createStyles(colors);

  return (
    <View style={styles.container}>
      <Feather name="search" size={18} color={colors.textSecondary} />
      <TextInput
        placeholder={placeholder || "Search"}
        placeholderTextColor={colors.textSecondary}
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
      />
    </View>
  );
};

export default SearchBar;

const createStyles = (colors: any) =>
  StyleSheet.create({
    container: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: colors.card,
      borderRadius: 12,
      paddingHorizontal: 12,
      paddingVertical: 10,
    },
    input: {
      flex: 1,
      marginLeft: 8,
      fontSize: 14,
      color: colors.textPrimary,
    },
  });
