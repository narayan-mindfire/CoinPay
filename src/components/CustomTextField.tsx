import React, { useState } from "react";

import {
  View,
  TextInput,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ViewStyle,
  TextStyle,
} from "react-native";

import icons from "@/src/Assets/icons";
import { useTheme } from "@react-navigation/native";

interface CustomTextFieldProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  iconLeft?: any;
  error?: string;
  style?: ViewStyle;
  inputStyle?: TextStyle;
  keyboardType?: "email-address" | "numeric" | "phone-pad";
  width?: string | number;
  showPlaceholder?: boolean;
  isPasswordField?: boolean;
}

const CustomTextField: React.FC<CustomTextFieldProps> = ({
  value,
  onChangeText,
  placeholder,
  iconLeft,
  error,
  inputStyle,
  style,
  keyboardType,
  width = "100%",
  showPlaceholder = true,
  isPasswordField = false,
}) => {
  const { colors } = useTheme();

  // is touched state to show error message
  // when the user has interacted with the field
  // and the field is invalid
  const [isTouched, setIsTouched] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const styles = createStyles(colors, width, isTouched, error);

  // Shows placeholder only when the field is empty
  const togglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <View style={[styles.wrapper, style]}>
      <View style={styles.container}>
        {iconLeft && <Image source={iconLeft} style={styles.icon} />}

        <TextInput
          style={[styles.input, inputStyle]}
          placeholder={showPlaceholder ? placeholder : ""}
          placeholderTextColor={colors.border}
          value={value}
          onChangeText={(text) => {
            onChangeText(text);
            if (text.length >= 4 && !isTouched) {
              setIsTouched(true);
            }
          }}
          secureTextEntry={isPasswordField && !showPassword}
          keyboardType={keyboardType}
        />

        {/* // Show the eye icon only when the field is a password field */}
        {isPasswordField && (
          <TouchableOpacity onPress={togglePassword}>
            <Image
              source={showPassword ? icons.eyeSlash : icons.eye}
              style={styles.icon}
            />
          </TouchableOpacity>
        )}
      </View>

      {/* // Show error message only when the field is touched */}

      {error && isTouched && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const createStyles = (
  colors: any,
  width: string | number,
  isTouched: boolean,
  error: string
) =>
  StyleSheet.create({
    wrapper: {
      width: width,
      height: 70,
    } as ViewStyle,
    container: {
      flexDirection: "row",
      alignItems: "center",
      borderWidth: 2,
      borderRadius: 8,
      paddingHorizontal: 10,
      height: 50,
      borderColor: isTouched
        ? error === ""
          ? colors.primary
          : colors.error
        : colors.border,
    },
    input: {
      flex: 1,
      fontSize: 16,
      color: colors.textPrimary,
    },
    icon: {
      width: 20,
      height: 20,
      marginRight: 8,
      tintColor: colors.border,
    },
    errorText: {
      color: colors.error,
      fontSize: 12,
      marginTop: 2,
      width: "100%",
    },
  });

export default CustomTextField;
