import React from "react";
import { View, TextInput, StyleSheet, ViewStyle } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useTheme } from "@react-navigation/native";

interface SearchBarProps {
  placeholder?: string;
  value: string;
  onChangeText: (text: string) => void;
  width?: string | number;
}

const SearchBar = ({
  placeholder,
  value,
  onChangeText,
  width = "100%",
}: SearchBarProps) => {
  const { colors } = useTheme();
  const styles = createStyles(colors, width);

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

const createStyles = (colors: any, width: string | number) =>
  StyleSheet.create({
    container: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: "rgba(255, 255, 255, 0.5)",
      borderRadius: 20,
      paddingHorizontal: 12,
      paddingVertical: 10,
      borderWidth: 1,
      borderColor: colors.border,
      width: width as ViewStyle["width"],
    },
    input: {
      flex: 1,
      marginLeft: 8,
      fontSize: 14,
      color: colors.textPrimary,
    },
  });
