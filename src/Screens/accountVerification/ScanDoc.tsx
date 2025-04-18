import { Button, StyleSheet, Text, View } from "react-native";

import { CameraView, useCameraPermissions } from "expo-camera";

import { useTheme } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import CamButton from "@/src/components/CamButton";

export default function ScanDoc({ navigation }) {
  const { colors } = useTheme();
  const { t } = useTranslation();
  const [permission, requestPermission] = useCameraPermissions();

  const styles = createStyles(colors);

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View style={styles.permissionContainer}>
        <Text style={styles.message}>{t("scanDoc.message")}</Text>
        <Button
          onPress={requestPermission}
          title={t("scanDocs.requestPermission")}
        />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <CameraView style={styles.camera} facing={"back"}>
        {/* Dimmed overlay */}
        <View style={styles.overlay}>
          <View style={styles.topDim} />
          <View style={styles.middle}>
            <View style={styles.sideDim} />
            <View style={styles.scanBox} />
            <View style={styles.sideDim} />
          </View>
          <View style={styles.bottomDim} />
        </View>

        {/* Foreground UI */}
        <View style={styles.overlay}>
          <View style={styles.top}>
            <Text style={styles.stepText}>1/2</Text>
            <Text style={styles.scanText}>{t("scanDoc.scantext")}</Text>
          </View>
          <View style={styles.bottom}>
            <View style={styles.verificationBox}>
              <Text style={styles.verificationText}>
                {t("scanDoc.verificationText")}
              </Text>
              <Text style={styles.subText}>{t("scanDoc.subtext")}</Text>
              <View style={styles.progressBarBackground}>
                <View style={styles.progressBarFill} />
              </View>
              <CamButton
                navigation={navigation}
                to="TakeSelfie"
                icon="camera"
                text={t("scanDoc.scanButton")}
              />
            </View>
          </View>
        </View>
      </CameraView>
    </View>
  );
}

const createStyles = (colors: any) => {
  const scanBoxHeight = 200;

  return StyleSheet.create({
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
    topDim: {
      flex: 1,
      backgroundColor: "rgba(0,0,0,0.4)",
    },
    middle: {
      height: scanBoxHeight,
      flexDirection: "row",
    },
    bottomDim: {
      flex: 1,
      backgroundColor: "rgba(0,0,0,0.4)",
    },
    sideDim: {
      flex: 1,
      backgroundColor: "rgba(0,0,0,0.4)",
    },
    scanBox: {
      width: 300,
      height: "100%",
      borderWidth: 3,
      borderColor: colors.border,
      backgroundColor: "transparent",
    },
    top: {
      flex: 1,
      alignItems: "center",
      justifyContent: "flex-start",
      paddingTop: 50,
      height: "20%",
    },
    stepText: {
      color: "#fff",
      fontSize: 18,
      fontWeight: "600",
    },
    scanText: {
      color: "#fff",
      fontSize: 20,
      textAlign: "center",
      marginTop: 8,
      fontWeight: "500",
    },
    bottom: {
      flex: 1,
      alignItems: "center",
      justifyContent: "flex-start",
      paddingTop: 20,
    },
    verificationBox: {
      alignItems: "center",
    },
    verificationText: {
      marginTop: 100,
      color: colors.white,
      fontSize: 18,
      textAlign: "center",
      fontWeight: "600",
      marginBottom: 4,
    },
    subText: {
      color: "#ccc",
      fontSize: 13,
      marginBottom: 12,
    },
    progressBarBackground: {
      width: 200,
      height: 6,
      backgroundColor: "#ccc",
      borderRadius: 4,
      overflow: "hidden",
    },
    progressBarFill: {
      width: "40%",
      height: "100%",
      backgroundColor: colors.primary,
    },
    scanDocText: { color: "white", marginTop: 30 },
  });
};
