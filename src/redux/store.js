import { configureStore } from "@reduxjs/toolkit";
import countOneReducer from './optionCountOneSlice';
import cartReducer from './cartSlice';
import dipOptionReducer from './dipOptionSlice';

const store = configureStore({
  reducer: {
    optionCounterOne: countOneReducer,
    cart: cartReducer,
    dipOption: dipOptionReducer,
  }
});

export default store;