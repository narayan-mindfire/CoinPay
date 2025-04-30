import React from "react";

import {
  Image,
  ImageSourcePropType,
  View,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

import HomeScreen from "../Screens/BottomTab/HomeScreen";
import ProfileScreen from "../Screens/BottomTab/ProfileScreen";
import SupportScreen from "../Screens/BottomTab/SupportScreen";
import icons from "../Assets/icons";
import StatisticsTab from "./StatisticsTab";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { EventArg, useTheme } from "@react-navigation/native";

// bottom tab navigator for app home
const Tab = createBottomTabNavigator();

export default function BottomTab() {
  const { colors } = useTheme();
  const styles = createStyles(colors);

  return (
    <Tab.Navigator
      id={undefined}
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        tabBarButton: (props) => (
          <TouchableOpacity {...props} activeOpacity={1} />
        ),
        headerShown: false,
        tabBarShowLabel: false,
        animation: "shift",
        tabBarStyle: styles.tabBarStyle,
        tabBarIcon: ({ focused }) => {
          let iconSource: ImageSourcePropType;
          switch (route.name) {
            case "Home":
              iconSource = icons.home;
              break;
            case "StatisticsTab":
              iconSource = icons.chart;
              break;
            case "Scan":
              iconSource = icons.scanner;
              break;
            case "Support":
              iconSource = icons.chat;
              break;
            case "Profile":
              iconSource = icons.user;
              break;
          }

          const isScan = route.name === "Scan";

          return (
            <View
              style={[styles.iconContainer, isScan && styles.scanIconContainer]}
            >
              <Image
                source={iconSource}
                resizeMode="contain"
                style={[
                  styles.iconImage,
                  {
                    tintColor: isScan
                      ? colors.white
                      : focused
                      ? colors.primary
                      : colors.textPrimary,
                  },
                ]}
              />
              <View
                style={[
                  styles.iconIndicator,
                  { backgroundColor: focused ? colors.primary : "transparent" },
                ]}
              />
            </View>
          );
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="StatisticsTab" component={StatisticsTab} />
      <Tab.Screen
        name="Scan"
        component={View}
        listeners={({ navigation }) => ({
          tabPress: (e: EventArg<"tabPress", true, undefined>) => {
            e.preventDefault();
            console.log("Navigating to ScanSend");
            navigation.getParent()?.navigate("ScanSend");
          },
        })}
      />
      <Tab.Screen name="Support" component={SupportScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

function createStyles(colors: any) {
  return StyleSheet.create({
    tabBarStyle: {
      backgroundColor: colors.backgroundModal,
      height: 70,
      width: "90%",
      marginBottom: 20,
      borderTopWidth: 0,
      position: "absolute",
      borderRadius: 10,
      marginLeft: "5%",
      marginRight: "5%",
      paddingTop: 16,
    },
    iconContainer: {
      alignItems: "center",
      justifyContent: "center",
      height: 50,
      width: 50,
      padding: 15,
      paddingTop: 20,
      paddingHorizontal: 30,
      borderRadius: 15,
    },
    scanIconContainer: {
      backgroundColor: colors.primary,
      padding: 30,
      paddingTop: 40,
      paddingHorizontal: 40,
    },
    iconImage: {
      width: 26,
      height: 26,
    },
    iconIndicator: {
      height: 8,
      width: 8,
      borderRadius: 4,
      marginTop: 4,
    },
  });
}
