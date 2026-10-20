import { createSlice } from "@reduxjs/toolkit";

type AlertaState = { activas: boolean; totalToggles: number; totalTogglesActivar: number; totalTogglesDesactivar: number; };
const initialState: AlertaState = { activas: false, totalToggles: 0, totalTogglesActivar: 0, totalTogglesDesactivar: 0 };

const alertaSlice = createSlice({
  name: "alerta",
  initialState,
  reducers: {
    toggle: (state) => {
      state.activas = !state.activas;
      state.totalToggles += 1;
    },
    activar: (state) => { state.activas = true; state.totalTogglesActivar += 1; },
    desactivar: (state) => { state.activas = false; state.totalTogglesDesactivar += 1; },
  }
});

export const { toggle, activar, desactivar } = alertaSlice.actions;
export default alertaSlice.reducer;
