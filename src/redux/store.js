import { configureStore } from "@reduxjs/toolkit";
// import countReducer from './counterSlice';
import cartReducer from './cartSlice';

const store = configureStore({
  reducer: {
    // counter: countReducer,
    cart: cartReducer,
  }
});

export default store;