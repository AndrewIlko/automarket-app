import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isToken: sessionStorage.getItem("token") ? true : false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
});

export const userReducer = userSlice.reducer;
export const userActions = userSlice.actions;
