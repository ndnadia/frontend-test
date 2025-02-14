import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  userName: string;
}

const initialState: UserState = {
  userName: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<{ userName: string }>) => {
      state.userName = action.payload.userName;
    },
    logout: (state) => {
      state.userName = "";
    },
  },
});

export const { setUser, logout } = userSlice.actions;
export default userSlice.reducer;
