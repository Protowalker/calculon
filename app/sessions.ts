import { createCookie, createCookieSessionStorage } from "remix";

export const {getSession, commitSession, destroySession } = 
createCookieSessionStorage({

    cookie: createCookie("__session")
});