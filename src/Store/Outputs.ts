import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TextOutputData } from "components/Outputs/TextOutput";
import { generateRecord, KeyedRecord } from "util/TypeUtils";
import { RootState } from "./Store";

export type OutputData = typeof TextOutputData;

const initialState: KeyedRecord<"name", OutputData> = generateRecord<
  "name",
  OutputData
>(
  [
    {
      kind: "text",
      name: "text0",
      displayName: "Age Calculation",
      order: 0,
      value: "{{name}} {{tm ? '(TM)' : ''}} is {{prevAge + 5}} years old.",
    },
  ],
  "name"
);

export const outputsSlice = createSlice({
  name: "Outputs",
  initialState: initialState,
  reducers: {
    addOutput: (state, action: PayloadAction<OutputData>) => {
      const payload = { ...action.payload };
      if (payload.name in Object.keys(state)) {
        return;
      }
      // e.g. text5
      if (payload.name === "") {
        // Find all the inputs with names fitting the pattern "[kind]{number}"
        const nextNumber = Object.keys(state)
          .filter((n) => n.startsWith(payload.kind))
          .reduce((acc, v) => {
            const number = parseInt(v.replace(/\D/g, ""));
            if (!isNaN(number) && number > acc) return number;
            else return acc;
          }, -1);
        payload.name = payload.kind + (nextNumber + 1).toString();
      }
      if (payload.order === -1) payload.order = Object.keys(state).length;
      // Make sure that payload.order is only as big as the end of the list
      payload.order = Math.min(payload.order, Object.keys(state).length);

      state[payload.name] = payload;
    },
    removeOutput: (state, action: PayloadAction<string>) => {
      delete state[action.payload];
    },
    changeOutput: {
      reducer: (
        state,
        action: PayloadAction<[string, Exclude<Partial<OutputData>, ["kind"]>]>
      ) => {
        const [name, diff] = action.payload;
        if (!(name in Object.keys(state))) {
          console.log(Object.keys(state));
          return;
        }
        const data = { ...state[name] };

        if (diff.name && name !== diff.name) {
          delete state[name];
          state[diff.name] = { ...data, ...diff };
          return;
        }
        state[name] = { ...data, ...diff };
      },
      prepare: (name: string, diff: Exclude<Partial<OutputData>, ["kind"]>) => {
        return {
          payload: [name, diff] as [string, typeof diff],
        };
      },
    },
  },
});

export const { addOutput, removeOutput, changeOutput } = outputsSlice.actions;
export const selectOutputs = (state: RootState) => state.outputs;
export const outputsReducer = outputsSlice.reducer;
