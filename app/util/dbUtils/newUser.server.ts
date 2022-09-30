import { nanoid } from "@reduxjs/toolkit";
import { db } from "../db.server";
import { passwordHash } from "./validateCredentials.server";

type NewUserResponseType = {response: "error", errorMessage: string} | {response: "success", userId: string};

export default async function newUser(username: string, password: string, email: string): Promise<NewUserResponseType> {
    const uuid = nanoid(64);
    const hash = passwordHash(uuid, password);
    
    // TODO: return error on failure. Currently throws
    await db.user.create({data: {username: username, email: email, githubConnected: false, googleConnected: false, uuid: uuid, passwordHash: hash}});
    return {response: "success", userId: uuid};
}