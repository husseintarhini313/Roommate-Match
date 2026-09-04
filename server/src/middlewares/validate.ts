import {z} from "zod";
import type { Request,Response,NextFunction } from "express";

export const validate= (schema: z.ZodType)=>{
    return (req:Request, res:Response, next:NextFunction)=>{

        const result = schema.safeParse(req.body);

        if(!result.success){
            const message = result.error.issues[0]?.message || "Invalid input";
            res.status(400).json({ message, errors: result.error.issues });
            return;
        }
        
        req.body= result.data;

        next();
    };
};