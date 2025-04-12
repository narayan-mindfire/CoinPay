// configuration file for firebase 
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDUpJ-OO2fmRp3X0L_KR0Bk0dx9nKuJpog",
  authDomain: "xxx.firebaseapp.com",
  projectId: "coinpay-e92e9",
  storageBucket: "xxx.appspot.com",
  messagingSenderId: "xxx",
  appId: "1:301717891183:android:d6973e8f7c5db3882c859a",
};

export const firebaseApp = initializeApp(firebaseConfig);
export const db = getFirestore(firebaseApp);
