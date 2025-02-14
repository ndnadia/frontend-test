import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AlertState {
  open: boolean;
  message: string;
  type: "success" | "error" | "info" | "";
}

const initialState: AlertState = {
  open: false,
  message: "",
  type: "",
};

const alertSlice = createSlice({
  name: "alert",
  initialState,
  reducers: {
    showAlert: (
      state,
      action: PayloadAction<{
        open: boolean;
        message: string;
        type: "success" | "error" | "info";
      }>
    ) => {
      state.open = action.payload.open;
      state.message = action.payload.message;
      state.type = action.payload.type;
    },
    hideAlert: (state) => {
      state.open = false;
    },
  },
});

export const { showAlert, hideAlert } = alertSlice.actions;
export default alertSlice.reducer;
