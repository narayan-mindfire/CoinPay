import icons from "@/src/Assets/icons";

import {
  Button,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { CameraView, useCameraPermissions } from "expo-camera";

import { useTranslation } from "react-i18next";
import { useTheme } from "@react-navigation/native";
import CamClickButton from "@/src/components/CamClickButton";

// document scanning before page
export default function ScanDoc({ navigation }) {
  const { t } = useTranslation();
  const { colors } = useTheme();

  const [permission, requestPermission] = useCameraPermissions();

  const styles = createStyles(colors);

  const facing = "front";
  if (!permission) {
    return <View />;
  }

  // asking for permission if not granted
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
      <CameraView style={styles.camera} facing={facing} flash="off">
        {/* Overlay Content */}
        <View style={styles.overlay}>
          <View style={styles.verificationBox}>
            <Text style={styles.subText}>{t("selfieCam.subtext")}</Text>
          </View>
          <View style={styles.scanBox} />
          <View style={styles.buttonContainer}>
            <TouchableOpacity>
              <Image source={icons.flash} style={styles.iconStyle} />
            </TouchableOpacity>
            <CamClickButton navigation={navigation} />
            <TouchableOpacity>
              <Image source={icons.retry} style={styles.iconStyle} />
            </TouchableOpacity>
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
      alignItems: "center",
      justifyContent: "center",
      height: "100%",
      width: "100%",
      backgroundColor: "rgba(0, 0, 0, 0.4)",
    },
    idImage: {
      width: 220,
      height: 130,
      marginVertical: 20,
    },
    verificationBox: {
      alignItems: "center",
      marginTop: 500,
    },
    subText: {
      color: "#ccc",
      fontSize: 18,
      marginBottom: 12,
      textAlign: "center",
    },
    scanBox: {
      position: "absolute",
      top: "25%",
      alignSelf: "center",
      width: 300,
      height: 300,
      borderWidth: 5,
      borderColor: colors.border,
      borderRadius: 150,
      transform: [{ scaleY: 1.5 }],
    },
    buttonContainer: {
      position: "absolute",
      justifyContent: "space-around",
      alignItems: "center",
      flexDirection: "row",
      height: 100,
      width: 200,
      bottom: 20,
    },
    iconStyle: {
      tintColor: colors.white,
    },
  });
