import { NextFunction, Response } from "express";
import { IAuthRequest, Role } from "../types";
import APIError from "../utils/APIError";



function authorize(...roles: Role[]) {
    return (req: IAuthRequest, res: Response, next: NextFunction) => {
        if (!roles.includes(req.user?.role as any)) {
            throw new APIError("Forbidden", 403);
        }
        next();
    }
}

export default authorize;