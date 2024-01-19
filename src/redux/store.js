import { configureStore } from "@reduxjs/toolkit";
import { translateSlice } from "./translateSlice";

export const store = configureStore({
  reducer: {
    translate: translateSlice.reducer,
  },
});
