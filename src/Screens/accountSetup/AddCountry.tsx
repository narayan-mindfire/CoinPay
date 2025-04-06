import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Keyboard,
  TouchableOpacity,
  FlatList,
  Pressable,
  Modal,
  Image,
} from "react-native";
import Button from "@/src/components/Button";
import { AddEmailProps } from "@/src/navigation/NavigationTypes";
import { useTheme } from "@react-navigation/native";
import countryNames from "@/src/utils/country-name";
import { Picker } from "@react-native-picker/picker";
import countryIcons from "@/src/Assets/icons/country-icons";
import icons from "@/src/Assets/icons";

/**
 * AddCountry Screen Component
 * Allows users to add their email to account setup
 */

const AddCountry = ({ navigation }: AddEmailProps) => {
  const { colors } = useTheme();
  const [country, setCountry] = useState("IN");
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const handleSelectCountry = (code: string) => {
    setCountry(code);
    setShowDropdown(false);
  };

  /**
   * Effect to listen for keyboard visibility changes.
   */
  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        setKeyboardVisible(true);
      }
    );

    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setKeyboardVisible(false);
      }
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  const styles = createStyles(colors);
  return (
    <View style={styles.container}>
      <View style={{ paddingHorizontal: 14 }}>
        <Text style={styles.title}>Country of residence</Text>
        <Text style={styles.subtitle}>
          this info needs to be accurate with your ID document.
        </Text>
        {/* country Input */}
        <Text style={styles.label}>Country</Text>
        {/* Country Selection */}
        {/* Custom Dropdown */}
        <View style={{ position: "relative" }}>
          <TouchableOpacity
            style={styles.countryBox}
            onPress={() => setShowDropdown(!showDropdown)}
          >
            <View style={{ flexDirection: "row" }}>
              <Image
                source={countryIcons[country]}
                style={{ width: 24, height: 16, marginRight: 10 }}
              />
              <Text style={{ color: colors.textPrimary, fontSize: 16 }}>
                {countryNames[country]}
              </Text>
            </View>
            <View>
              <Image source={icons.angleDown} style={styles.iconStyle} />
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
                        <View
                          style={{ flexDirection: "row", alignItems: "center" }}
                        >
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
          buttonText="Continue"
          handleButton={() => {
            navigation.push("AddEmail");
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
      // width: "100%%",
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

    iconStyle: {
      width: 25,
      height: 25,
      marginRight: 10,
      tintColor: colors.border,
    },
    dropDownContainer: {
      position: "absolute",
      top: 60,
      left: 0,
      right: 0,
      backgroundColor: colors.backgroundModal,
      // borderWidth: 1,
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
