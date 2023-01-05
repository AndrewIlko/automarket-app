import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  images: [],
  category: "",
  make: "",
  model: "",
  year: "",
  city: "",
  VIN: "",
};

const sellSlice = createSlice({
  name: "sell",
  initialState,
  reducers: {
    setImages: (state, action) => {
      state.images = action.payload;
    },
    setParam: (state, action) => {
      const { type, param } = action.payload;
      state[type] = param;
    },
  },
});

export const sellReducer = sellSlice.reducer;
export const sellActions = sellSlice.actions;
