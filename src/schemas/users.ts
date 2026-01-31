import { z } from "zod";
import { IGenralSchema, Role } from "../types";


export const createUserSchema: IGenralSchema = {
    body: z
        .object({
            name: z.string().min(3),
            password: z.string().min(8, "Password must be at least 8 characters long"),
            email: z.string().email("Invalid email address"),
            // repeatPassword: z.string().min(8, "Password must be at least 8 characters long"),
            age: z.number().min(18).max(100),
        })
        // .refine((data) => data.password === data.repeatPassword, {
        //     path: ["repeatPassword"],
        //     message: "Passwords do not match",
        // })

}