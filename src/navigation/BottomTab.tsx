import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { EventArg, useTheme } from "@react-navigation/native";
import { Image, ImageSourcePropType, View, Pressable } from "react-native";
import HomeScreen from "../Screens/BottomTab/HomeScreen";
import ProfileScreen from "../Screens/BottomTab/ProfileScreen";
import SupportScreen from "../Screens/BottomTab/SupportScreen";
import icons from "../Assets/icons";
import StatisticsTab from "./StatisticsTab";

const Tab = createBottomTabNavigator();

export default function BottomTab() {
  const { colors, dark } = useTheme();
  return (
    <Tab.Navigator
      id={undefined}
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        tabBarButton: (props) => (
          <Pressable {...props} android_ripple={{ color: "transparent" }} />
        ),
        headerShown: false,
        tabBarShowLabel: false,
        animation: "shift",
        headerpressopacity: "0",
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

          return (
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                height: 50,
                width: 50,
                backgroundColor:
                  route.name === "Scan" ? colors.primary : "transparent",
                padding: route.name === "Scan" ? 30 : 15,
                paddingTop: route.name === "Scan" ? 40 : 20,
                paddingHorizontal: route.name === "Scan" ? 40 : 30,
                borderRadius: 15,
              }}
            >
              <Image
                source={iconSource}
                resizeMode="contain"
                style={{
                  width: 26,
                  height: 26,
                  tintColor:
                    route.name === "Scan"
                      ? colors.white
                      : focused
                      ? colors.primary
                      : colors.textPrimary,
                }}
              />
              <View
                style={{
                  height: 8,
                  width: 8,
                  backgroundColor: focused ? colors.primary : "transparent",
                  borderRadius: 4,
                  marginTop: 4,
                }}
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
        component={View} //placeholder component
        //will be navigated to QR code scanner
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
