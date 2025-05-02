import React from "react";
import { Modal, TouchableOpacity, View, Text, StyleSheet } from "react-native";

interface MonthModalProps {
  visible: boolean;
  onClose: () => void;
  onSelectMonth: (month: string) => void;
  colors: any;
}

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const MonthModal: React.FC<MonthModalProps> = ({
  visible,
  onClose,
  onSelectMonth,
  colors,
}) => {
  const styles = createStyles(colors);

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <TouchableOpacity style={styles.modalOverlay} onPress={onClose}>
        <View style={styles.monthModal}>
          {months.map((month, index) => (
            <TouchableOpacity
              key={index}
              style={styles.monthOption}
              onPress={() => {
                onSelectMonth(month);
                onClose();
              }}
            >
              <Text style={styles.monthText}>{month}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

export default MonthModal;

const createStyles = (colors: any) =>
  StyleSheet.create({
    modalOverlay: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    monthModal: {
      backgroundColor: colors.backgroundModal,
      padding: 20,
      borderRadius: 15,
      width: "80%",
    },
    monthOption: {
      paddingVertical: 10,
      borderBottomWidth: 1,
      borderColor: colors.border,
    },
    monthText: {
      fontSize: 18,
      color: colors.textPrimary,
      textAlign: "center",
    },
  });
