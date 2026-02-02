import { NextFunction, Response } from "express";
import { IAuthRequest } from "../types";
import APIError from "../utils/APIError";
import verifyToken from "../utils/verifyToken";

async function authMiddleware(req: IAuthRequest, res: Response, next: NextFunction) {
    try {
        // extract auth header
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            throw new APIError("Unauthorized", 401);
        }
        // split header into two parts: scheme and token
        const [scheme, token] = authHeader.split(" ");

        if (scheme !== "Bearer") {
            throw new APIError("Unauthorized", 401);
        }
        // verify token 
        const decoded = await verifyToken(token);

        if (!decoded) {
            throw new APIError("Unauthorized", 401);
        }
        // attach user object to request object
        req.user = decoded;

        next();
    } catch (err) {
        next(err);
    }
}

export default authMiddleware;