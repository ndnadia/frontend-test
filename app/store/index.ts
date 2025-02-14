import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./redux/userSlice";
import alertReducer from "./redux/alertSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    alert: alertReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
