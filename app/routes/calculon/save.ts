import { DataFunctionArgs } from "@remix-run/server-runtime";
import { ActionFunction, LoaderFunction } from "remix";
import invariant from "tiny-invariant";
import { InputData, inputsReducer } from "~/Store/Inputs";
import { OutputData } from "~/Store/Outputs";
import { db } from "~/util/db.server";
import { KeyedRecord } from "~/util/TypeUtils";

//type Action = DataFunctionArgs & {
//    params: {
//        slug: string;
//        displayName: string;
//        inputs: KeyedRecord<"uuid", OutputData>;
//        outputs: KeyedRecord<"uuid", OutputData>;
//    }
//};

// TODO: save
export const action: ActionFunction = async (args) => {
  const data = await args.request.formData();
  invariant(data.get("slug"), "expected data.slug");
  invariant(data.get("displayName"), "expected data.displayName");
  invariant(data.get("inputs"), "expected data.inputs");
  invariant(data.get("outputs"), "expected data.outputs");

  const parsed = {
    slug: data.get("slug")!.toString(),
    displayName: data.get("displayName")!.toString(),
    inputs: data.get("inputs")!.toString(),
    outputs: data.get("outputs")!.toString(),
  };

  console.log(parsed);

  // TODO: Implement validity checking for inputs/outputs
  // TODO: Implement validity checking for slug

  //const primed = {
  //  ...parsed,
  //  inputs: {
  //    create: parsed.inputs.map((input) => ({
  //      ...input,
  //      value: input.value.toString(),
  //    })),
  //  },
  //  outputs: { create: parsed.outputs },
  //};

  const result = await db.calculator.upsert({
    where: { slug: parsed.slug },
    create: { ...parsed },
    update: { ...parsed },
  });

  console.log(result);
  return null;
};
