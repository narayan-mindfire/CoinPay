import { useTheme } from "@react-navigation/native";
import React from "react";
import { View, Text, StyleSheet } from "react-native";

interface BarChartProps {
  data: number[];
  screen: "spending" | "income" | "bills" | "savings";
}

const screenColorMap = (
  screen: "spending" | "income" | "bills" | "savings"
) => {
  switch (screen) {
    case "spending":
      return "primary";
    case "income":
      return "success";
    case "bills":
      return "error";
    case "savings":
      return "warning";
    default:
      return "gray";
  }
};

const BarChart: React.FC<BarChartProps> = ({ data, screen }) => {
  // Find the maximum data value to normalize the bar heights
  const maxDataValue = Math.max(...data);
  const { colors } = useTheme();
  const styles = createStyles(colors);
  const maxBarHeight = 130;
  const barWidth = 35;
  const labels = ["2-8", "9-15", "16-22", "23-29", "30-1"];
  return (
    <View style={styles.container}>
      {data.map((value, index) => {
        const barHeight = (value / maxDataValue) * maxBarHeight;
        const barColor =
          colors[
            screenColorMap(
              screen as "spending" | "income" | "bills" | "savings"
            )
          ];
        return (
          <View key={index} style={styles.barContainer}>
            <Text style={styles.valueLabel}>${value}</Text>
            <View
              style={[
                styles.bar,
                {
                  height: barHeight,
                  backgroundColor:
                    index % 2 === 0 ? colors.secondary : barColor,
                  width: barWidth,
                },
              ]}
            />
            <Text style={styles.label}>{labels[index]}</Text>
          </View>
        );
      })}
    </View>
  );
};
const createStyles = (colors: any) =>
  StyleSheet.create({
    container: {
      flexDirection: "row",
      justifyContent: "space-around",
      alignItems: "flex-end",
      width: "90%",
      alignSelf: "center",
      marginTop: 20,
      padding: 10,
      backgroundColor: colors.backgroundModal,
      borderRadius: 20,
      borderBottomColor: colors.primary,
      borderBottomWidth: 2,
    },
    barContainer: {
      alignItems: "center",
      marginHorizontal: 5,
    },
    bar: {
      borderRadius: 5,
      marginBottom: 5,
      width: 30,
    },
    label: {
      fontSize: 12,
      color: colors.textPrimary,
    },
    valueLabel: {
      fontSize: 10,
      color: colors.textSecondary,
      marginBottom: 5,
      transform: [{ rotate: "-90deg" }],
    },
  });

export default BarChart;
