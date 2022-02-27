import { Provider } from "react-redux";
import { ActionFunction, LoaderFunction, useLoaderData } from "remix";
import { CalcFrame } from "~/components/CalcFrame";

import { configureStore } from "@reduxjs/toolkit";
import { editModeReducer } from "~/Store/EditMode";
import { InputData, inputsReducer } from "~/Store/Inputs";
import { OutputData, outputsReducer } from "~/Store/Outputs";
import type { StoreType, RootState } from "~/Store/Store";
import { useMemo } from "react";
import AppBar from "~/components/AppBar";
import { Grid, GridItem } from "@chakra-ui/react";
import { db } from "~/util/db.server";
import { generateRecord } from "~/util/TypeUtils";
import { calcNameReducer } from "~/Store/CalculatorInfo";

export const loader: LoaderFunction = async (
  args
): Promise<Pick<RootState, "inputs" | "outputs" | "calcName">> => {
  const data = await db.calculator.findFirst({
    where: {
      author: { username: args.params.username! },
      slug: args.params.calcId!,
    },
  });

  if (!data) {
    console.error("incorrect, TODO");
    return { inputs: {}, outputs: {}, calcName: "New calculator" };
  }
  return {
    inputs: generateRecord(JSON.parse(data?.inputs) as InputData[], "uuid"),
    outputs: generateRecord(JSON.parse(data?.outputs) as OutputData[], "uuid"),
    calcName: data.displayName,
  };
};

export default function Calculon() {
  const preloadedState = useLoaderData<Pick<RootState, "inputs" | "outputs">>();

  const store = useMemo(
    () =>
      configureStore({
        reducer: {
          inputs: inputsReducer,
          outputs: outputsReducer,
          editMode: editModeReducer,
          calcName: calcNameReducer,
        },
        preloadedState: preloadedState,
      }),

    []
  );

  return (
    <Provider store={store}>
      <Grid autoRows="1fr" height="100%">
        <GridItem rowSpan={2} minHeight="3rem">
          <AppBar />
        </GridItem>
        <GridItem rowSpan={28}>
          <CalcFrame />
        </GridItem>
      </Grid>
    </Provider>
  );
}
