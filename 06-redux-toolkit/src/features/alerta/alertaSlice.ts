import { createSlice } from "@reduxjs/toolkit";

type AlertaState = { activas: boolean; totalToggles: number };
const initialState: AlertaState = { activas: false, totalToggles: 0 };

const alertaSlice = createSlice({
  name: "alerta",
  initialState,
  reducers: {
    toggle: (state) => {
      state.activas = !state.activas;
      state.totalToggles += 1;
    },
    activar: (state) => { state.activas = true; },
    desactivar: (state) => { state.activas = false; },
  }
});

export const { toggle, activar, desactivar } = alertaSlice.actions;
export default alertaSlice.reducer;
