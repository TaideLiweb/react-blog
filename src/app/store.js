import { configureStore } from '@reduxjs/toolkit';
import navReducer from '../component/navSlice';
export const store = configureStore({
  reducer: {
    nav: navReducer,
  },
});
