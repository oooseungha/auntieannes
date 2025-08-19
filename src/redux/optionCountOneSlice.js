import { createSlice } from "@reduxjs/toolkit";

const optionCounterOne = createSlice({
  name: 'optionCounterOne',
  initialState: {value: 1},
  reducers: {
    incrementByAmount: (state, action) => {
      state.value += action.payload;
    },
    decrementByAmount: (state, action) => {
      state.value -= action.payload;
    },
    setCount: (state, action) => {
      state.value = action.payload;
    }

  },
});

export const { incrementByAmount, decrementByAmount, setCount } = optionCounterOne.actions;
export default optionCounterOne.reducer;