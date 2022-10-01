import {
  Links,
  LiveReload,
  LoaderFunction,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
  json
} from "remix";
import type { MetaFunction } from "remix";
import { ChakraProvider } from "@chakra-ui/react";
import { commitSession, getSession } from "./sessions.server";
import {
  SessionInfo, SessionInfoType
} from "./sessions";
import { db } from "./util/db.server";

export const meta: MetaFunction = () => {
  return { title: "Home of Calculon" };
};


export const loader: LoaderFunction = async ({request}) => {
  const session = await getSession(request.headers.get("Cookie"));

  const userId = session.get("userId");
  // Only get username if userId exists
  const username = userId ? await db.user.findFirst({select: {username: true}, where: {uuid: userId}}) : null;

  const contextObject: SessionInfoType = {
    userId: userId,
    username: username?.username
  };

  return json(contextObject, {headers: {
    "Set-Cookie": await commitSession(session)
  }});
};


export default function App() {
  const sessionInfo = useLoaderData<SessionInfoType>();

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <ChakraProvider>
          <SessionInfo.Provider value={sessionInfo}>
            <Outlet />
          </SessionInfo.Provider>
        </ChakraProvider>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
