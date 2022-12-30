import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  category: "light",
  make: "",
  model: "",
  year: "",
  mileage: "",
  price: "",
  city: "",
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setCategory: (state, action) => {
      state.category = action.payload;
    },
    setTypeValue: (state, action) => {
      const { type, option: value } = action.payload;
      if (type == "make") state["model"] = "";
      state[type] = value;
    },
    deleteTypeValue: (state, action) => {
      state[action.payload] = "";
    },
  },
});

export const filterActions = filterSlice.actions;
export const filterReducer = filterSlice.reducer;
