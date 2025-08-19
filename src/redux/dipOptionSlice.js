import { createSlice } from "@reduxjs/toolkit";

const dipOptionSlice = createSlice({
  name: 'dipOption',
  initialState: { chedda: 0, cream: 0, hotSalsa: 0},
  reducers: {
    increment: (state, action) => {
      state[action.payload.option] += action.payload.amount;
    },
    decrement: (state, action) => {
      if(state[action.payload] > 0) state[action.payload]--
    },
    setCount: (state, action) => {
      return action.payload;
    }
  },
});

export const { increment, decrement, setCount } = dipOptionSlice.actions;
export default dipOptionSlice.reducer;