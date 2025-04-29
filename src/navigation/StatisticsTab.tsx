import React from "react";

import { View, StyleSheet } from "react-native";

import {
  SpendingScreen,
  IncomeScreen,
  BillsScreen,
  SavingsScreen,
} from "@/src/Screens/StatisticsTab";
import icons from "../Assets/icons";
import TabIconButton from "../components/TabIconButton";

import { useTheme } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

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

        //handling button press -> navigates to corresponding screen if the tab is not focused already
        const onPress = () => {
          if (!isFocused) {
            navigation.navigate(route.name);
          }
        };

        return (
          <TabIconButton
            key={route.key}
            name={name}
            icon={icons[icon]}
            isFocused={isFocused}
            color={color}
            bg={bg}
            onPress={onPress}
            colors={colors}
          />
        );
      })}
    </View>
  );
};

const StatisticsTab = () => {
  return (
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
  );
};

export default StatisticsTab;

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
      top: "52%",
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
