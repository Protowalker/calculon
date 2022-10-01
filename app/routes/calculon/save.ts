import { DataFunctionArgs } from "@remix-run/server-runtime";
import { ActionFunction, LoaderFunction } from "remix";
import invariant from "tiny-invariant";
import { getSession } from "~/sessions";
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

export const action: ActionFunction = async ({request}) => {
  const data = await request.formData();
  const session = await getSession(request.headers.get("Cookie"));

  const userId = session.get("userId");

  // TODO: better validation
  invariant(userId != null, "expected userId");
  invariant(data.get("slug") != null, "expected data.slug");
  invariant(data.get("displayName") != null, "expected data.displayName");
  invariant(data.get("inputs") != null, "expected data.inputs");
  invariant(data.get("outputs") != null, "expected data.outputs");
  invariant(data.get("authorUsername") != null, "expected data.authorUsername");

  const validated = {
    slug: data.get("slug")!.toString(),
    displayName: data.get("displayName")!.toString(),
    inputs: data.get("inputs")!.toString(),
    outputs: data.get("outputs")!.toString(),
    authorUsername: data.get("authorUsername")!.toString(),
  };

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

  const author = await db.user.findUnique({
    where: { username: validated.authorUsername },
  });
  // TODO: Better validation of author (though in reasonable usage it's incredibly unlikely that this codepath will ever get hit)
  invariant(author != null, "Failed to find author with specified username");

  const parsed = {
    ...validated,
    authorUsername: undefined,
    authorUuid: author.uuid,
  };

  // If the logged in author isn't the author of this calculator, don't let them save it
  if (author.uuid !== userId) { 
    return new Response(null, { status: 401, statusText: "User not authorized to write to this calculator" });
  }

  const result = await db.calculator.upsert({
    where: { authorUuid_slug: { authorUuid: author.uuid, slug: parsed.slug } },
    create: { ...parsed },
    update: { ...parsed },
  });

  console.log(result);
  return null;
};
