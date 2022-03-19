import { StatHelpText } from "@chakra-ui/react";
import {
  createSelector,
  createSlice,
  nanoid,
  PayloadAction,
} from "@reduxjs/toolkit";
import _ from "lodash";
import { generateRecord, KeyedRecord } from "~/util/TypeUtils";
import { NumberInputData } from "../components/Inputs/NumberInput";
import { TextInputData } from "../components/Inputs/TextInput";
import { ToggleInputData } from "../components/Inputs/ToggleInput";
import { RootState } from "./Store";

export type InputData =
  | typeof TextInputData
  | typeof ToggleInputData
  | typeof NumberInputData;

const initialState: KeyedRecord<"uuid", InputData> = generateRecord<
  "uuid",
  InputData
>([], "uuid");

export const inputsSlice = createSlice({
  name: "Inputs",
  initialState,
  reducers: {
    addInput: (state, action: PayloadAction<InputData>) => {
      const payload = { ...action.payload };
      if (payload.uuid in state) return;
      if (payload.uuid === "") payload.uuid = nanoid(12);
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

export const selectAllInputs = (state: RootState) => state.inputs;

export const selectInputSet = createSelector(
  [selectAllInputs, (state: RootState, names: string[] | undefined) => names],
  (inputs: RootState["inputs"], names: string[] | undefined) =>
    typeof names === "undefined"
      ? inputs
      : _(inputs)
          .pickBy((v) => names.includes(v.name))
          .value(),
  {
    memoizeOptions: {
      resultEqualityCheck: (prev, curr) => {
        return JSON.stringify(prev) === JSON.stringify(curr);
      },
    },
  }
);

export const selectInputNames = createSelector(selectAllInputs, (inputs) =>
  _.values(inputs).map((i) => i.name)
);

export const selectInput = createSelector(
  [selectAllInputs, (state, inputs: RootState["inputs"], name: string) => name],
  (inputs, name) => _.values(inputs).find((i) => i.name === name)
);

export const inputsReducer = inputsSlice.reducer;
