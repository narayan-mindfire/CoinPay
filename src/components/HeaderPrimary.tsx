import React from "react";

import { View, StyleSheet, Image, TouchableOpacity } from "react-native";

import { useTheme, useNavigation, useRoute } from "@react-navigation/native";

import icons from "../Assets/icons";

export const HeaderPrimary = () => {
  const { colors } = useTheme();
  const navigation = useNavigation<any>();
  const route = useRoute();
  const styles = createStyles(colors);

  if (route.name === "BottomTab") {
    return null;
  }

  return (
    <View style={styles.wrapper}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.backButton}
      >
        <Image
          source={icons.angleLeft}
          style={{ tintColor: colors.textPrimary }}
        />
      </TouchableOpacity>
    </View>
  );
};

const createStyles = (colors: any) =>
  StyleSheet.create({
    wrapper: {
      backgroundColor: colors.background,
      height: 25,
    },
    backButton: {
      marginLeft: 16,
    },
  });
