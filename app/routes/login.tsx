import { ActionFunction, LoaderFunction, redirect, useActionData, useFetcher, useLoaderData } from "remix";
import { commitSession, getSession } from "~/sessions";
import validateCredentials from "~/util/dbUtils/validateCredentials.server";
import { json } from "remix";


export type LoginResponseData = {type: "success"} | {type: "error", message: string};

export const action: ActionFunction = async ({ request}) => {
  const data = await request.formData();


  const session = await getSession(request.headers.get("Cookie"));

  const username = data.get("username")?.toString() ?? "";
  const password = data.get("password")?.toString() ?? "";

  const userId = await validateCredentials(
    username,
    password
  );

  let outData: LoginResponseData = {type: "success"};
  if (userId === null) {
    outData = {
      type: "error",
      message: "Invalid username/password"
    };
  } else {
    session.set("userId", userId);
  }

  return json(outData, {headers: {"Set-Cookie": await commitSession(session)}});
};
