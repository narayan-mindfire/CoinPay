import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";

// a custom button component that is used as a button to capture images
const CamClickButton = ({ navigation }) => {
  return (
    <TouchableOpacity onPress={() => navigation.push("SetupPin")}>
      <View style={styles.clickOuter}>
        <View style={styles.clickInner}></View>
      </View>
    </TouchableOpacity>
  );
};

export default CamClickButton;

const styles = StyleSheet.create({
  clickOuter: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "rgba(255, 255, 255, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  clickInner: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(255, 255, 255, 1)",
  },
});
