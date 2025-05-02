import { Middleware } from '@reduxjs/toolkit';
import { logoutUser } from './slices/authSlice';
import { persistor, store} from './store';
import { clearCards } from './slices/cardSlice';

export const logoutMiddleware: Middleware = () => next => action => {
  const result = next(action);
  // Listening for fulfilled logout action
  if (logoutUser.fulfilled.match(action)) {
    store.dispatch(clearCards());
    persistor.purge()
  }

  return result;
};