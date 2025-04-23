import React from "react";

import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  Switch,
  TouchableOpacity,
} from "react-native";

import icons from "@/src/Assets/icons";
import images from "@/src/Assets/images";
import Button from "@/src/components/Button";

import { RootState, useAppDispatch, useAppSelector } from "@/src/redux/store";
import { logoutUser } from "@/src/redux/slices/authSlice";
import { toggleTheme } from "@/src/redux/slices/themeSlice";

import { TabActions, useTheme } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import ProfileIcon from "@/src/components/ProfileIcon";
import LoaderModal from "@/src/components/LoaderModal";

const ProfileScreen = ({ navigation }) => {
  const { colors } = useTheme();
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);
  const theme = useAppSelector((state) => state.theme.theme);

  const loading = useAppSelector((state: RootState) => state.auth.loading);

  const isDarkMode = theme === "dark";

  const styles = createStyles(colors);

  const toggleDarkMode = () => {
    dispatch(toggleTheme());
  };

  function handleLogout() {
    try {
      console.log("logging out user");
      dispatch(logoutUser());
    } catch (error) {
      console.log("error logging out: ", error);
    }
  }

  const profileOptions = [
    {
      icon: icons.user,
      label: "Personal Info",
      tintColor: "primary",
      bgColor: "backgroundAccent",
      // to: "ProfileScreen",
    },
    {
      icon: icons.bank,
      label: "Bank & Cards",
      tintColor: "warning",
      bgColor: "backgroundWarning",
      to: "CardList",
    },
    {
      icon: icons.transaction,
      label: "Transaction",
      tintColor: "error",
      bgColor: "backgroundError",
      to: "StatisticsTab",
    },
    {
      icon: icons.settings,
      label: "Settings",
      tintColor: "primary",
      bgColor: "backgroundAccent",
      to: "Settings",
    },
    {
      icon: icons.lock,
      label: "Data Privacy",
      tintColor: "success",
      bgColor: "backgroundSuccess",
      to: "DataPrivacy",
    },
  ];

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.profileHeader}>
          <Image source={images.profile} style={styles.avatar} />
          <View style={styles.userInfo}>
            <Text style={styles.name}>{user?.name || "Your Name"}</Text>
            <Text style={styles.email}>{user?.email || "your@email.com"}</Text>
            <Text style={styles.phone}>{user?.phone || "+91xxxxxxxxxx"}</Text>
          </View>
          <TouchableOpacity style={styles.editIcon}>
            <Image source={icons.edit} style={styles.iconSmall} />
          </TouchableOpacity>
        </View>

        <View style={styles.profileItems}>
          <View style={styles.settingRow}>
            <View style={styles.settingLeft}>
              <View style={styles.moonContainer}>
                <Image source={icons.moon} style={styles.iconMoon} />
              </View>
              <Text style={styles.settingLabel}>Dark Mode</Text>
            </View>
            <Switch
              value={isDarkMode}
              onValueChange={toggleDarkMode}
              trackColor={{ false: colors.border, true: colors.primary }}
              thumbColor={isDarkMode ? colors.primary : colors.textPrimary}
            />
          </View>

          {profileOptions.map((item, index) => (
            <View key={index}>
              <TouchableOpacity
                style={styles.settingRow}
                onPress={() => {
                  if (item.to) navigation.navigate(item.to);
                }}
              >
                <View style={styles.settingLeft}>
                  <ProfileIcon
                    icon={item.icon}
                    tintColor={colors[item.tintColor]}
                    bgColor={colors[item.bgColor]}
                  />
                  <Text style={styles.settingLabel}>{item.label}</Text>
                </View>
                <Image source={icons.angleRight} style={styles.iconSmall} />
              </TouchableOpacity>
            </View>
          ))}
        </View>

        <View style={styles.logoutContainer}>
          <Button handleButton={handleLogout} buttonText="Log Out" />
        </View>
        <LoaderModal visible={loading} />
      </ScrollView>
    </SafeAreaView>
  );
};

const createStyles = (colors) =>
  StyleSheet.create({
    container: {
      paddingHorizontal: 16,
      backgroundColor: colors.background,
      flexGrow: 1,
    },
    profileHeader: {
      backgroundColor: colors.backgroundModal,
      borderRadius: 12,
      alignItems: "center",
      position: "relative",
      marginBottom: 24,
      paddingVertical: 5,
    },
    avatar: {
      height: 64,
      width: 64,
      borderRadius: 32,
      marginBottom: 8,
    },
    userInfo: {
      alignItems: "center",
    },
    name: {
      color: colors.textPrimary,
      fontSize: 18,
      fontWeight: "bold",
    },
    email: {
      color: colors.textSecondary,
      fontSize: 14,
      marginTop: 4,
    },
    phone: {
      color: colors.textSecondary,
      fontSize: 14,
    },
    editIcon: {
      position: "absolute",
      top: 10,
      right: 10,
    },
    iconSmall: {
      width: 20,
      height: 20,
      tintColor: colors.textPrimary,
    },
    iconMoon: {
      width: 20,
      height: 20,
      tintColor: colors.textPrimary,
    },
    moonContainer: {
      padding: 10,
      borderRadius: 20,
      backgroundColor: colors.textDisabled,
    },
    profileItems: {
      backgroundColor: colors.backgroundModal,
      padding: 8,
      borderRadius: 12,
      marginBottom: 14,
    },
    settingRow: {
      paddingVertical: 18,
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    settingLeft: {
      flexDirection: "row",
      alignItems: "center",
    },
    settingLabel: {
      color: colors.textPrimary,
      fontSize: 16,
      marginLeft: 12,
    },
    logoutContainer: {
      marginTop: 10,
      marginBottom: 90,
      alignItems: "center",
    },
  });

export default ProfileScreen;
