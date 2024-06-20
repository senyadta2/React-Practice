import { configureStore } from "@reduxjs/toolkit";
import fileSlice from "../features/fileSlice";
 const store = configureStore({
    reducer:fileSlice
})

export default store