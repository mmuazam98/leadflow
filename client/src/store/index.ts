import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./user";
import authReducer from "./auth";
import appReducer from "./app";

const store = configureStore({
  reducer: {
    user: userReducer,
    auth: authReducer,
    app: appReducer,
  },
});

export type AppDispatch = typeof store.dispatch;

export type RootState = ReturnType<typeof store.getState>;

export default store;
