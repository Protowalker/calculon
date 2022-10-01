import { createContext, useContext } from "react";

export type SessionInfoType = {userId?: string, username?: string};
export const SessionInfo = createContext<SessionInfoType>({});


export const useSessionInfo = () => useContext(SessionInfo);