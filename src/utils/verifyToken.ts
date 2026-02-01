import jwt from "jsonwebtoken";
import APIError from "./APIError";
import { ITokenPayload } from "../types";

async function verifyToken(token: string): Promise<ITokenPayload> {
    const secretKey = process.env.JWT_SECRET_KEY;
    if (!secretKey) {
        throw new APIError("Internal server error", 500);
    }

    return new Promise<ITokenPayload>((resolve, reject) => {
        jwt.verify(token, secretKey, (err, decoded) => {
            if (err) reject(err);
            else resolve(decoded as ITokenPayload);
        });
    });
}

export default verifyToken