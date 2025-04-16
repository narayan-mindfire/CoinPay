import React from "react";
import { View, Text, Image } from "react-native";
import icons from "../Assets/icons";
import { useTheme } from "@react-navigation/native";

const MoneyBox = ({ color, title, icon, amount, bgColor }) => {
  const { colors } = useTheme();
  return (
    <View
      style={{
        backgroundColor: colors[bgColor],
        borderRadius: 12,
        paddingHorizontal: 26,
        paddingVertical: 16,
        justifyContent: "center",
        width: 165,
      }}
    >
      <View
        style={{ flexDirection: "row", alignItems: "center", marginBottom: 0 }}
      >
        <Image
          source={icons[icon]}
          style={{
            width: 18,
            height: 18,
            tintColor: color,
          }}
          resizeMode="contain"
          tintColor={color}
        />
        <Text style={{ color, fontSize: 14, marginLeft: 6, fontWeight: "400" }}>
          {title}
        </Text>
      </View>

      <Text style={{ color, fontSize: 26, fontWeight: "bold" }}>
        ${amount}.00
      </Text>
    </View>
  );
};

export default MoneyBox;
