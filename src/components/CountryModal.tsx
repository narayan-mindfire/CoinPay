import React from "react";

import {
  Modal,
  View,
  FlatList,
  TouchableOpacity,
  Image,
  Text,
  TouchableWithoutFeedback,
  StyleSheet,
} from "react-native";

import { useTheme } from "@react-navigation/native";

//modal component that shows a list of countries with their country dial code
const ModalComponent = ({ visible, data, onSelect, onClose, countryIcons }) => {
  const { colors } = useTheme();
  const styles = createStyles(colors);

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <FlatList
              data={Object.entries(data)}
              keyExtractor={([key]) => key}
              renderItem={({ item }) => {
                const [code, dialCode] = item;
                return (
                  <TouchableOpacity
                    style={styles.modalItem}
                    onPress={() => {
                      onSelect({ code, dialCode });
                      onClose();
                    }}
                  >
                    <Image
                      source={countryIcons[code]}
                      style={styles.modalFlag}
                    />
                    <Text
                      style={styles.modalText}
                    >{`${dialCode} (${code})`}</Text>
                  </TouchableOpacity>
                );
              }}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const createStyles = (colors) =>
  StyleSheet.create({
    modalContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    modalContent: {
      width: "80%",
      backgroundColor: colors.background,
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
  });

export default ModalComponent;
