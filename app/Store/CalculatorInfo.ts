import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "./Store";

const initialState: string = "A Calculator";

export const calcNameSlice = createSlice({
  // TODO: For now just name. Later we'll have more
  name: "calcName",
  initialState,
  reducers: {
    changeName: (state, action) => action.payload,
  },
});

export const { changeName } = calcNameSlice.actions;

export const selectCalcName = (state: RootState) => state.calcName;

export const calcNameReducer = calcNameSlice.reducer;
