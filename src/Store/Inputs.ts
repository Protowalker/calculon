import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { NumberInputData } from "../components/Inputs/NumberInput";
import { TextInputData } from "../components/Inputs/TextInput";
import { ToggleInputData } from "../components/Inputs/ToggleInput";
import { RootState } from "./Store";

export type InputData =
  | typeof TextInputData
  | typeof ToggleInputData
  | typeof NumberInputData;

function loadFromLocalStorage(): Record<string, InputData> | undefined {
  const jsonString = localStorage.getItem("calculonInputData");
  if (jsonString === null) return;
  const data = JSON.parse(jsonString);
  return data as Record<string, InputData>;
}

const initialState: Record<string, InputData> = loadFromLocalStorage() ?? {
  aTextInput: {
    kind: "text",
    name: "aTextInput",
    displayName: "A Text Input",
    value: "heyo",
    order: 0,
  },
  aToggleInput: {
    kind: "toggle",
    name: "aToggleInput",
    displayName: "A Toggle Input",
    value: true,
    order: 1,
  },
  aNumberInput: {
    kind: "number",
    name: "aNumberInput",
    displayName: "A Number Input",
    value: 10,
    order: 2,
  },
};

export const inputsSlice = createSlice({
  name: "Inputs",
  initialState,
  reducers: {
    addInput: (state, action: PayloadAction<InputData>) => {
      const payload = { ...action.payload };
      if (payload.name in state) return;
      // Generate a new name if empty
      if (payload.name === "")
        payload.name = payload.kind + Object.keys(state).length.toString();
      // If order is -1, Push it to the end
      if (payload.order === -1) payload.order = Object.keys(state).length;

      payload.order = Math.min(payload.order, Object.keys(state).length);

      state[payload.name] = payload;
    },
    removeInput: (state, action: PayloadAction<string>) => {
      delete state[action.payload];
    },
    changeInput: (state, action: PayloadAction<InputData>) => {
      // Don't allow invalid numbers
      if (action.payload.kind === "number" && isNaN(action.payload.value))
        return;
      state[action.payload.name] = { ...action.payload };
    },
  },
});

export const { addInput, removeInput, changeInput } = inputsSlice.actions;

export const selectInputNames = (state: RootState) => Object.keys(state.inputs);
export const selectInputs = (state: RootState) => state.inputs;

export const selectInput = (state: RootState, name: string) =>
  state.inputs[name];

export const inputsReducer = inputsSlice.reducer;
