import React from "react";
import { View, Image, StyleSheet, ImageSourcePropType } from "react-native";

type RoundedIconProps = {
  icon: ImageSourcePropType;
  tintColor?: string;
  bgColor?: string;
  size?: number;
};

const RoundedIcon: React.FC<RoundedIconProps> = ({
  icon,
  tintColor = "#fff",
  bgColor = "#333",
  size = 40,
}) => {
  return (
    <View
      style={[
        styles.iconContainer,
        {
          backgroundColor: bgColor,
          width: size,
          height: size,
          borderRadius: size / 2,
        },
      ]}
    >
      <Image
        source={icon}
        style={{
          width: size * 0.5,
          height: size * 0.5,
          tintColor: tintColor,
          resizeMode: "contain",
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  iconContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
});

export default RoundedIcon;
