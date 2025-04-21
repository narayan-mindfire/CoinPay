import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Keyboard,
  TouchableOpacity,
  Modal,
} from "react-native";

import Button from "@/src/components/Button";
import icons from "@/src/Assets/icons";

import { updateUserForm } from "@/src/redux/slices/userFormSlice";
import { HomeAddressScreenProps } from "@/src/navigation/NavigationTypes";
import { useAppDispatch } from "@/src/redux/store";
import {
  validateFullName,
  validateUserName,
} from "@/src/utils/formFieldValidators";

import { useTheme } from "@react-navigation/native";
import { Calendar } from "react-native-calendars";
import { useTranslation } from "react-i18next";
import CustomTextField from "@/src/components/CustomTextField";

const PersonalInfo = ({ navigation }: HomeAddressScreenProps) => {
  const { t } = useTranslation();
  const { colors } = useTheme();
  const dispatch = useAppDispatch();

  const [fullName, setFullName] = useState("");
  const [userName, setUserName] = useState("");
  const [dob, setDob] = useState("");
  const [showCalendar, setShowCalendar] = useState(false);
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  const formatDate = (dateString: string) => {
    const [year, month, day] = dateString.split("-");
    return `${month}/${day}/${year}`;
  };

  const handleDateSelect = (day: any) => {
    setDob(formatDate(day.dateString));
    setShowCalendar(false);
  };

  const fullNameError = validateFullName(fullName);
  const userNameError = validateUserName(userName);

  const styles = createStyles(
    colors,
    fullNameError,
    userNameError,
    dob,
    isKeyboardVisible
  );

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => setKeyboardVisible(true)
    );
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => setKeyboardVisible(false)
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  const addData = () => {
    dispatch(
      updateUserForm({
        name: fullName,
        username: userName,
        DOB: dob,
      })
    );
  };

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

      <View style={styles.formContainer}>
        <Text style={styles.title}>{t("personalInfo.title")}</Text>
        <Text style={styles.subtitle}>{t("personalInfo.subtitle")}</Text>

        <Text style={styles.label}>{t("personalInfo.fullName")}</Text>
        <CustomTextField
          value={fullName}
          onChangeText={setFullName}
          placeholder={t("personalInfo.namePlaceholder")}
          error={fullNameError}
          touched={true}
        />

        <Text style={styles.label}>{t("personalInfo.username")}</Text>
        <CustomTextField
          value={userName}
          onChangeText={setUserName}
          placeholder={t("personalInfo.usernamePlaceholder")}
          // iconLeft={{ uri: "at-sign" }}
          error={userNameError}
          touched={true}
        />

        <Text style={styles.label}>{t("personalInfo.dob")}</Text>
        <TouchableOpacity onPress={() => setShowCalendar(true)}>
          <View style={styles.dobContainer}>
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

      <Button
        buttonText={t("personalInfo.continue")}
        handleButton={() => {
          addData();
          navigation.navigate("ScanId");
        }}
        outlined={false}
        disabled={!!fullNameError || !!userNameError || dob === ""}
        buttonStyles={styles.continueButton}
      />
    </View>
  );
};

const createStyles = (
  colors: any,
  fullNameError: string,
  userNameError: string,
  dob: string,
  isKeyboardVisible: boolean
) =>
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
      fontWeight: "400",
      color: colors.textTertiary,
      marginBottom: 20,
    },
    label: {
      fontSize: 16,
      fontWeight: "bold",
      color: colors.textPrimary,
      marginVertical: 7,
    },
    nameContainer: {
      flexDirection: "row",
      alignItems: "center",
      borderWidth: 2,
      borderRadius: 8,
      paddingHorizontal: 10,
      height: 50,
      borderColor: fullNameError ? colors.error : colors.primary,
    },
    usernameContainer: {
      flexDirection: "row",
      alignItems: "center",
      borderWidth: 2,
      borderRadius: 8,
      paddingHorizontal: 10,
      height: 50,
      borderColor: userNameError ? colors.error : colors.primary,
    },
    dobContainer: {
      flexDirection: "row",
      alignItems: "center",
      borderWidth: 2,
      borderRadius: 8,
      paddingHorizontal: 10,
      height: 50,
      borderColor: dob === "" ? colors.border : colors.primary,
    },
    formContainer: {
      paddingHorizontal: 14,
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
    usernamePrefix: {
      position: "absolute",
      top: "20%",
      left: 0,
      fontSize: 18,
      color: colors.contentAccent,
    },
    usernamePlaceholder: {
      position: "absolute",
      top: "20%",
      left: 20,
      fontSize: 18,
      color: colors.textDisabled,
    },
    datePlaceholderText: {
      position: "absolute",
      left: 38,
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
      paddingLeft: 20,
    },
    errorText: {
      color: colors.error,
      fontSize: 12,
    },
    modalContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    calendarWrapper: {
      width: "85%",
      backgroundColor: colors.backgroundModal,
      borderRadius: 10,
      padding: 20,
    },
    calendarIcon: {
      width: 25,
      height: 25,
      marginRight: 10,
      tintColor: colors.border,
    },
    continueButton: {
      marginTop: isKeyboardVisible ? 20 : 280,
    },
  });

export default PersonalInfo;
