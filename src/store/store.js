import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "../features/userReducer";
import { filterReducer } from "../features/filterReducer";
import { sellReducer } from "../features/sellReducer";

const store = configureStore({
  reducer: {
    user: userReducer,
    filter: filterReducer,
    sell: sellReducer,
  },
});

export default store;
