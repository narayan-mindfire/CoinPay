import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TextInput,
  Keyboard,
  TouchableOpacity,
  Modal,
} from "react-native";
import Button from "@/src/components/Button";
import { HomeAddressScreenProps } from "@/src/navigation/NavigationTypes";
import { useTheme } from "@react-navigation/native";
import icons from "@/src/Assets/icons";
import { Calendar } from "react-native-calendars";
import { useTranslation } from "react-i18next";

/**
 * PersonalInfo Screen Component
 * Allows users to add their name to account setup
 */

const PersonalInfo = ({ navigation }: HomeAddressScreenProps) => {
  const { colors } = useTheme();
  const [fullName, setFullName] = useState("");
  const [userName, setUserName] = useState("");
  const [dob, setDob] = useState("");
  const [showCalendar, setShowCalendar] = useState(false);
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const { t } = useTranslation();
  const formatDate = (dateString) => {
    const [year, month, day] = dateString.split("-");
    return `${month}-${day}-${year}`;
  };
  const handleDateSelect = (day) => {
    setDob(formatDate(day.dateString));
    setShowCalendar(false);
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
      <Modal visible={showCalendar} transparent animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.calendarWrapper}>
            <Calendar
              onDayPress={handleDateSelect}
              theme={{
                backgroundColor: colors.backgroundModal,
                calendarBackground: colors.backgroundModal,
                textSectionTitleColor: colors.textDisabled,
                selectedDayBackgroundColor: colors.primary,
                todayTextColor: colors.primary,
                dayTextColor: colors.textTertiary,
                arrowColor: colors.primary,
                monthTextColor: colors.textTertiary,
                textDayFontSize: 16,
                textMonthFontSize: 18,
                textDayHeaderFontSize: 14,
              }}
            />
            <Button
              buttonText={t("personalInfo.confirm")}
              handleButton={() => setShowCalendar(false)}
              outlined={false}
              disabled={false}
            />
          </View>
        </View>
      </Modal>
      <View style={{ paddingHorizontal: 14 }}>
        <Text style={styles.title}>{t("personalInfo.title")}</Text>
        <Text style={styles.subtitle}>{t("personalInfo.subtitle")}</Text>
        {/* Full Name Input */}
        <Text style={styles.label}>{t("personalInfo.fullName")}</Text>
        <View style={styles.emailContainer}>
          <View style={styles.inputWrapper}>
            {!fullName && (
              <Text style={styles.placeholderText}>
                {t("personalInfo.namePlaceholder")}
              </Text>
            )}
            <TextInput
              style={styles.emailInput}
              placeholder=""
              value={fullName}
              onChangeText={setFullName}
            />
          </View>
        </View>
        {/* username input  */}
        <Text style={styles.label}>{t("personalInfo.username")}</Text>
        <View style={styles.emailContainer}>
          <View style={styles.inputWrapper}>
            <Text
              style={[
                styles.placeholderText,
                {
                  color: userName ? colors.contentAccent : colors.textDisabled,
                },
              ]}
            >
              @
            </Text>
            {!userName && (
              <Text style={styles.placeholderText}>
                {" "}
                {"   "}
                {t("personalInfo.usernamePlaceholder")}
              </Text>
            )}
            <TextInput
              style={styles.usernameInput}
              placeholder=""
              value={userName}
              onChangeText={setUserName}
            />
          </View>
        </View>
        {/* Date of birth input  */}
        <Text style={styles.label}>{t("personalInfo.dob")}</Text>
        <TouchableOpacity onPress={() => setShowCalendar(true)}>
          <View style={styles.emailContainer}>
            <Image source={icons.calendar} style={styles.calendarIcon} />
            {!dob && (
              <Text style={styles.datePlaceholderText}>
                {t("personalInfo.dobPlaceholder")}
              </Text>
            )}
            <Text style={styles.emailInput}>{dob}</Text>
          </View>
        </TouchableOpacity>
      </View>

      {/* button set to disabled when either password or phone number not given, button height adjusted based on keyboardvisibility */}
      <Button
        buttonText={t("personalInfo.continue")}
        handleButton={() => {
          navigation.navigate("ScanId");
        }}
        outlined={false}
        disabled={fullName === "" || userName === ""}
        buttonStyles={{ marginTop: isKeyboardVisible ? 20 : 280 }}
      />
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
      marginVertical: 7,
    },
    emailContainer: {
      flexDirection: "row",
      alignItems: "center",
      borderWidth: 2,
      borderColor: colors.border,
      borderRadius: 8,
      paddingHorizontal: 10,
      height: 50,
    },

    inputWrapper: {
      flex: 1,
      position: "relative",
    },

    placeholderText: {
      position: "absolute",
      top: "20%",
      transform: [{ translateY: -8 }],
      fontSize: 18,
      color: colors.textDisabled,
    },
    datePlaceholderText: {
      position: "absolute",
      left: 5,
      paddingLeft: 38,
      top: "43%",
      transform: [{ translateY: -8 }],
      fontSize: 18,
      color: colors.textDisabled,
    },

    emailInput: {
      fontSize: 18,
      color: colors.textTertiary,
      width: "100%",
    },
    usernameInput: {
      fontSize: 18,
      color: colors.textTertiary,
      width: "100%",
      paddingLeft: 15,
    },

    modalContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    modalContent: {
      width: "80%",
      backgroundColor: colors.backgroundModal,
      borderRadius: 10,
      borderWidth: 3,
      borderColor: colors.border,
      padding: 20,
      maxHeight: 400,
    },
    modalItem: {
      flexDirection: "row",
      alignItems: "center",
      paddingVertical: 10,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    modalFlag: {
      width: 24,
      height: 16,
      marginRight: 10,
    },
    modalText: {
      fontSize: 16,
      color: colors.textPrimary,
    },
    progressContainer: {
      width: "100%",
      alignItems: "center",
      top: 50,
      marginBottom: 30,
    },
    calendarIcon: {
      width: 25,
      height: 25,
      marginRight: 10,
      tintColor: colors.border,
    },
    calendarWrapper: {
      width: "85%",
      backgroundColor: colors.backgroundModal,
      borderRadius: 10,
      padding: 20,
    },
  });

export default PersonalInfo;
