import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { isAnyOf } from '@reduxjs/toolkit';

import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth, db } from '@/firebaseConfig';

import { doc, getDoc } from 'firebase/firestore';


interface AuthState {
    token: string | null;
  user: any;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  token: null,
  user: null,
  loading: false,
  error: null,
};

//async thunk to create user
export const registerUser = createAsyncThunk(
  'auth/register',
  async ({ email, password }: { email: string; password: string }, { rejectWithValue }) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const uid = userCredential.user.uid;
      await signOut(auth);
      return { user: userCredential.user, uid };
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);


//user login thunk
export const loginUser = createAsyncThunk(
  'auth/login',
  async ({ email, password }: { email: string; password: string }, { rejectWithValue }) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const token = await userCredential.user.getIdToken();
      const uid = userCredential.user.uid;
      const userDoc = await getDoc(doc(db, 'users', uid));
      if (!userDoc.exists()) {
        throw new Error('User profile not found in Firestore');
      }
      const userData = userDoc.data();
      console.log('User data:', userData);
      return {
        token,
        user: {
          uid,
          email: userCredential.user.email,
          ...userData, 
        },
      };
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchUserProfile = createAsyncThunk(
  "auth/fetchUserProfile",
  async (uid: string, thunkAPI) => {
    try {
      const userDoc = await getDoc(doc(db, "users", uid));
      if (userDoc.exists()) {
        return userDoc.data(); 
      } else {
        return thunkAPI.rejectWithValue("User not found");
      }
    } catch (error) {
      return thunkAPI.rejectWithValue("Failed to fetch user profile");
    }
  }
);
  
export const logoutUser = createAsyncThunk('auth/logout', async () => {
  await signOut(auth);
});
  
// Slice
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
    .addCase(loginUser.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload.user;
      state.token = action.payload.token;
    })
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.token = null;
      })
      builder.addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.user = {
          ...state.user,
          ...action.payload,
        };
      })
      .addMatcher(
        isAnyOf(registerUser.pending, loginUser.pending),
        (state) => {
          state.loading = true;
          state.error = null;
        }
      )
      //Matching all rejected states
      .addMatcher(
        isAnyOf(registerUser.rejected, loginUser.rejected),
        (state, action) => {
          state.loading = false;
          state.error = action.payload as string;
        }
      )
      //Matching all fulfilled states
      .addMatcher(
        isAnyOf(registerUser.fulfilled),
        (state) => {
          state.loading = false;
        }
      );
  },
});

export default authSlice.reducer;
