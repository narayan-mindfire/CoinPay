import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";

import icons from "@/src/Assets/icons";
import PurposeOption from "@/src/components/PurposeOption";
import Button from "@/src/components/Button";
import TransferCard from "@/src/components/TransferCard";
import RequestUser from "@/src/components/RequestUser";
import LoaderModal from "@/src/components/LoaderModal";

import { useTheme } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/firebaseConfig";

import { useAppDispatch, useAppSelector } from "@/src/redux/store";
import {
  setPurpose,
  setAmount as setAmountRedux,
} from "@/src/redux/slices/currentTransactionSlice";

const PurposeSelectionReceive = ({ navigation }) => {
  const { colors } = useTheme();
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const styles = createStyles(colors);

  const senderUID = useAppSelector(
    (state) => state.currentTransaction.senderUID
  );
  const currentTransaction = useAppSelector(
    (state) => state.currentTransaction
  );

  const [selected, setSelected] = useState("1");
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [amount, setAmount] = useState("");
  const [sender, setSender] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchSender = async () => {
      try {
        setLoading(true);
        const userSnap = await getDocs(collection(db, "users"));
        userSnap.forEach((doc) => {
          const data = doc.data();
          if (data.uid === senderUID) {
            setSender({
              uid: data.uid,
              name: data.name || "Unnamed",
              email: data.email,
              image: data.image || "profile",
            });
          }
        });
      } catch (error) {
        console.error("Failed to fetch sender", error);
      } finally {
        setLoading(false);
      }
    };

    if (senderUID) {
      fetchSender();
    }
  }, [senderUID]);

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
  ];

  return (
    <View style={styles.container}>
      {loading && <LoaderModal visible={loading} />}

      {step === 1 && (
        <>
          <Text style={styles.title}>
            {t("purposeSelectionReceive.selectPurpose")}
          </Text>
          <Text style={styles.subtitle}>
            {t("purposeSelectionReceive.selectMethod")}
          </Text>
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
            buttonText={t("purposeSelectionReceive.continue")}
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

      {step === 2 && sender && (
        <>
          <Text style={styles.title}>
            {t("purposeSelectionReceive.enterAmount")}
          </Text>
          <Text style={styles.subtitle}>
            {t("purposeSelectionReceive.enterAmountSub")}
          </Text>
          <TransferCard
            user={{
              pic: sender.image,
              name: sender.name,
              email: sender.email,
            }}
            amount={amount}
            setAmount={setAmount}
            onContinue={() => {
              dispatch(setAmountRedux(Number(amount)));
              setStep(3);
            }}
          />
        </>
      )}

      {step === 3 && sender && (
        <RequestUser
          user={{
            pic: sender.image,
            name: sender.name,
            email: sender.email,
          }}
          amount={amount}
          onContinue={() => {
            navigation.navigate("SendSummary");
          }}
        />
      )}
    </View>
  );
};

export default PurposeSelectionReceive;

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
