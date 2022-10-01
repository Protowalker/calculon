import { Provider } from "react-redux";
import {
  ActionFunction,
  createSession,
  LoaderFunction,
  MetaFunction,
  useLoaderData,
} from "remix";
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
import { getSession } from "~/sessions.server";

export const meta: MetaFunction = (args) => {
  return {
    title: `${args.data.calcName} by ${args.params.username}`,
  };
};

export const loader = (async (
  args: Parameters<LoaderFunction>[0]
): Promise<Pick<RootState, "inputs" | "outputs" | "calcName"> & ({loggedIn: false} | {loggedIn: true, uuid: string}) >  => {
  const data = await db.calculator.findFirst({
    where: {
      author: { username: args.params.username! },
      slug: args.params.calcId!,
    },
  });

  const session = getSession(args.request.headers.get("Cookie"));
  
  const uuid = (await session).get("uuid");

  if (!data) {
    console.error("incorrect, TODO");
    return { inputs: {}, outputs: {}, calcName: "New calculator", loggedIn: uuid !== null, uuid: uuid };
  }
  return {
    inputs: generateRecord(JSON.parse(data?.inputs) as InputData[], "uuid"),
    outputs: generateRecord(JSON.parse(data?.outputs) as OutputData[], "uuid"),
    calcName: data.displayName,
    loggedIn: uuid !== null,
    uuid: uuid
  };
});// satisfies LoaderFunction;

export default function Calculon() {
  const loaderData = useLoaderData<Awaited<ReturnType<typeof loader>>>();

  const store = useMemo(
    () =>
      configureStore({
        reducer: {
          inputs: inputsReducer,
          outputs: outputsReducer,
          editMode: editModeReducer,
          calcName: calcNameReducer,
        },
        preloadedState: {inputs: loaderData.inputs, outputs: loaderData.outputs, calcName: loaderData.calcName},
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
