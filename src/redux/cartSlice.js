import { createSlice } from "@reduxjs/toolkit";

const cart = createSlice({
  name: 'cart',
  initialState: [],
  reducers: {
    addItem(state, action) {
      const index = state.findIndex((findId) => findId.id === action.payload.id)
      if (index > -1) {
        state[index].count += action.payload.count;
        state[index].options = action.payload.options;
      } else {
        state.push(action.payload);
      }
    }, // addItem
    deleteItem(state, action) {
      const index = state.findIndex((findId) => findId.id === action.payload);
      state.splice(index, 1);
    }, // deleteItem
    addCount(state, action) {
      const index = state.findIndex((findId) => findId.id === action.payload);
      state[index].count++;
    }, // addCount
    subCount(state, action) {
      const index = state.findIndex((findId) => findId.id === action.payload);
      state[index].count--;
    }, // subCount
    clearCart: () => {
      return [];
    }
  }
});

export const { addItem, deleteItem, addCount, subCount, clearCart } = cart.actions;
export default cart.reducer;

