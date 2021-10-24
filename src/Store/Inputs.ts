import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { NumberInputData } from "../components/Inputs/NumberInput";
import { TextInputData } from "../components/Inputs/TextInput";
import { ToggleInputData } from "../components/Inputs/ToggleInput";
import { RootState } from "./Store";

export type InputData = TextInputData | ToggleInputData | NumberInputData;

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
    order: 1,
  },
  aToggleInput: {
    kind: "toggle",
    name: "aToggleInput",
    displayName: "A Toggle Input",
    value: true,
    order: 10,
  },
  aNumberInput: {
    kind: "number",
    name: "aNumberInput",
    displayName: "A Number Input",
    value: 10,
    order: 3,
  },
};

export const inputsSlice = createSlice({
  name: "Inputs",
  initialState,
  reducers: {
    addInput: (state, action: PayloadAction<InputData>) => {
      // Do nothing if it already exists
      if (action.payload.name in state) return;
      state[action.payload.name] = action.payload;
    },
    removeInput: (state, action: PayloadAction<string>) => {
      delete state[action.payload];
    },
    changeInput: (state, action: PayloadAction<InputData>) => {
      // Don't allow invalid numbers
      if (action.payload.kind === "number" && isNaN(action.payload.value))
        return;
      state[action.payload.name] = action.payload;
    },
  },
});

export const { addInput, removeInput, changeInput } = inputsSlice.actions;

export const selectInputNames = (state: RootState) => Object.keys(state.inputs);
export const selectInputs = (state: RootState) => state.inputs;

export const selectInput = (state: RootState, name: string) =>
  state.inputs[name];

export const inputsReducer = inputsSlice.reducer;
