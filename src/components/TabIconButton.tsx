import React from "react";

import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";

type Props = {
  name: string;
  icon: any;
  isFocused: boolean;
  color: string;
  bg: string;
  onPress: () => void;
  colors: any;
};

const TabIconButton = ({
  name,
  icon,
  isFocused,
  color,
  bg,
  onPress,
  colors,
}: Props) => {
  return (
    <TouchableOpacity style={styles.tabWrapper} onPress={onPress}>
      <View style={[styles.tabItem, { backgroundColor: colors[bg] }]}>
        <Image
          source={icon}
          style={[styles.icon, { tintColor: colors[color] }]}
        />
      </View>
      <Text
        style={[
          styles.label,
          { color: isFocused ? colors[color] : colors.textPrimary },
        ]}
      >
        {name}
      </Text>
      <View
        style={[
          styles.dot,
          { backgroundColor: colors[color], opacity: isFocused ? 1 : 0 },
        ]}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  tabWrapper: {
    alignItems: "center",
    justifyContent: "center",
    width: 70,
  },
  tabItem: {
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: "center",
    justifyContent: "center",
  },
  label: {
    fontSize: 12,
    fontWeight: "500",
    marginTop: 4,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginTop: 2,
  },
  icon: {
    width: 24,
    height: 24,
    resizeMode: "contain",
  },
});

export default TabIconButton;
