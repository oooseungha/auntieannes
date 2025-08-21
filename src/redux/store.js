import { configureStore } from "@reduxjs/toolkit";
import countOneReducer from './optionCountOneSlice';
import cartReducer from './cartSlice';

const store = configureStore({
  reducer: {
    optionCounterOne: countOneReducer,
    cart: cartReducer,
  }
});

export default store;