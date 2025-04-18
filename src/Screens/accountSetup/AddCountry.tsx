import React, { useState } from "react";

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Pressable,
  Image,
} from "react-native";

import Button from "@/src/components/Button";
import countryNames from "@/src/utils/country-name";
import countryIcons from "@/src/Assets/icons/country-icons";
import icons from "@/src/Assets/icons";

import { useTheme } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import { useAppDispatch } from "@/src/redux/store";
import { updateUserForm } from "@/src/redux/slices/userFormSlice";

import { AddEmailProps } from "@/src/navigation/NavigationTypes";

/**
 * AddCountry Screen Component
 * Allows users to add their email to account setup
 */

const AddCountry = ({ navigation }: AddEmailProps) => {
  const { colors } = useTheme();
  const { t } = useTranslation();

  const [country, setCountry] = useState("IN");
  const [isKeyboardVisible] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  const dispatch = useAppDispatch();
  const styles = createStyles(colors);

  const addData = () => {
    dispatch(
      updateUserForm({
        country,
      })
    );
  };

  const handleSelectCountry = (code: string) => {
    setCountry(code);
    setShowDropdown(false);
  };

  return (
    <View style={styles.container}>
      <View style={{ paddingHorizontal: 14 }}>
        <Text style={styles.title}>{t("addCountry.countryOfResidence")}</Text>
        <Text style={styles.subtitle}>{t("addCountry.countrySubtitle")}</Text>
        {/* country Input */}
        <Text style={styles.label}>{t("addCountry.countryLabel")}</Text>
        {/* Country Selection */}
        <View style={{ position: "relative" }}>
          <TouchableOpacity
            style={styles.countryBox}
            onPress={() => setShowDropdown(!showDropdown)}
          >
            <View style={{ flexDirection: "row" }}>
              <Image
                source={countryIcons[country]}
                style={styles.countryIcon}
              />
              <Text style={styles.country}>{countryNames[country]}</Text>
            </View>
            <View>
              <Image
                source={showDropdown ? icons.angleUp : icons.angleDown}
                style={styles.iconStyle}
              />
            </View>
          </TouchableOpacity>

          {showDropdown && (
            <>
              <Pressable
                style={styles.overlay}
                onPress={() => setShowDropdown(false)}
              />
              <View style={styles.dropDownContainer}>
                <FlatList
                  data={Object.keys(countryNames)}
                  keyExtractor={(item) => item}
                  renderItem={({ item }) => (
                    <Pressable
                      style={styles.itemStyle}
                      onPress={() => {
                        handleSelectCountry(item);
                        setShowDropdown(false);
                      }}
                    >
                      <View style={styles.dropdownItemContainer}>
                        <View style={styles.cont}>
                          <Image
                            source={countryIcons[item]}
                            style={styles.countryIconStyle}
                          />
                          <Text style={styles.countryName}>
                            {countryNames[item]}
                          </Text>
                        </View>

                        {item === country && (
                          <Text style={styles.tickMark}>✓</Text>
                        )}
                      </View>
                    </Pressable>
                  )}
                />
              </View>
            </>
          )}
        </View>

        {/* button set to disabled when either password or phone number not given, button height adjusted based on keyboardvisibility */}
        <Button
          buttonText={t("addCountry.continue")}
          handleButton={() => {
            navigation.push("AddEmail");
            addData();
          }}
          outlined={false}
          disabled={false}
          buttonStyles={{ marginTop: isKeyboardVisible ? 180 : 420 }}
        />
      </View>
    </View>
  );
};

// handled styles to dynamically take color values from theme to remove the need to write inline style
const createStyles = (colors: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    title: {
      fontSize: 22,
      fontWeight: "bold",
      color: colors.textPrimary,
      marginTop: 30,
    },
    subtitle: {
      fontSize: 18,
      fontWeight: 400,
      color: colors.textTertiary,
      marginBottom: 20,
    },
    label: {
      fontSize: 16,
      fontWeight: "bold",
      color: colors.textPrimary,
      marginBottom: 10,
    },
    countryBox: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingHorizontal: 10,
      borderRadius: 8,
      marginBottom: 15,
      height: 50,
      borderWidth: 2,
      borderColor: colors.border,
    },
    country: {
      color: colors.textPrimary,
      fontSize: 16,
    },
    countryIcon: {
      width: 24,
      height: 16,
      marginRight: 10,
    },
    iconStyle: {
      width: 25,
      height: 25,
      marginRight: 10,
      tintColor: colors.border,
    },
    cont: {
      flexDirection: "row",
      alignItems: "center",
    },
    dropDownContainer: {
      position: "absolute",
      top: 60,
      left: 0,
      right: 0,
      backgroundColor: colors.backgroundModal,
      elevation: 10,
      borderRadius: 8,
      zIndex: 100,
      maxHeight: 250,
    },
    itemStyle: {
      paddingVertical: 10,
      paddingHorizontal: 12,
      flexDirection: "row",
      alignItems: "center",
    },
    dropdownItemContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      width: "100%",
    },
    tickMark: {
      fontSize: 16,
      color: colors.primary,
    },
    countryIconStyle: { width: 24, height: 16, marginRight: 10 },
    countryName: { color: colors.textPrimary, fontSize: 16 },
    overlay: {
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: "transparent",
      zIndex: 1,
    },
  });

export default AddCountry;
