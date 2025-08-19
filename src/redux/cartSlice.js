import { createSlice } from "@reduxjs/toolkit";

const cart = createSlice({
  name: 'cart',
  initialState: [],
  reducers: {
    addItem(state, action) {
      const index = state.findIndex((findId) => findId.id === action.payload.id)
      if (index > -1) {
        state[index].count++;
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
    },
    subCount(state, action) {
      const index = state.findIndex((findId) => findId.id === action.payload);
      state[index].count--;
    }
  }
});

export const { addItem, deleteItem, addCount, subCount } = cart.actions;
export default cart.reducer;

