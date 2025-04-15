import React, { useEffect } from "react";
import RootStack from "./navigation/RootStack";
import { Provider } from "react-redux";
import { store, useAppDispatch } from "./redux/store";

export const App = () => {
  return (
    <Provider store={store}>
      <RootStack />
    </Provider>
  );
};

export default App;
