import { createCookie, createCookieSessionStorage } from "remix";
import * as dotenv from "dotenv";

dotenv.config();




const secret = process.env.SESSION_SECRET;
if (!secret) { 
    console.log("DID NOT FIND SESSION_SECRET ENVIRONMENT VARIABLE")
    process.exit(1);
}

export const {getSession, commitSession, destroySession } = 
createCookieSessionStorage({

    cookie: createCookie("__session", { secrets: [secret]}),
});

