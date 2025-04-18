import React from "react";

import {
  View,
  Text,
  Modal,
  Image,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

import Button from "@/src/components/Button";
import icons from "@/src/Assets/icons";
import images from "../Assets/images";

import { useTheme } from "@react-navigation/native";
import { t } from "i18next";

interface PhoneVerificationModalProps {
  visible: boolean;
  phoneNumber: string;
  countryCode: string;
  onConfirm: () => void;
  onCancel: () => void;
  t: object;
}

// verification modal that appears on screen to ask if the user's provided phone number is accurate and if they should move forward
const PhoneVerificationModal: React.FC<PhoneVerificationModalProps> = ({
  visible,
  phoneNumber,
  countryCode,
  onConfirm,
  onCancel,
}) => {
  const { colors, dark } = useTheme();
  const styles = createStyles(colors);

  return (
    <Modal transparent visible={visible} animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <TouchableOpacity onPress={onCancel} style={styles.closeButton}>
            <Image source={icons.close} style={styles.closeIcon} />
          </TouchableOpacity>
          <Image
            source={dark ? images.verifyDark : images.verify}
            style={styles.image}
          />

          <Text style={styles.title}>{t("verifyPhoneModal.verifyTitle")}</Text>
          <Text style={styles.phoneNumber}>
            {t("verifyPhoneModal.isThisCorrect")}{" "}
            <Text style={styles.boldText}>
              {countryCode} {phoneNumber}
            </Text>
          </Text>

          <Button
            buttonText={t("verifyPhoneModal.yes")}
            handleButton={onConfirm}
            outlined={false}
            buttonStyles={styles.button}
          />
          <Button
            buttonText={t("verifyPhoneModal.no")}
            handleButton={onCancel}
            outlined={true}
            buttonStyles={styles.button}
          />
        </View>
      </View>
    </Modal>
  );
};

export default PhoneVerificationModal;

// Function to create styles dynamically based on the theme
const createStyles = (colors: any) =>
  StyleSheet.create({
    overlay: {
      flex: 1,
      backgroundColor: "rgba(0, 0, 0, 0.6)",
      justifyContent: "center",
      alignItems: "center",
    },
    modalContainer: {
      width: "85%",
      height: "70%",
      backgroundColor: colors.backgroundModal,
      borderRadius: 20,
      padding: 20,
      alignItems: "center",
      borderBottomWidth: 4,
      paddingBottom: 15,
      borderBottomColor: colors.primary,
    },
    closeButton: {
      position: "absolute",
      top: 15,
      right: 15,
      zIndex: 5,
    },
    closeIcon: {
      width: 20,
      height: 20,
      tintColor: colors.textPrimary,
    },
    image: {
      width: "80%",
      height: "40%",
      marginBottom: 15,
    },
    title: {
      fontSize: 25,
      textAlign: "center",
      fontWeight: "bold",
      color: colors.textPrimary,
    },
    phoneNumber: {
      fontSize: 16,
      color: colors.textPrimary,
      marginBottom: 20,
    },
    boldText: {
      fontWeight: "bold",
    },
    button: {
      width: "100%",
      marginVertical: 5,
    },
  });
