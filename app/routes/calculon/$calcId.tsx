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

export const loader: LoaderFunction = async (
  args
): Promise<Pick<RootState, "inputs" | "outputs">> => {
  const data = await db.calculator.findFirst({
    where: { slug: args.params.calcId },
  });

  if (!data) {
    console.error("incorrect, TODO");
    return { inputs: {}, outputs: {} };
  }
  return {
    inputs: generateRecord(JSON.parse(data?.inputs) as InputData[], "uuid"),
    outputs: generateRecord(JSON.parse(data?.outputs) as OutputData[], "uuid"),
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
        },
        preloadedState: preloadedState,
      }),

    []
  );

  return (
    <Provider store={store}>
      <Grid autoRows="1fr" height="100vh">
        <GridItem rowSpan={2}>
          <AppBar />
        </GridItem>
        <GridItem rowSpan={28}>
          <CalcFrame />
        </GridItem>
      </Grid>
    </Provider>
  );
}
