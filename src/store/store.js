import { configureStore } from '@reduxjs/toolkit';
import { loginSlice, signUpSlice } from './authSlice';

export default configureStore({
  reducer: {
    login: loginSlice.reducer,
    signup: signUpSlice.reducer,
  },
});
