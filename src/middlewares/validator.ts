import { NextFunction, Request, Response } from "express"
import { IGenralSchema } from "../types"
import APIError from "../utils/APIError";


const keys = ["body", "params", "query"];

const validateSchema = (schema: IGenralSchema) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        for (const key of keys) {
            if (schema[key as keyof IGenralSchema]) {
                const result = schema[key as keyof IGenralSchema]?.safeParse(req[key as keyof Request]);

                if (result && result.error && result.error.issues) {
                    throw new APIError(result.error.issues[0].message, 400);
                }
            }
        }
        next();
    }
}


export default validateSchema;