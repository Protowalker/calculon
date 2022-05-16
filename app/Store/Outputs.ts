import { createSlice, nanoid, PayloadAction } from "@reduxjs/toolkit";
import { number } from "mathjs";
import { HeaderOutputData } from "~/components/Outputs/HeaderOutput";
import { TextOutputData } from "~/components/Outputs/TextOutput";
import { generateRecord, KeyedRecord } from "~/util/TypeUtils";
import { RootState } from "./Store";

export type OutputData = typeof TextOutputData | typeof HeaderOutputData;

const initialState: KeyedRecord<"uuid", OutputData> = generateRecord<
  "uuid",
  OutputData
>([], "uuid");

export const outputsSlice = createSlice({
  name: "Outputs",
  initialState: initialState,
  reducers: {
    addOutput: (state, action: PayloadAction<OutputData>) => {
      const payload = { ...action.payload };
      if (payload.uuid in state) {
        return;
      }
      if (payload.uuid === "") payload.uuid = nanoid();
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

      state[payload.uuid] = payload;
    },
    removeOutput: (state, action: PayloadAction<string>) => {
      delete state[action.payload];
    },
    moveOutput: (
      state,
      action: PayloadAction<{ previousIndex: number; newIndex: number }>
    ) => {
      const { previousIndex, newIndex } = action.payload;
      const outputs = Object.values({ ...state }).sort(
        (a, b) => a.order - b.order
      );
      const [removed] = outputs.splice(previousIndex, 1);
      outputs.splice(newIndex, 0, removed);
      for (const [output, i] of outputs.map(
        (v, i) => [v, i] as [typeof v, number]
      )) {
        state[output.uuid] = { ...output, order: i };
      }
    },
    changeOutput: {
      reducer: (
        state,
        action: PayloadAction<
          [string, Omit<Partial<OutputData>, "kind" | "uuid">]
        >
      ) => {
        const [uuid, diff] = action.payload;
        if (!(uuid in state)) {
          return;
        }
        const data = { ...state[uuid] };

        state[uuid] = { ...data, ...diff };
      },
      prepare: (
        uuid: string,
        diff: Omit<Partial<OutputData>, "kind" | "uuid">
      ) => {
        return {
          payload: [uuid, diff] as [string, typeof diff],
        };
      },
    },
  },
});

export const { addOutput, removeOutput, changeOutput, moveOutput } =
  outputsSlice.actions;
export const selectOutputs = (state: RootState) => state.outputs;
export const outputsReducer = outputsSlice.reducer;
