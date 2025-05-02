import { RootState } from '../store';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { collection, doc, addDoc, getDocs, deleteDoc } from 'firebase/firestore';
import { db } from '@/firebaseConfig';

type Card = {
    id: string;
    card: string;
    name: string;
    expiry: string;
    createdAt?: any;
    email?: string;
    cvv?: string;
  };

interface CardState {
  loading: boolean;
  success: boolean;
  error: string | null;
  cards: Card[]
}

const initialState: CardState = {
  loading: false,
  success: false,
  error: null,
  cards: [],
};

interface CardDetails {
    name: string;
    email: string;
    card: string;
    expiry: string;
    cvv: string;
}  

//adding cards to firestore
export const addCardToFirebase = createAsyncThunk(
    'cards/addCardToFirebase',
    async (cardDetails: CardDetails, { getState, rejectWithValue }) => {
      try {
        const state = getState() as RootState;
        const userId = state.auth.user?.uid;
  
        if (!userId) {
          return rejectWithValue('User not authenticated');
        }
  
        const userRef = doc(db, 'users', userId);
        const cardRef = collection(userRef, 'cards');
  
        await addDoc(cardRef, {
          ...cardDetails,
          createdAt: new Date(),
        });
        return 'Success';
      } catch (error) {
        return rejectWithValue(error.message);
      }
    }
  );

  //fetching the cards of user from firestore

  export const getCardsFromFirebase = createAsyncThunk(
    "cards/getCardsFromFirebase",
    async (_, { getState, rejectWithValue }) => {
      try {
        const state = getState() as RootState;
        const userId = state.auth.user?.uid;
  
        if (!userId) {
          return rejectWithValue("User not authenticated");
        }
  
        const userRef = doc(db, "users", userId);
        const cardsRef = collection(userRef, "cards");
        const snapshot = await getDocs(cardsRef);
  
        const cards = snapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            id: doc.id,
            card: data.card || '',
            name: data.name || '',
            expiry: data.expiry || '',
            createdAt: data.createdAt || null,
            email: data.email || '',
            cvv: data.cvv || '',
          };
        });
  
        return cards;
      } catch (error: any) {
        return rejectWithValue(error.message);
      }
    }
  );

  //to delete specific cards
  export const deleteCardFromFirebase = createAsyncThunk(
    "cards/deleteCardFromFirebase",
    async (cardId: string, { getState, rejectWithValue }) => {
      try {
        const state = getState() as RootState;
        const userId = state.auth.user?.uid;
  
        if (!userId) {
          return rejectWithValue("User not authenticated");
        }
  
        const userRef = doc(db, "users", userId);
        const cardDocRef = doc(userRef, "cards", cardId);
  
        await deleteDoc(cardDocRef);
  
        return cardId;
      } catch (error: any) {
        return rejectWithValue(error.message);
      }
    }
  );
  
  
//card slice handles the states of thunk
const cardSlice = createSlice({
  name: 'cards',
  initialState,
  reducers: {
    resetCardState: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
    },
    clearCards: (state) => {
      state.cards = [];
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(addCardToFirebase.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(addCardToFirebase.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
        state.error = null;
      })
      .addCase(addCardToFirebase.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload as string;
      })
      .addCase(getCardsFromFirebase.pending, (state) => {
        state.loading = true;
      })
      .addCase(getCardsFromFirebase.fulfilled, (state, action) => {
        state.loading = false;
        state.cards = action.payload;
      })
      .addCase(getCardsFromFirebase.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(deleteCardFromFirebase.fulfilled, (state, action) => {
        state.cards = state.cards.filter((card) => card.id !== action.payload);
      })
      .addCase(deleteCardFromFirebase.rejected, (state, action) => {
        state.error = action.payload as string;
      });
  },
});

export const { resetCardState, clearCards } = cardSlice.actions;
export default cardSlice.reducer;
