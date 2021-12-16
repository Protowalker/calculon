import {
  createSelector,
  createSlice,
  nanoid,
  PayloadAction,
} from "@reduxjs/toolkit";
import _ from "lodash";
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

const initialState: KeyedRecord<"uuid", InputData> =
  loadFromLocalStorage() ??
  generateRecord<"uuid", InputData>(
    [
      {
        kind: "text",
        name: "name",
        displayName: "Name",
        value: "Jackie",
        order: 0,
        uuid: "13874235bhv",
      },
      {
        kind: "toggle",
        name: "tm",
        displayName: "Trademark?",
        value: true,
        order: 1,
        uuid: "1234rfujnvxc",
      },
      {
        kind: "number",
        name: "prevAge",
        displayName: "Age 5 years ago",
        value: 14,
        order: 2,
        uuid: "1231b3n45v0xv=-",
      },
    ],
    "uuid"
  );

export const inputsSlice = createSlice({
  name: "Inputs",
  initialState,
  reducers: {
    addInput: (state, action: PayloadAction<InputData>) => {
      const payload = { ...action.payload };
      if (payload.uuid in state) return;
      if (payload.uuid === "") payload.uuid = nanoid();
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

      state[payload.uuid] = payload;
    },
    removeInput: (state, action: PayloadAction<string>) => {
      delete state[action.payload];
    },
    changeInput: {
      reducer: (
        state,
        action: PayloadAction<
          [string, Omit<Partial<InputData>, "kind" | "uuid">]
        >
      ) => {
        const [uuid, diff] = action.payload;
        if (!(uuid in state)) return;
        const data = { ...state[uuid] };
        // Don't allow invalid numbers
        if (data.kind === "number" && diff.value && isNaN(diff.value as number))
          return;
        state[uuid] = { ...data, ...diff } as any;
      },
      prepare: (
        uuid: string,
        diff: Omit<Partial<InputData>, "kind" | "uuid">
      ) => {
        return { payload: [uuid, diff] as [string, typeof diff] };
      },
    },
  },
});

export const { addInput, removeInput, changeInput } = inputsSlice.actions;

export const selectInputs = (state: RootState) => state.inputs;
export const selectInputNames = createSelector(selectInputs, (inputs) =>
  _.values(inputs).map((i) => i.name)
);

export const selectInput = createSelector(
  [selectInputs, (inputs, name: string) => name],
  (inputs, name) => _.values(inputs).find((i) => i.name === name)
);

export const inputsReducer = inputsSlice.reducer;
