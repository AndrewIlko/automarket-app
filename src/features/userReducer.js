import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isToken: sessionStorage.getItem("token") ? true : false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.isToken = action.payload;
    },
  },
});

export const userReducer = userSlice.reducer;
export const userActions = userSlice.actions;
