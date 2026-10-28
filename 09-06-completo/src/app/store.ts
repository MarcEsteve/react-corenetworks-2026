import { configureStore } from "@reduxjs/toolkit";
import vehiculosReducer from "../features/vehiculos/vehiculosSlice";
import uiReducer from "../features/ui/uiSlice";

export const store = configureStore({
  reducer: {
    vehiculos: vehiculosReducer,
    ui: uiReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
