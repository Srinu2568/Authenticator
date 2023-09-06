import { createSlice } from '@reduxjs/toolkit';

const initialLoginState = {
  user: null,
  loading: false,
  error: false,
  errors: {},
  isLoggedIn: false,
};

const initialSignUpState = {
  loading: false,
  error: false,
  errors: {},
};

export const loginSlice = createSlice({
  name: 'login',
  initialState: initialLoginState,
  reducers: {
    login: (state, action) => {
      if (action.payload.error) {
        state.error = true;
        state.errors = action.payload.errors;
        return;
      }else{
        
        state.error = false
        state.errors = action.payload.errors;
        state.user = action.payload.user;
        state.isLoggedIn = action.payload.isLoggedIn;
        return
      }
      
    },
    toggleLoading: (state, action) => {
      state.loading = action.payload.loading;
    },
  },
});

export const signUpSlice = createSlice({
  name: 'signup',
  initialState: initialSignUpState,
  reducers: {
    signup: (state, action) => {
      if (action.payload.error) {
        state.error = true;
        state.errors = action.payload.errors;
        return;
      }
    },
    toggleSignupLoading: (state, action) => {
      state.loading = action.payload.loading;
    },
  },
});

export const { login, toggleLoading } = loginSlice.actions;
export const { signup, toggleSignupLoading } = signUpSlice.actions;
