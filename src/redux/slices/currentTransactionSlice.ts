import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CurrentTransactionState {
  senderUID: string;
  receiverUID: string;
  selectedCard: any,
  purpose: string;
  amount: number;
}

const initialState: CurrentTransactionState = {
  senderUID: "",
  receiverUID: "",
  selectedCard: null,
  purpose: "Personal",
  amount: 0
};

// slice that handles storing data while data is being received across multiple steps by user
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
    setSelectedCard: (state, action) => {
      state.selectedCard = action.payload;
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
      state.selectedCard = null;
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
  setSelectedCard,
} = currentTransactionSlice.actions;

export default currentTransactionSlice.reducer;
