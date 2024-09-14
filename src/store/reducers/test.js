import { createSlice } from "@reduxjs/toolkit";

const initialState = 'reducer test';

const testSlice = createSlice({
  name: 'test',
  initialState,
  reducers: {
    test: (state, action) => {
      return action.payload;
    }
  }
});

export const { test } = testSlice.actions;
export default testSlice.reducer;