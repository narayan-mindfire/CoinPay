import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CurrentTransactionState {
  senderUID: string;
  receiverUID: string;
  purpose: string;
  amount: number;
}

const initialState: CurrentTransactionState = {
  senderUID: "",
  receiverUID: "",
  purpose: "Personal",
  amount: 0
};

const currentTransactionSlice = createSlice({
  name: "currentTransaction",
  initialState,
  reducers: {
    setSenderUID(state, action: PayloadAction<string>) {
        state.senderUID = action.payload;
        console.log("added sender uid and this is state ",state)
    },
    setReceiverUID(state, action: PayloadAction<string>) {
        state.receiverUID = action.payload;
        console.log("added receiver uid and this is state ",state)
    },
    setPurpose(state, action: PayloadAction<string>) {
      state.purpose = action.payload;
      console.log("added purpose and this is state ",state)
    },
    setAmount(state, action: PayloadAction<number>) {
        state.amount = action.payload;
        console.log("added amount and this is state ",state)
    },
    clearCurrentTransaction(state) {
      state.senderUID = "";
      state.receiverUID = "";
      state.purpose = undefined;
      state.amount = undefined;
    },
  },
});

export const {
  setSenderUID,
  setReceiverUID,
  setPurpose,
  setAmount,
  clearCurrentTransaction,
} = currentTransactionSlice.actions;

export default currentTransactionSlice.reducer;
