import React from "react";

import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  Switch,
  TouchableOpacity,
  Alert,
} from "react-native";

import icons from "@/src/Assets/icons";
import images from "@/src/Assets/images";
import Button from "@/src/components/Button";

import { RootState, useAppDispatch, useAppSelector } from "@/src/redux/store";
import { logoutUser } from "@/src/redux/slices/authSlice";
import { toggleTheme } from "@/src/redux/slices/themeSlice";

import { useTheme } from "@react-navigation/native";

import ProfileIcon from "@/src/components/ProfileIcon";
import LoaderModal from "@/src/components/LoaderModal";
import { useTranslation } from "react-i18next";
import ScreenHeader from "@/src/components/ScreenHeader";

const ProfileScreen = ({ navigation }) => {
  const { colors } = useTheme();
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const user = useAppSelector((state: RootState) => state.auth.user);
  const theme = useAppSelector((state: RootState) => state.theme.theme);
  const loading = useAppSelector((state: RootState) => state.auth.loading);

  const isDarkMode = theme === "dark";

  const styles = createStyles(colors);

  const toggleDarkMode = () => {
    dispatch(toggleTheme());
  };

  function handleLogout() {
    try {
      dispatch(logoutUser());
    } catch (error) {
      Alert.alert(`error logging out: ${error}`);
    }
  }

  const profileOptions = [
    {
      icon: icons.user,
      label: t("profile.personalInfo"),
      tintColor: "primary",
      bgColor: "backgroundAccent",
    },
    {
      icon: icons.bank,
      label: t("profile.bankCards"),
      tintColor: "warning",
      bgColor: "backgroundWarning",
      to: "CardList",
    },
    {
      icon: icons.transaction,
      label: t("profile.transaction"),
      tintColor: "error",
      bgColor: "backgroundError",
      to: "StatisticsTab",
    },
    {
      icon: icons.settings,
      label: t("profile.settings"),
      tintColor: "primary",
      bgColor: "backgroundAccent",
      to: "Settings",
    },
    {
      icon: icons.lock,
      label: t("profile.dataPrivacy"),
      tintColor: "success",
      bgColor: "backgroundSuccess",
      to: "DataPrivacy",
    },
  ];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <ScreenHeader title="My Profile" />
      <View style={styles.profileHeader}>
        <Image source={images.profile} style={styles.avatar} />
        <View style={styles.userInfo}>
          <Text style={styles.name}>
            {user?.name || t("profile.namePlaceholder")}
          </Text>
          <Text style={styles.email}>
            {user?.email || t("profile.emailPlaceholder")}
          </Text>
          <Text style={styles.phone}>
            {user?.phone || t("profile.phonePlaceholder")}
          </Text>
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
            <Text style={styles.settingLabel}>{t("profile.darkMode")}</Text>
          </View>
          <Switch
            value={isDarkMode}
            onValueChange={toggleDarkMode}
            trackColor={{ false: colors.border, true: colors.primary }}
            thumbColor={isDarkMode ? colors.primary : colors.textPrimary}
          />
        </View>

        {profileOptions.map((item, index) => {
          const isLastItem = index === profileOptions.length - 1;
          return (
            <View key={index}>
              <TouchableOpacity
                style={[
                  styles.settingRow,
                  { borderBottomWidth: isLastItem ? 0 : 1 },
                ]}
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
          );
        })}
      </View>

      <View style={styles.logoutContainer}>
        <Button handleButton={handleLogout} buttonText={t("profile.logout")} />
      </View>
      <LoaderModal visible={loading} />
    </ScrollView>
  );
};

const createStyles = (colors) =>
  StyleSheet.create({
    container: {
      backgroundColor: colors.background,
      flexGrow: 1,
    },
    profileHeader: {
      marginHorizontal: 16,
      backgroundColor: colors.backgroundModal,
      borderRadius: 12,
      alignItems: "center",
      position: "relative",
      marginBottom: 24,
      paddingVertical: 15,
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
      paddingHorizontal: 10,
      borderRadius: 12,
      marginBottom: 14,
      marginHorizontal: 16,
    },
    settingRow: {
      paddingVertical: 18,
      paddingHorizontal: 16,
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
