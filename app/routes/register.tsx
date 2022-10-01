import { ActionFunction} from "remix";
import { commitSession, getSession } from "~/sessions.server";
import { json } from "remix";
import newUser from "~/util/dbUtils/newUser.server";




export type RegisterResponseData = {type: "success", uuid: string} | {type: "error", message: string};

export const action: ActionFunction = async ({ request }) => {
  const data = await request.formData();

  const session = await getSession(request.headers.get("Cookie"));

  const username = data.get("username")?.toString() ?? "";
  const password = data.get("password")?.toString() ?? "";
  const confirmPassword = data.get("confirmPassword")?.toString() ?? "";
  const email = data.get("email")?.toString() ?? "";

  const userId = await newUser(
    username,
    password,
    email
  );

  let responseData: RegisterResponseData;

  if (userId.response === "error") {
    responseData = {type: "error", message: userId.errorMessage};
  } else {
    responseData = {type: "success", uuid: userId.userId};
    session.set("userId", userId.userId);
  }

  return json(responseData, {headers: {"Set-Cookie": await commitSession(session)}});

};
