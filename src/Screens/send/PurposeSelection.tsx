import React, { useEffect, useState } from "react";

import { View, Text, StyleSheet, FlatList } from "react-native";

import icons from "@/src/Assets/icons";
import PurposeOption from "@/src/components/PurposeOption";
import Button from "@/src/components/Button";
import TransferCard from "@/src/components/TransferCard";
import ChooseAccount from "@/src/components/ChooseAccount";
import LoaderModal from "@/src/components/LoaderModal";

import { collection, getDocs } from "firebase/firestore";
import { db } from "@/firebaseConfig";
import { useAppDispatch, useAppSelector } from "@/src/redux/store";
import {
  setPurpose,
  setAmount as setAmountRedux,
} from "@/src/redux/slices/currentTransactionSlice";
import { createTransaction } from "@/src/redux/slices/transactionSlice";

import { useTheme } from "@react-navigation/native";
import { fetchUserProfile } from "@/src/redux/slices/authSlice";

import { useTranslation } from "react-i18next";

// this screen has multiple views - selecting purpose, entering amount to request, and requesting view
const PurposeSelection = ({ navigation }) => {
  const { colors } = useTheme();
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const receiverUID = useAppSelector(
    (state) => state.currentTransaction.receiverUID
  );

  const styles = createStyles(colors);
  const [selected, setSelected] = useState("1");
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [amount, setAmount] = useState("");
  const [recipient, setRecipient] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchRecipient = async () => {
      try {
        setLoading(true);
        const userSnap = await getDocs(collection(db, "users"));
        userSnap.forEach((doc) => {
          const data = doc.data();
          if (data.uid === receiverUID) {
            setRecipient({
              uid: data.uid,
              name: data.name || "Unnamed",
              email: data.email,
              image: data.image || "profile",
            });
          }
        });
      } catch (error) {
        console.error("Failed to fetch recipient", error);
      } finally {
        setLoading(false);
      }
    };

    if (receiverUID) {
      fetchRecipient();
    }
  }, [receiverUID]);

  const currentTransaction = useAppSelector(
    (state) => state.currentTransaction
  );

  const purposes = [
    {
      id: "1",
      title: t("purposeSelection.personal"),
      description: t("purposeSelection.personalDesc"),
      icon: icons.user,
      tintColor: "primary",
      bgColor: "backgroundAccent",
    },
    {
      id: "2",
      title: t("purposeSelection.business"),
      description: t("purposeSelection.businessDesc"),
      icon: icons.briefCase,
      tintColor: "warning",
      bgColor: "backgroundWarning",
    },
    {
      id: "3",
      title: t("purposeSelection.payment"),
      description: t("purposeSelection.paymentDesc"),
      icon: icons.invoice,
      tintColor: "error",
      bgColor: "backgroundError",
    },
  ];

  return (
    <View style={styles.container}>
      {loading && <LoaderModal visible={loading} />}
      <Text style={styles.title}>{t("purposeSelection.purposeTitle")}</Text>
      <Text style={styles.subtitle}>
        {t("purposeSelection.purposeSubtitle")}
      </Text>

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
          <Button
            buttonText={t("purposeSelection.continue")}
            handleButton={() => {
              const selectedPurpose = purposes.find(
                (p) => p.id === selected
              )?.title;
              if (selectedPurpose) {
                dispatch(setPurpose(selectedPurpose));
              }
              setStep(2);
            }}
          />
        </>
      )}

      {step === 2 && recipient && (
        <TransferCard
          user={{
            pic: recipient.image,
            name: recipient.name,
            email: recipient.email,
          }}
          amount={amount}
          setAmount={setAmount}
          onContinue={() => {
            dispatch(setAmountRedux(Number(amount)));
            setStep(3);
          }}
        />
      )}

      {step === 3 && recipient && (
        <ChooseAccount
          user={{
            pic: recipient.image,
            name: recipient.name,
            email: recipient.email,
          }}
          amount={amount}
          onContinue={async () => {
            setLoading(true);
            await dispatch(createTransaction(currentTransaction)).then(() => {
              dispatch(fetchUserProfile(currentTransaction.senderUID));
            });
            setLoading(false);
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
