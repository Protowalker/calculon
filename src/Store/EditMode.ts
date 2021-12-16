import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "./Store";

const initialState: boolean = false;

export const editModeSlice = createSlice({
  name: "EditMode",
  initialState,
  reducers: {
    turnOffEditMode: (state) => false,
    turnOnEditMode: (state) => true,
    toggleEditMode: (state) => !state,
  },
});

export const { turnOffEditMode, turnOnEditMode, toggleEditMode } =
  editModeSlice.actions;

export const selectEditMode = (state: RootState) => state.editMode;

export const editModeReducer = editModeSlice.reducer;
