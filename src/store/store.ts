import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./reducers/userReducer";
import { userMiddleware } from "./middlewares/userMiddleware";
export const store = configureStore({
  reducer: {
    user: userReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().prepend(userMiddleware),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
