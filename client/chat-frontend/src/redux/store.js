import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import { persistStore } from "redux-persist";

export const store = configureStore({
  reducer: {
    user: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
