import { configureStore, combineReducers } from '@reduxjs/toolkit';

import userFormReducer from './slices/userFormSlice';
import themeReducer from './slices/themeSlice';
import authReducer from './slices/authSlice';
import cardReducer from './slices/cardSlice'
import currentTransactionReducer from "./slices/currentTransactionSlice";
import transactionReducer from "./slices/transactionSlice";
import languageReducer from "./slices/languageSlice"
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['auth', 'theme', 'card', 'currentTransaction', 'language'],
};

//combining all reducers
const rootReducer = combineReducers({
  userForm: userFormReducer,
  auth: authReducer,
  theme: themeReducer,
  card : cardReducer,
  transaction : transactionReducer,
  currentTransaction: currentTransactionReducer,
  language: languageReducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
