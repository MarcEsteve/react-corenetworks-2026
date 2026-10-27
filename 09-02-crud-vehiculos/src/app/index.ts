import { configureStore } from "@reduxjs/toolkit";
import alertaReducer from "../features/alerta/alertaSlice";

export const store = configureStore({
  reducer: { alerta: alertaReducer },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
