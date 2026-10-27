import { configureStore } from "@reduxjs/toolkit";
import alertaReducer from "../features/alerta/alertaSlice";
import vehiculosReducer from "../features/vehiculos/vehiculosSlice";


export const store = configureStore({
  reducer: { alerta: alertaReducer, vehiculos: vehiculosReducer },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export { useAppDispatch, useAppSelector } from "./store";

