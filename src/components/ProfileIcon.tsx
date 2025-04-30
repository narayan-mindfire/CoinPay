import React from "react";

import { View, Image, StyleSheet, ImageSourcePropType } from "react-native";

type RoundedIconProps = {
  icon: ImageSourcePropType;
  tintColor?: string;
  bgColor?: string;
  size?: number;
};

const ProfileIcon: React.FC<RoundedIconProps> = ({
  icon,
  tintColor = "#fff",
  bgColor = "#333",
  size = 40,
}) => {
  const styles = createStyles(bgColor, tintColor, size);
  return (
    <View style={styles.iconContainer}>
      <Image source={icon} style={styles.iconStyles} />
    </View>
  );
};

const createStyles = (bgColor: string, tintColor: string, size: number) =>
  StyleSheet.create({
    iconContainer: {
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: bgColor,
      width: size,
      height: size,
      borderRadius: size / 2,
    },
    iconStyles: {
      width: size * 0.5,
      height: size * 0.5,
      tintColor: tintColor,
      resizeMode: "contain",
    },
  });

export default ProfileIcon;
