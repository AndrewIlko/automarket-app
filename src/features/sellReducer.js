import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  images: [],
  category: "",
  make: "",
  model: "",
  year: "",
  city: "",
  VIN: "",
  price: "",
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
      if (type == "make") state["model"] = "";
    },
    setImageOrder: (state, action) => {
      const firstImage = state.images[0];
      const toSetImage = state.images[action.payload];

      state.images[0] = toSetImage;
      state.images[action.payload] = firstImage;
    },
    clearAll: (state) => {
      state.category = "";
      state.images = [];
      state.make = "";
      state.model = "";
      state.year = "";
      state.city = "";
      state.VIN = "";
      state.price = "";
    },
  },
});

export const sellReducer = sellSlice.reducer;
export const sellActions = sellSlice.actions;
