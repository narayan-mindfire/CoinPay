import React from "react";

import { View, Text, StyleSheet } from "react-native";

import QRCode from "react-native-qrcode-svg";
import Button from "@/src/components/Button";
import icons from "@/src/Assets/icons";

import { useAppSelector } from "@/src/redux/store";
import { useTheme } from "@react-navigation/native";
import { useTranslation } from "react-i18next";

const ReceiveQR = ({ navigation }) => {
  const { colors, dark } = useTheme();
  const { t } = useTranslation();
  const user = useAppSelector((state) => state.auth.user);
  const styles = createStyles(colors);

  return (
    <View style={styles.container}>
      <View style={styles.qrBox}>
        <QRCode
          value={user.uid}
          size={200}
          color={!dark ? colors.primary : "#fff"}
          backgroundColor="transparent"
          logoSize={40}
        />
        <Text style={styles.title}>{t("receiveQR.scanToGetPaid")}</Text>
        <Text style={styles.subtitle}>{t("receiveQR.holdToScan")}</Text>
      </View>

      <View style={styles.buttons}>
        <Button
          buttonText={t("receiveQR.requestForPayment")}
          handleButton={() => navigation.navigate("ChooseSender")}
        />
        <Button
          buttonText={t("receiveQR.shareToReceiveMoney")}
          icon={icons.share}
          outlined
          handleButton={() => console.log("Share to Receive Money")}
          buttonStyles={{ marginTop: 10 }}
        />
      </View>
    </View>
  );
};

export default ReceiveQR;

const createStyles = (colors) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
      paddingHorizontal: 20,
      paddingTop: 40,
      justifyContent: "space-between",
    },
    qrBox: {
      alignItems: "center",
      backgroundColor: colors.backgroundModal,
      borderRadius: 20,
      padding: 30,
      elevation: 3,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
    },
    title: {
      fontSize: 20,
      fontWeight: "700",
      color: colors.textPrimary,
      marginTop: 24,
    },
    subtitle: {
      fontSize: 14,
      color: colors.textSecondary,
      marginTop: 8,
      textAlign: "center",
      maxWidth: 260,
    },
    buttons: {
      marginBottom: 40,
    },
  });
