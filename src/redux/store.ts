import { configureStore } from '@reduxjs/toolkit';
import userFormReducer from './slices/userFormSlice';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import authReducer from "./slices/authSlice"
// import { persistStore } from "redux-persist";
export const store = configureStore({
  reducer: {
    userForm: userFormReducer,
    authenticator: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    })
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// export const persistor = persistStore(store);

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;