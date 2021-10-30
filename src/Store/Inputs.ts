import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { generateRecord, KeyedRecord } from "util/TypeUtils";
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

const initialState: KeyedRecord<"name", InputData> =
  loadFromLocalStorage() ??
  generateRecord<"name", InputData>(
    [
      {
        kind: "text",
        name: "name",
        displayName: "Name",
        value: "Jackie",
        order: 0,
      },
      {
        kind: "toggle",
        name: "tm",
        displayName: "Trademark?",
        value: true,
        order: 1,
      },
      {
        kind: "number",
        name: "prevAge",
        displayName: "Age 5 years ago",
        value: 10,
        order: 2,
      },
    ],
    "name"
  );

export const inputsSlice = createSlice({
  name: "Inputs",
  initialState,
  reducers: {
    addInput: (state, action: PayloadAction<InputData>) => {
      const payload = { ...action.payload };
      if (payload.name in state) return;
      // Generate a new name if empty
      if (payload.name === "") {
        const nextNumber = Object.keys(state)
          .filter((n) => n.startsWith(payload.kind))
          .reduce((acc, v) => {
            const number = parseInt(v.replace(/\D/g, ""));
            if (!isNaN(number) && number > acc) return number;
            else return acc;
          }, -1);
        payload.name = payload.kind + (nextNumber + 1).toString();
      }
      // If order is -1, Push it to the end
      if (payload.order === -1) payload.order = Object.keys(state).length;

      payload.order = Math.min(payload.order, Object.keys(state).length);

      state[payload.name] = payload;
    },
    removeInput: (state, action: PayloadAction<string>) => {
      delete state[action.payload];
    },
    changeInput: {
      reducer: (
        state,
        action: PayloadAction<[string, Exclude<Partial<InputData>, ["kind"]>]>
      ) => {
        const [name, diff] = action.payload;
        if (!(name in state)) return;
        const data = { ...state[name] };
        // Don't allow invalid numbers
        if (diff.kind === "number" && diff.value && isNaN(diff.value)) return;
        if (diff.name && name !== diff.name) {
          delete state[name];
          state[diff.name] = { ...data, ...diff } as any;
          return;
        }
        state[name] = { ...data, ...diff } as any;
      },
      prepare: (name: string, diff: Exclude<Partial<InputData>, ["kind"]>) => {
        return { payload: [name, diff] as [string, typeof diff] };
      },
    },
  },
});

export const { addInput, removeInput, changeInput } = inputsSlice.actions;

export const selectInputNames = (state: RootState) => Object.keys(state.inputs);
export const selectInputs = (state: RootState) => state.inputs;

export const selectInput = (state: RootState, name: string) =>
  state.inputs[name];

export const inputsReducer = inputsSlice.reducer;
