import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { View, Image, TouchableOpacity, Text, StyleSheet } from "react-native";
import icons from "../Assets/icons";
import SpendingScreen from "../Screens/StatisticsTab/Spending";
import IncomeScreen from "../Screens/StatisticsTab/Income";
import BillsScreen from "../Screens/StatisticsTab/Bills";
import SavingsScreen from "../Screens/StatisticsTab/Savings";
import { useTheme } from "@react-navigation/native";

const Tab = createBottomTabNavigator();

const tabItems = [
  {
    name: "Spending",
    icon: "creditCardMinus",
    color: "primary",
    bg: "backgroundAccent",
  },
  {
    name: "Income",
    icon: "coins",
    color: "success",
    bg: "backgroundSuccess",
  },
  {
    name: "Bills",
    icon: "invoice",
    color: "error",
    bg: "backgroundError",
  },
  {
    name: "Savings",
    icon: "sack",
    color: "warning",
    bg: "backgroundWarning",
  },
];

const CustomTabBar = ({ state, navigation }: any) => {
  const { colors } = useTheme();
  const styles = createStyles(colors);

  return (
    <View style={styles.tabBar}>
      {state.routes.map((route: any, index: number) => {
        const isFocused = state.index === index;
        const { name, icon, color, bg } = tabItems[index];

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });
          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        return (
          <TouchableOpacity
            key={route.key}
            style={styles.tabWrapper}
            onPress={onPress}
          >
            <View
              style={[
                styles.tabItem,
                {
                  backgroundColor: colors[bg],
                },
              ]}
            >
              <Image
                source={icons[icon]}
                style={{ tintColor: colors[color] }}
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
            {isFocused && (
              <View style={[styles.dot, { backgroundColor: colors[color] }]} />
            )}
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const StatisticsTab = () => {
  const { colors } = useTheme();
  return (
    <View style={{ flex: 1 }}>
      <Tab.Navigator
        id={undefined}
        screenOptions={{
          tabBarStyle: { display: "none" },
          headerShown: false,
        }}
        initialRouteName="Spending"
        tabBar={(props) => <CustomTabBar {...props} />}
      >
        <Tab.Screen name="Spending" component={SpendingScreen} />
        <Tab.Screen name="Income" component={IncomeScreen} />
        <Tab.Screen name="Bills" component={BillsScreen} />
        <Tab.Screen name="Savings" component={SavingsScreen} />
      </Tab.Navigator>
    </View>
  );
};

export default StatisticsTab;

// handled styles to dynamically take color values from theme to remove the need to write inline style
const createStyles = (colors: any) =>
  StyleSheet.create({
    tabBar: {
      position: "absolute",
      width: "90%",
      alignSelf: "center",
      flexDirection: "row",
      justifyContent: "space-around",
      backgroundColor: colors.backgroundModal,
      borderRadius: 16,
      paddingVertical: 12,
      marginHorizontal: 10,
      shadowColor: "#000",
      shadowOpacity: 0.05,
      shadowRadius: 8,
      shadowOffset: { width: 0, height: 2 },
      elevation: 3,
      top: "48%",
    },
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
      color: colors.textPrimary,
      marginTop: 4,
    },
    dot: {
      width: 6,
      height: 6,
      borderRadius: 3,
      marginTop: 2,
    },
  });
