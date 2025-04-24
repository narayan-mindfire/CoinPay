import React, { useState } from "react";

import { View, Modal, StyleSheet } from "react-native";
import Button from "@/src/components/Button";

import { useTheme } from "@react-navigation/native";
import { t } from "i18next";
import { doc, increment, updateDoc } from "@firebase/firestore";
import { db } from "@/firebaseConfig";
import { useAppDispatch, useAppSelector } from "../redux/store";
import CustomTextField from "./CustomTextField";
import { fetchUserProfile } from "../redux/slices/authSlice";

interface AddMoneyModalProps {
  visible: boolean;
  onCancel: () => void;
}

const AddMoneyModal: React.FC<AddMoneyModalProps> = ({ visible, onCancel }) => {
  const { colors } = useTheme();
  const styles = createStyles(colors);
  const dispatch = useAppDispatch();
  const [amount, setAmount] = useState("");

  const currentUserId = useAppSelector((state) => state.auth.user.uid);

  const onAdd = async () => {
    await updateDoc(doc(db, "users", currentUserId), {
      accBalance: increment(parseFloat(amount)),
    })
      .then(() => {
        dispatch(fetchUserProfile(currentUserId));
      })
      .then(() => {
        onCancel();
      });
  };

  return (
    <Modal transparent visible={visible} animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <CustomTextField
            value={amount}
            onChangeText={setAmount}
            placeholder="Enter amount"
            keyboardType="numeric"
          />

          <Button
            buttonText={t("verifyPhoneModal.yes")}
            handleButton={onAdd}
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

export default AddMoneyModal;

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
      backgroundColor: colors.backgroundModal,
      borderRadius: 20,
      padding: 20,
      alignItems: "center",
      borderBottomWidth: 4,
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
    button: {
      width: "100%",
      marginVertical: 5,
    },
  });
