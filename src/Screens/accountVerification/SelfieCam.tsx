import icons from "@/src/Assets/icons";
import { useTheme } from "@react-navigation/native";
import {
  CameraView,
  useCameraPermissions,
  CameraType,
  FlashMode,
} from "expo-camera";
import { useTranslation } from "react-i18next";
import {
  Button,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function ScanDoc({ navigation }) {
  const facing = "front";
  const [permission, requestPermission] = useCameraPermissions();
  const { colors } = useTheme();
  const styles = createStyles(colors);
  const { t } = useTranslation();
  if (!permission) {
    return <View />;
  }

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
              <Image source={icons.flash} tintColor={"white"} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.push("FinishSetup")}>
              <View style={styles.clickOuter}>
                <View style={styles.clickInner}></View>
              </View>
            </TouchableOpacity>
            <TouchableOpacity>
              <Image source={icons.retry} tintColor={"white"} />
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
    clickOuter: {
      width: 60,
      height: 60,
      borderRadius: 30,
      backgroundColor: "rgba(255, 255, 255, 0.5)",
      justifyContent: "center",
      alignItems: "center",
    },
    clickInner: {
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: "rgba(255, 255, 255, 1)",
    },
  });
