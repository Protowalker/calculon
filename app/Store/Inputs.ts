import { StatHelpText } from "@chakra-ui/react";
import {
  createSelector,
  createSlice,
  nanoid,
  PayloadAction,
} from "@reduxjs/toolkit";
import _ from "lodash";
import { InputDataMap } from "~/components/Inputs/InputMap";
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
        const nextNumber = Object.values(state)
          .filter((n) => n.name.startsWith(payload.kind))
          .reduce((acc, v) => {
            const number = parseInt(v.name.replace(/\D/g, ""));
            if (!isNaN(number) && number > acc) return number;
            else return acc;
          }, -1);
        payload.name = payload.kind + (nextNumber + 1).toString();
      }
      // If order is -1, Push it to the end
      if (payload.order === -1) payload.order = Object.keys(state).length;

      payload.order = Math.min(payload.order, Object.keys(state).length);

      let count = 0;
      for (const input of Object.values(state).sort(
        (a, b) => a.order - b.order
      )) {
        state[input.uuid] = { ...input, order: count };
        count += 1;
      }

      state[payload.uuid] = payload;
    },
    removeInput: (state, action: PayloadAction<string>) => {
      delete state[action.payload];
    },
    moveInput: (
      state,
      action: PayloadAction<{ previousIndex: number; newIndex: number }>
    ) => {
      const { previousIndex, newIndex } = action.payload;
      const inputs = Object.values({ ...state }).sort(
        (a, b) => a.order - b.order
      );
      const [removed] = inputs.splice(previousIndex, 1);
      inputs.splice(newIndex, 0, removed);
      for (const [input, i] of inputs.map(
        (v, i) => [v, i] as [typeof v, number]
      )) {
        state[input.uuid] = { ...input, order: i };
      }
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

        const inputs = Object.values(state)
          .sort((a, b) => a.order - b.order)
          .map((v, i) => ({ ...v, order: i }));

        for (const input of inputs) {
          console.log(input);
          state[input.uuid] = { ...input };
        }

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

export const { addInput, removeInput, changeInput, moveInput } =
  inputsSlice.actions;

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
  [selectAllInputs, (state, name: string) => name],
  (inputs, name) => _.values(inputs).find((i) => i.name === name)
);

export const inputsReducer = inputsSlice.reducer;
