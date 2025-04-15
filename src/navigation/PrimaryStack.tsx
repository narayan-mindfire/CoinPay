import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { PrimaryStackParamList } from "./NavigationTypes";
import AddCard from "../Screens/cards/AddCard";
import CardForm from "../Screens/cards/CardForm";
import VerifyCard from "../Screens/cards/VerifyCard";
import cardList from "../Screens/cards/CardList";
import BottomTab from "./BottomTab";
const Stack = createNativeStackNavigator<PrimaryStackParamList>();

const PrimaryStack: React.FC = () => {
  return (
    <Stack.Navigator id={undefined} screenOptions={{ headerShown: false }}>
      <Stack.Screen name="AddCard" component={AddCard} />
      <Stack.Screen name="CardForm" component={CardForm} />
      <Stack.Screen name="VerifyCard" component={VerifyCard} />
      <Stack.Screen name="CardList" component={cardList} />
      <Stack.Screen name="BottomTab" component={BottomTab} />
    </Stack.Navigator>
  );
};

export default PrimaryStack;
