import { IUser } from "@/types/user";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IUserState {
  user: IUser | null;
  token: string;
}

const initialState: IUserState = {
  user: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")!) : null,
  token: localStorage.getItem("token") || "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserAndToken: (state, action: PayloadAction<IUserState>) => {
      const { user, token } = action.payload;
      if (user) {
        state.user = user;
        localStorage.setItem("user", JSON.stringify(user));
      }
      if (token) {
        state.token = token;
        localStorage.setItem("token", token);
      }
    },
    clearUserAndToken: (state) => {
      state.user = null;
      state.token = "";
      localStorage.removeItem("user");
      localStorage.removeItem("token");
    },
  },
});

export const { setUserAndToken, clearUserAndToken } = userSlice.actions;

export default userSlice.reducer;
