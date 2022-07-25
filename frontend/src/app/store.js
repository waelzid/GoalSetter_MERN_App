import { configureStore } from '@reduxjs/toolkit';
import authreducer from '../features/auth/authSlice'


export const store = configureStore({
  reducer: {
    auth:authreducer,
  },
});
