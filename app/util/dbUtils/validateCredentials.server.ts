import { string } from "mathjs";
import { db } from "../db.server";
import crypto from "node:crypto";

export default async function validateCredentials(username: string, password: string): Promise<string | null> { //returns user id
    
    

    const user = await db.user.findFirst({select: {uuid: true, passwordHash: true}, where: {username: username}});    
    if(user === null) {
        return null;
    }
    const hash = passwordHash(user.uuid, password);

    if (hash !== user.passwordHash) {
        return null;
    }

    return user.uuid

}

const hasher = crypto.createHash("sha256");

export function passwordHash(uuid: string, password: string): string {
    hasher.update(uuid + password);
    return hasher.digest("base64");
}