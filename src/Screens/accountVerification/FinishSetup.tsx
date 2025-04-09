import React, { useEffect, useState } from "react";
import { View, Text, Image, StyleSheet, Animated, Easing } from "react-native";
import { FinishSetupScreenProps } from "@/src/navigation/NavigationTypes";
import { useTheme } from "@react-navigation/native";
import icons from "@/src/Assets/icons";
import images from "@/src/Assets/images";
import { useTranslation } from "react-i18next";

type Step = {
  id: number;
  label: string;
  status: "done" | "in-progress";
};

const StepItem = ({
  id,
  label,
  status,
  colors,
  spinning,
}: {
  id: number;
  label: string;
  status: "done" | "in-progress";
  colors: any;
  spinning: boolean;
}) => {
  const spinAnim = new Animated.Value(0);
  const stepStyles = createStepStyles(colors);
  useEffect(() => {
    if (spinning) {
      Animated.loop(
        Animated.timing(spinAnim, {
          toValue: 1,
          duration: 1000,
          easing: Easing.linear,
          useNativeDriver: true,
        })
      ).start();
    }
  }, [spinning]);

  const spin = spinAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  return (
    <View style={stepStyles.row}>
      <View style={[stepStyles.circle, { backgroundColor: "#333" }]}>
        <Text style={{ color: "#fff", fontSize: 12 }}>{id}</Text>
      </View>

      <Text style={[stepStyles.label, { color: colors.textPrimary }]}>
        {label}
      </Text>

      {status === "done" ? (
        <Image
          source={icons.check}
          style={[stepStyles.icon]}
          tintColor={colors.primary}
        />
      ) : (
        <Animated.Image
          source={icons.loading}
          style={[
            stepStyles.icon,
            {
              tintColor: colors.primary,
              transform: [{ rotate: spin }],
            },
          ]}
        />
      )}
    </View>
  );
};

const FinishSetup = ({ navigation }: FinishSetupScreenProps) => {
  const { colors, dark } = useTheme();
  const styles = createStyles(colors);

  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const { t } = useTranslation();

  const initialSteps: Step[] = [
    { id: 1, label: t("finishSetup.steps.s1"), status: "in-progress" },
    { id: 2, label: t("finishSetup.steps.s2"), status: "in-progress" },
    { id: 3, label: t("finishSetup.steps.s3"), status: "in-progress" },
  ];
  const [steps, setSteps] = useState<Step[]>(initialSteps);

  useEffect(() => {
    if (currentStepIndex < steps.length) {
      const timer = setTimeout(() => {
        setSteps((prevSteps) =>
          prevSteps.map((step, index) =>
            index === currentStepIndex ? { ...step, status: "done" } : step
          )
        );
        setCurrentStepIndex((prev) => prev + 1);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [currentStepIndex, steps]);

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.push("SetupPin");
    }, 7000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <Image
        source={dark ? images.finishSetupDark : images.finishSetup}
        style={styles.image}
      />
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{t("finishSetup.title")}</Text>
      </View>
      <View style={styles.subtitleContainer}>
        <Text style={styles.subtitle}>{t("scanId.subtitle")}</Text>
      </View>

      <View style={{ width: "90%", marginTop: 20 }}>
        {steps.map((step, index) => (
          <StepItem
            key={step.id}
            {...step}
            colors={colors}
            spinning={
              step.status === "in-progress" && index === currentStepIndex
            }
          />
        ))}
      </View>
    </View>
  );
};

export default FinishSetup;

// Theme-based styles
const createStyles = (colors: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: colors.background,
    },
    image: {
      width: "85%",
      resizeMode: "contain",
      marginTop: -100,
    },
    titleContainer: {
      width: "54%",
    },
    subtitleContainer: {
      width: "90%",
    },
    title: {
      fontSize: 36,
      fontWeight: "800",
      textAlign: "center",
      color: colors.textPrimary,
      marginBottom: 10,
    },
    subtitle: {
      fontSize: 18,
      color: colors.textTertiary,
      textAlign: "center",
      marginBottom: 30,
      paddingHorizontal: 10,
    },
  });

const createStepStyles = (colors: any) =>
  StyleSheet.create({
    row: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 18,
      paddingBottom: 13,
      borderBottomWidth: 3,
      borderBottomColor: colors.textDisabled,
    },
    circle: {
      width: 24,
      height: 24,
      borderRadius: 12,
      justifyContent: "center",
      alignItems: "center",
      marginRight: 12,
    },
    label: {
      flex: 1,
      fontSize: 15,
    },
    icon: {
      width: 20,
      height: 20,
    },
  });
