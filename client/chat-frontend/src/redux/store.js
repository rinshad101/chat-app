import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import messageSlice from "./messageSlice";
import roomSlice from "./roomSlice";
import { persistStore } from "redux-persist";

export const store = configureStore({
  reducer: {
    user: authReducer,
    message: messageSlice,
    room: roomSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
