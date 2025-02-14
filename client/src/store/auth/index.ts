import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IAuthState {
  email: string;
  password: string;
  name: string;
  loading: boolean;
  isLogin: boolean;
}

const initialState: IAuthState = {
  isLogin: true,
  email: "",
  password: "",
  name: "",
  loading: false,
};

const authSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setInput: (state, action: PayloadAction<{ field: "email" | "password" | "name"; value: string }>) => {
      state[action.payload.field] = action.payload.value;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setLogin: (state, action: PayloadAction<boolean>) => {
      state.isLogin = action.payload;
    },
    resetAuthState: (state) => {
      state.email = initialState.email;
      state.password = initialState.password;
      state.name = initialState.name;
      state.loading = initialState.loading;
      state.isLogin = initialState.isLogin;
    },
  },
});

export const { setInput, setLoading, setLogin, resetAuthState } = authSlice.actions;

export default authSlice.reducer;
