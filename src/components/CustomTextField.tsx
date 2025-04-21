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
import { useTheme } from "@react-navigation/native";

interface CustomTextFieldProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  iconLeft?: any;
  iconRight?: any;
  onIconRightPress?: () => void;
  error?: string;
  touched?: boolean;
  secureTextEntry?: boolean;
  style?: ViewStyle;
  inputStyle?: TextStyle;
  width?: string | number;
  onBlur?: () => void;
  onFocus?: () => void;
  showPlaceholder?: boolean;
}

const CustomTextField: React.FC<CustomTextFieldProps> = ({
  value,
  onChangeText,
  placeholder,
  iconLeft,
  iconRight,
  onIconRightPress,
  error,
  touched,
  secureTextEntry,
  style,
  inputStyle,
  width = "100%",
  onBlur,
  onFocus,
  showPlaceholder = true,
}) => {
  const { colors } = useTheme();
  const [isTouched, setIsTouched] = useState(false);

  const styles = createStyles(colors, width, isTouched, error);

  const handleFocus = () => {
    setIsTouched(true);
    onFocus?.();
  };

  const handleBlur = () => {
    onBlur?.();
  };

  return (
    <View style={styles.wrapper}>
      <View style={styles.container}>
        {iconLeft && <Image source={iconLeft} style={styles.icon} />}

        <TextInput
          style={[styles.input, inputStyle]}
          placeholder={showPlaceholder ? placeholder : ""}
          placeholderTextColor={colors.border}
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={secureTextEntry}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />

        {iconRight && (
          <TouchableOpacity onPress={onIconRightPress}>
            <Image source={iconRight} style={styles.icon} />
          </TouchableOpacity>
        )}
      </View>

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
      marginBottom: 8,
      width: width,
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
