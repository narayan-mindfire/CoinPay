import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";

import { useTranslation } from "react-i18next";
import { setLanguage } from "@/src/redux/slices/languageSlice";
import { useAppDispatch, useAppSelector } from "@/src/redux/store";
import { useTheme } from "@react-navigation/native";

const languages = [
  { code: "en", label: "English" },
  { code: "hi", label: "हिन्दी" },
  { code: "od", label: "ଓଡ଼ିଆ" },
];

const Settings = () => {
  const { colors } = useTheme();
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const selectedLanguage = useAppSelector((state) => state.language.language);

  const styles = createStyles(colors);

  const handleLanguageChange = (lang: "en" | "hi" | "od") => {
    dispatch(setLanguage(lang));
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.headerText}>{t("profile.settings")}</Text>
      <View style={styles.languageSection}>
        <Text style={styles.subHeaderText}>{t("profile.language")}</Text>

        {languages.map((lang) => {
          const isSelected = selectedLanguage === lang.code;
          return (
            <TouchableOpacity
              key={lang.code}
              onPress={() => handleLanguageChange(lang.code as any)}
              style={styles.languageRow}
            >
              <View style={styles.radioCircle}>
                {isSelected && <View style={styles.selectedDot} />}
              </View>
              <Text style={styles.languageLabel}>{lang.label}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </ScrollView>
  );
};

export default Settings;

const createStyles = (colors) =>
  StyleSheet.create({
    container: {
      padding: 16,
      backgroundColor: colors.background,
      flexGrow: 1,
    },
    headerText: {
      fontSize: 24,
      fontWeight: "bold",
      color: colors.textPrimary,
      marginBottom: 20,
    },
    languageSection: {
      backgroundColor: colors.backgroundModal,
      padding: 16,
      borderRadius: 12,
    },
    subHeaderText: {
      fontSize: 18,
      fontWeight: "600",
      marginBottom: 12,
      color: colors.textPrimary,
    },
    languageRow: {
      flexDirection: "row",
      alignItems: "center",
      paddingVertical: 12,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    radioCircle: {
      height: 20,
      width: 20,
      borderRadius: 10,
      borderWidth: 2,
      borderColor: colors.primary,
      alignItems: "center",
      justifyContent: "center",
      marginRight: 12,
    },
    selectedDot: {
      height: 10,
      width: 10,
      borderRadius: 5,
      backgroundColor: colors.primary,
    },
    languageLabel: {
      fontSize: 16,
      color: colors.textPrimary,
    },
  });
