import type { Request,Response, NextFunction } from "express";
import {verifyToken} from "../utils/token.js";

export const validateToken=(req:Request,res:Response,next:NextFunction)=>{

    const header = req.headers.authorization;
    const bearer= header?.startsWith("Bearer ");


    if(!header || !bearer){
        res.status(401).json({message: "No token provided"});
        return;
    }

    const token= header?.split(" ")[1];

    try{
        const decodedToken= verifyToken(token!);
        
        (req as any).userId= decodedToken.id;
        next();
    }catch(err){
        console.error("Token verification failed:", err);
        res.status(401).json({message: "Invalid or expired token."})
    }
}