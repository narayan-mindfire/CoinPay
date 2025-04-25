import React from "react";

import { Modal, View, ActivityIndicator, StyleSheet } from "react-native";
import { Colors } from "react-native/Libraries/NewAppScreen";

type LoaderModalProps = {
  visible: boolean;
};

const LoaderModal: React.FC<LoaderModalProps> = ({ visible }) => {
  return (
    <Modal
      transparent
      animationType="fade"
      visible={visible}
      statusBarTranslucent
    >
      <View style={styles.overlay}>
        <ActivityIndicator size="large" color={Colors.white} />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default LoaderModal;
