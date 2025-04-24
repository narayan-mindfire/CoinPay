// configuration file for firebase 
import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence} from "firebase/auth";

import { getFirestore } from "firebase/firestore";
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
const firebaseConfig = {
  apiKey: "AIzaSyDUpJ-OO2fmRp3X0L_KR0Bk0dx9nKuJpog",
  projectId: "coinpay-e92e9",
  appId: "1:301717891183:android:d6973e8f7c5db3882c859a",
};

export const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);

const auth = initializeAuth(firebaseApp, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});
export {auth, db};
