import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  admin: false,
  loggedIn: false,
  value: 0,
};

export const navSlice = createSlice({
  name: 'nav',
  initialState,
  reducers: {
    setAdmin: (state, action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.admin = action.payload;
    },
    setLoggedIn: (state, action) => {
      state.loggedIn = action.payload;
    },
    // incrementByAmount: (state, action) => {
    //   state.value += action.payload;
    // },
  },
});

// Action creators are generated for each case reducer function
export const { setAdmin, setLoggedIn } = navSlice.actions;

export default navSlice.reducer;
