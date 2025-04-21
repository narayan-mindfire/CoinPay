import React, { useState } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { useTheme } from "@react-navigation/native";
import icons from "@/src/Assets/icons";
import PurposeOption from "@/src/components/PurposeOption";
import Button from "@/src/components/Button";
import TransferCard from "@/src/components/TransferCard";
import ChooseAccount from "@/src/components/ChooseAccount";

const purposes = [
  {
    id: "1",
    title: "Personal",
    description: "Pay your friends and family.",
    icon: icons.user,
    tintColor: "primary",
    bgColor: "backgroundAccent",
  },
  {
    id: "2",
    title: "Business",
    description: "Pay your employee",
    icon: icons.briefCase,
    tintColor: "warning",
    bgColor: "backgroundWarning",
  },
  {
    id: "3",
    title: "Payment",
    description: "For payment utility bills.",
    icon: icons.invoice,
    tintColor: "error",
    bgColor: "backgroundError",
  },
];

const PurposeSelection = ({ navigation }) => {
  const { colors } = useTheme();
  const styles = createStyles(colors);
  const [selected, setSelected] = useState("1");
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [amount, setAmount] = useState("");

  console.log("step", step);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select a Purpose</Text>
      <Text style={styles.subtitle}>Select a Method for Sending Money</Text>
      {step === 1 && (
        <>
          <FlatList
            data={purposes}
            removeClippedSubviews={false}
            keyExtractor={(item) => item.id}
            scrollEnabled={false}
            renderItem={({ item }) => (
              <PurposeOption
                item={item}
                isSelected={item.id === selected}
                onSelect={() => setSelected(item.id)}
              />
            )}
          />
          <Button buttonText="Continue" handleButton={() => setStep(2)} />
        </>
      )}

      {step === 2 && (
        <TransferCard
          user={{
            pic: "profile",
            name: "Mehedi Hasan",
            email: "helloyouthmind@gmail.com",
          }}
          amount={amount}
          setAmount={setAmount}
          onContinue={() => {
            setStep(3);
            console.log("Continue pressed");
          }}
        />
      )}
      {step === 3 && (
        <ChooseAccount
          user={{
            pic: "profile",
            name: "Mehedi Hasan",
            email: "helloyouthmind@gmail.com",
          }}
          amount={amount}
          onContinue={() => {
            console.log("Pay confirmed");
            navigation.navigate("SendSummary");
          }}
        />
      )}
    </View>
  );
};

export default PurposeSelection;

const createStyles = (colors) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
      padding: 20,
    },
    title: {
      fontSize: 28,
      fontWeight: "700",
      color: colors.textPrimary,
    },
    subtitle: {
      fontSize: 14,
      color: colors.textTertiary,
      marginBottom: 25,
      marginTop: 4,
    },
  });
