import type{ Request,Response, NextFunction } from "express";

export const errorHandler= (err:unknown, req:Request, res:Response, next: NextFunction)=>{
    const message= err instanceof Error ? err.message: "Something went wrong";

    res.status(400).json({message});
};