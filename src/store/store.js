import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "../features/userReducer";
import { filterReducer } from "../features/filterReducer";
const store = configureStore({
  reducer: {
    user: userReducer,
    filter: filterReducer,
  },
});

export default store;
