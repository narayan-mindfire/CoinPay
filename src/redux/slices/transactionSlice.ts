import {
    createAsyncThunk,
    createSlice,
    PayloadAction,
    isPending,
    isRejected,
} from "@reduxjs/toolkit";

import {
    collection,
    addDoc,
    getDocs,
    query,
    where,
    serverTimestamp,
    setDoc,
    doc,
    updateDoc,
    increment,
} from "firebase/firestore";

export interface Transaction {
    id?: string;
    amount: number;
    senderUID: string;
    receiverUID: string;
    purpose: string;
    createdAt?: any;
}

import { db } from "@/firebaseConfig";
  
  interface TransactionState {
    transactions: Transaction[];
    loading: boolean;
    error: string | null;
  }
  
  const initialState: TransactionState = {
    transactions: [],
    loading: false,
    error: null,
  };
  
  // Fetchs transactions for a user (both as sender & receiver)
  export const fetchUserTransactions = createAsyncThunk<
    Transaction[],
    string,
    { rejectValue: string }
  >("transactions/fetchUserTransactions", async (uid, thunkAPI) => {
    try {
      const transactionsRef = collection(db, "transactions");
      const senderQuery = query(transactionsRef, where("senderUID", "==", uid));
      const receiverQuery = query(
        transactionsRef,
        where("receiverUID", "==", uid)
      );
  
      const [senderSnap, receiverSnap] = await Promise.all([
        getDocs(senderQuery),
        getDocs(receiverQuery),
      ]);
  
      const txList: Transaction[] = [];
  
      senderSnap.forEach((doc) => {
        txList.push({ id: doc.id, ...doc.data() } as Transaction);
      });
  
      receiverSnap.forEach((doc) => {
        const tx = { id: doc.id, ...doc.data() } as Transaction;
        if (!txList.some((t) => t.id === tx.id)) {
          txList.push(tx);
        }
      });
  
      return txList;
    } catch (error) {
      return thunkAPI.rejectWithValue("Failed to fetch transactions");
    }
  });
  
  // Creates a new transaction
  export const createTransaction = createAsyncThunk<
    void,
    Transaction,
    { rejectValue: string }
  >("transactions/createTransaction", async (transaction, thunkAPI) => {
    try {
      const newTx = {
        ...transaction,
        createdAt: serverTimestamp(),
      };
      await addDoc(collection(db, "transactions"), newTx);
      await updateDoc(doc(db, "users", transaction.receiverUID), {
        accBalance: increment(transaction.amount) 
      });
      console.log("incremented balance")
      await updateDoc(doc(db, "users", transaction.senderUID), {
        accBalance: increment(-transaction.amount) 
      });
      console.log("decremented balance")
      console.log("document added")
      console.log(transaction)
    } catch (error) {
      return thunkAPI.rejectWithValue("Failed to create transaction");
    }
  });
  
  const transactionSlice = createSlice({
    name: "transactions",
    initialState,
    reducers: {
      clearTransactions(state) {
        state.transactions = [];
        state.loading = false;
        state.error = null;
      },
    },
    extraReducers: (builder) => {
      builder
        .addCase(
          fetchUserTransactions.fulfilled,
          (state, action: PayloadAction<Transaction[]>) => {
            state.transactions = action.payload;
          }
        )
        .addCase(createTransaction.fulfilled, (state) => {
        });
      builder
        .addMatcher(isPending(fetchUserTransactions, createTransaction), (state) => {
          state.loading = true;
          state.error = null;
        })
        .addMatcher(
          isRejected(fetchUserTransactions, createTransaction),
          (state, action) => {
            state.loading = false;
            state.error = action.payload ?? "Something went wrong";
          }
        )
        .addMatcher(
          (action): action is PayloadAction<any> =>
            action.type.endsWith("/fulfilled"),
          (state) => {
            state.loading = false;
            state.error = null;
          }
        );
    },
  });
  
  export const { clearTransactions } = transactionSlice.actions;
  
  export default transactionSlice.reducer;