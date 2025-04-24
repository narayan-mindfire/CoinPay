import { Button, StyleSheet, Text, View } from "react-native";

import { CameraView, useCameraPermissions } from "expo-camera";
import { useTranslation } from "react-i18next";
import { useTheme } from "@react-navigation/native";
import { useAppDispatch, useAppSelector } from "@/src/redux/store";
import {
  setReceiverUID,
  setSenderUID,
} from "@/src/redux/slices/currentTransactionSlice";

export default function ScanDoc({ navigation }) {
  const { t } = useTranslation();
  const { colors } = useTheme();
  const dispatch = useAppDispatch();

  const currentUser = useAppSelector((state) => state.auth.user);

  const [permission, requestPermission] = useCameraPermissions();

  const styles = createStyles(colors);

  if (!permission) return <View />;
  if (!permission.granted) {
    return (
      <View style={styles.permissionContainer}>
        <Text style={styles.message}>
          We need your permission to show the camera
        </Text>
        <Button onPress={requestPermission} title="Grant Permission" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <CameraView
        style={styles.camera}
        facing="back"
        flash="off"
        //on scanning of barcode the data (uid of recepient) we move ahead with normal procedure to create transaction
        onBarcodeScanned={({ data }) => {
          console.log("data: ", data);
          dispatch(setSenderUID(currentUser.uid));
          console.log("data: ", data);
          dispatch(setReceiverUID(data));
          navigation.navigate("PurposeSelection");
        }}
      >
        {/* Overlay */}
        <View style={styles.overlay}>
          <View style={styles.topOverlay} />

          <View style={styles.middleRow}>
            <View style={styles.sideOverlay} />
            <View style={styles.scanBox} />
            <View style={styles.sideOverlay} />
          </View>

          <View style={styles.bottomOverlay}>
            <Text style={styles.text}>{t("scanSend.text")}</Text>
            <Text style={styles.subText}>{t("scanSend.subtext")}</Text>
          </View>
        </View>
      </CameraView>
    </View>
  );
}

const createStyles = (colors: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    permissionContainer: {
      flex: 1,
      justifyContent: "center",
      padding: 20,
    },
    message: {
      textAlign: "center",
      fontSize: 16,
      marginBottom: 10,
    },
    camera: {
      flex: 1,
    },

    overlay: {
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
    },

    topOverlay: {
      flex: 1,
      backgroundColor: colors.primary,
      opacity: 0.7,
    },

    middleRow: {
      flexDirection: "row",
    },

    sideOverlay: {
      flex: 1,
      backgroundColor: colors.primary,
      opacity: 0.7,
    },

    scanBox: {
      width: 250,
      height: 250,
      borderColor: "#fff",
      borderWidth: 3,
    },

    bottomOverlay: {
      flex: 1,
      backgroundColor: colors.primary,
      opacity: 0.7,
      alignItems: "center",
      justifyContent: "flex-end",
      paddingBottom: 40,
    },

    text: {
      color: colors.white,
      fontSize: 32,
      textAlign: "center",
      marginBottom: 10,
      width: "60%",
      fontWeight: "800",
    },
    subText: {
      color: colors.white,
      fontSize: 16,
      textAlign: "center",
      marginBottom: 20,
      width: "60%",
    },
  });
