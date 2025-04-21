import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Keyboard } from "react-native";
import { HomeAddressScreenProps } from "@/src/navigation/NavigationTypes";
import Button from "@/src/components/Button";
import {
  validateAddress,
  validateCity,
  validatePostCode,
} from "@/src/utils/formFieldValidators";
import { useAppDispatch } from "@/src/redux/store";
import { updateUserForm } from "@/src/redux/slices/userFormSlice";
import { useTheme } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import CustomTextField from "@/src/components/CustomTextField";

const HomeAddress = ({ navigation }: HomeAddressScreenProps) => {
  const { colors } = useTheme();
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [postCode, setPostCode] = useState("");
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  const [touched, setTouched] = useState({
    address: false,
    city: false,
    postCode: false,
  });

  const addressError = validateAddress(address);
  const cityError = validateCity(city);
  const postCodeError = validatePostCode(postCode);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        setKeyboardVisible(true);
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setKeyboardVisible(false);
      }
    );
    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  const addData = () => {
    dispatch(updateUserForm({ addressLine: address, city, postCode }));
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.title, { color: colors.textPrimary }]}>
        {t("homeAddress.title")}
      </Text>
      <Text style={[styles.subtitle, { color: colors.textTertiary }]}>
        {t("homeAddress.subtitle")}
      </Text>

      <Text style={[styles.label, { color: colors.textPrimary }]}>
        {t("homeAddress.addressLabel")}
      </Text>
      <CustomTextField
        value={address}
        onChangeText={setAddress}
        placeholder={t("homeAddress.addressPlaceholder")}
        error={addressError}
        touched={touched.address}
        onBlur={() => setTouched((prev) => ({ ...prev, address: true }))}
      />

      <Text style={[styles.label, { color: colors.textPrimary }]}>
        {t("homeAddress.cityLabel")}
      </Text>
      <CustomTextField
        value={city}
        onChangeText={setCity}
        placeholder={t("homeAddress.cityPlaceholder")}
        error={cityError}
        touched={touched.city}
        onBlur={() => setTouched((prev) => ({ ...prev, city: true }))}
      />

      <Text style={[styles.label, { color: colors.textPrimary }]}>
        {t("homeAddress.postCodeLabel")}
      </Text>
      <CustomTextField
        value={postCode}
        onChangeText={setPostCode}
        placeholder={t("homeAddress.postCodePlaceholder")}
        error={postCodeError}
        touched={touched.postCode}
        onBlur={() => setTouched((prev) => ({ ...prev, postCode: true }))}
      />

      <Button
        buttonText={t("homeAddress.continue")}
        handleButton={() => {
          navigation.navigate("PersonalInfo");
          addData();
        }}
        outlined={false}
        disabled={
          addressError !== "" || cityError !== "" || postCodeError !== ""
        }
        buttonStyles={{ marginTop: isKeyboardVisible ? 20 : 300 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 14,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginTop: 30,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: "400",
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginVertical: 7,
  },
});

export default HomeAddress;
