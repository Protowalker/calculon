import { ActionFunction, redirect } from "remix";
import { destroySession, getSession } from "~/sessions.server";

export const action: ActionFunction = async ({request}) => {
    const session = await getSession(request.headers.get("Cookie"));
    
    const cookie = await destroySession(session);

    return redirect("/", {headers: {"Set-Cookie": cookie}});
};