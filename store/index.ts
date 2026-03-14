import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "./todoSlice";
import userReducer from "./userSlice";

const store = configureStore({
  reducer: {
    todo: todoReducer,
    user: userReducer,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
