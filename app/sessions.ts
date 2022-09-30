import { createContext, useContext } from "react";
import { createCookie, createCookieSessionStorage } from "remix";



export const {getSession, commitSession, destroySession } = 
createCookieSessionStorage({

    cookie: createCookie("__session")
});


export type SessionInfoType = {userId?: string, username?: string};
export const SessionInfo = createContext<SessionInfoType>({});


export const useSessionInfo = () => useContext(SessionInfo);