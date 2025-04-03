import { useTheme } from "@react-navigation/native";
import React, { useEffect, useRef } from "react";
import { View, Animated, StyleSheet } from "react-native";

// the progress bar for registration and account creation
const AnimatedProgressBar = ({ progress }: { progress: number }) => {
  const animatedValue = useRef(new Animated.Value(0)).current;
  const { colors } = useTheme();
  //animating the progressbar for smooth transitions
  useEffect(() => {
    animatedValue.stopAnimation();
    Animated.timing(animatedValue, {
      toValue: progress,
      duration: 200,
      useNativeDriver: false,
    }).start();
  }, [progress]);

  // interpolating value of animatedValue from 0-1 to 0-100 in percentage
  const progressWidth = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["0%", "100%"],
  });
  const styles = createStyles(colors, progressWidth);

  return (
    <View style={styles.container}>
      <Animated.View style={styles.progress} />
    </View>
  );
};

export default AnimatedProgressBar;

// using function to dynamically get theme colors from useTheme and width of the progress bar
const createStyles = (colors, progressWidth) =>
  StyleSheet.create({
    container: {
      width: "100%",
      height: 6,
      backgroundColor: colors.info,
      borderRadius: 3,
      overflow: "hidden",
      marginTop: 30,
    },
    progress: {
      height: "100%",
      backgroundColor: colors.primary,
      width: progressWidth,
    },
  });
