import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export type NoticeKind = "success" | "error";

interface UiState {
  notice: { message: string; kind: NoticeKind } | null;
}

const initialState: UiState = { notice: null };

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    showNotice: (
      state,
      action: PayloadAction<{ message: string; kind: NoticeKind }>,
    ) => {
      state.notice = action.payload;
    },
    clearNotice: (state) => {
      state.notice = null;
    },
  },
});

export const { showNotice, clearNotice } = uiSlice.actions;
export default uiSlice.reducer;
