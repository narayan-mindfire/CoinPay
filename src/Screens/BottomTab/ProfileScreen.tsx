import { StyleSheet, View } from "react-native";

import Button from "@/src/components/Button";

import { useAppDispatch } from "@/src/redux/store";
import { logoutUser } from "@/src/redux/slices/authSlice";

export default function App() {
  const dispatch = useAppDispatch();
  function handleLogout() {
    try {
      console.log("logging out user");
      dispatch(logoutUser());
    } catch (error) {
      console.log("error logging out: ", error);
    }
  }
  return (
    <View style={styles.container}>
      <Button handleButton={handleLogout} buttonText="log out" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
