import { configureStore } from "@reduxjs/toolkit";
import toDoSlice from "../features/toDoSlice";
const store = configureStore({
  reducer: toDoSlice,
});

export default store;