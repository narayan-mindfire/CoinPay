import { View, Image, Text, StyleSheet, TouchableOpacity } from "react-native";
import icons from "../Assets/icons";

const ActionButton = ({
  label,
  icon,
  colors,
  tintColor,
  goTo,
  navigation,
}: {
  label: string;
  icon: string;
  colors: any;
  tintColor: string;
  goTo: string;
  navigation: any;
}) => {
  const styles = createActionButtonStyles(colors);
  return (
    <TouchableOpacity onPress={() => navigation.push(goTo)}>
      <View style={{ alignItems: "center" }}>
        <View style={styles.actionButton}>
          <Image
            source={icons[icon]}
            tintColor={colors[tintColor]}
            style={[styles.actionIcon]}
          />
        </View>
        <Text style={styles.actionLabel}>{label}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default ActionButton;

const createActionButtonStyles = (colors: any) =>
  StyleSheet.create({
    actionIcon: {
      height: 34,
      width: 34,
      padding: 20,
    },
    actionButton: {
      paddingTop: 16,
      paddingBottom: 4,
    },
    actionLabel: {
      color: colors.textSecondary,
      fontWeight: 600,
      textAlign: "center",
      paddingBottom: 16,
    },
  });
