import { Middleware } from '@reduxjs/toolkit';
import { logoutUser } from './slices/authSlice';
import { persistor } from './store';

export const logoutMiddleware: Middleware = () => next => action => {
  const result = next(action);
  // Listening for fulfilled logout action
  if (logoutUser.fulfilled.match(action)) {
    // Purge persisted redux store
    persistor.purge()
      .then(() => {
        console.log('Redux persist store purged on logout.');
      })
      .catch((error) => {
        console.error('Error purging persist store:', error);
      });
  }

  return result;
};