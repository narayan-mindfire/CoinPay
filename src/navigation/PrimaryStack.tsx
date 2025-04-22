import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { PrimaryStackParamList } from "./NavigationTypes";
import AddCard from "../Screens/cards/AddCard";
import CardForm from "../Screens/cards/CardForm";
import VerifyCard from "../Screens/cards/VerifyCard";
import cardList from "../Screens/cards/CardList";
import BottomTab from "./BottomTab";
import React from "react";
import ChooseRecepient from "../Screens/send/ChooseRecepient";
import PurposeSelection from "../Screens/send/PurposeSelection";
import SendSummary from "../Screens/send/SendSummary";
import ChooseSender from "../Screens/receive/ChooseSender";
import PurposeSelectionReceive from "../Screens/receive/PurposeSelectionReceive";
import ReceiveQR from "../Screens/receive/ReceiveQR";
import { HeaderPrimary } from "../components/HeaderPrimary";
import { SafeAreaView } from "react-native-safe-area-context";
const Stack = createNativeStackNavigator<PrimaryStackParamList>();

const PrimaryStack: React.FC = () => {
  const [cardsPresent, setCardsPresent] = React.useState(true);
  return (
    <SafeAreaView style={{ flex: 1 }} edges={["top", "bottom"]}>
      <HeaderPrimary />
      <Stack.Navigator id={undefined} screenOptions={{ headerShown: false }}>
        {cardsPresent && (
          <>
            <Stack.Screen name="AddCard" component={AddCard} />
            <Stack.Screen name="CardForm" component={CardForm} />
            <Stack.Screen name="VerifyCard" component={VerifyCard} />
            <Stack.Screen name="CardList" component={cardList} />
          </>
        )}
        <Stack.Screen name="BottomTab" component={BottomTab} />
        <Stack.Screen name="ChooseRecepient" component={ChooseRecepient} />
        <Stack.Screen name="PurposeSelection" component={PurposeSelection} />
        <Stack.Screen name="ReceiveQR" component={ReceiveQR} />
        <Stack.Screen name="SendSummary" component={SendSummary} />
        <Stack.Screen name="ChooseSender" component={ChooseSender} />
        <Stack.Screen
          name="PurposeSelectionReceive"
          component={PurposeSelectionReceive}
        />
      </Stack.Navigator>
    </SafeAreaView>
  );
};

export default PrimaryStack;
