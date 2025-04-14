import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth } from '@/firebaseConfig';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
      console.log("user credentials: ")
      console.log(userCredential)
      //immediately signing the user out to let them log-in in the subsequent screen
      await signOut(auth);
    // Saving usertoken and userdata in local async storage
    return userCredential.user;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

//user login thunk
export const loginUser = createAsyncThunk(
    'auth/login',
    async ({ email, password }: { email: string; password: string }, { rejectWithValue, dispatch }) => {
      try {
        console.log("user logging in")
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        console.log("user credentials generated")
        const token = await userCredential.user.getIdToken();
        console.log("token: ", token)
        await AsyncStorage.setItem('authToken', token);
        await AsyncStorage.setItem('authUser', JSON.stringify(userCredential.user));
        dispatch(loadUserFromStorage());
        return { user: userCredential.user, token };
      } catch (error: any) {
        return rejectWithValue(error.message);
      }
    }
  );
  
export const logoutUser = createAsyncThunk('auth/logout', async () => {
  await signOut(auth);
  AsyncStorage.removeItem("authToken")
  AsyncStorage.removeItem("authUser")
});

// loading the persisted user when app launches
export const loadUserFromStorage = createAsyncThunk('auth/loadUser', async () => {
    const token = await AsyncStorage.getItem('authToken');
    const user = await AsyncStorage.getItem('authUser');
    return {
      token,
      user: user ? JSON.parse(user) : null,
    };
  });
  
  

// Slice
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(registerUser.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, state => {
        state.loading = false;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(loginUser.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.token = null;
      })
      .addCase(loadUserFromStorage.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
  },
});

export default authSlice.reducer;
