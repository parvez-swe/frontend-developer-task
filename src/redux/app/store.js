import { configureStore } from "@reduxjs/toolkit";

import userDataReducer from "../features/auth/userDataSlice";

export const store = configureStore({
  reducer: {
    userData: userDataReducer,
  },
});
