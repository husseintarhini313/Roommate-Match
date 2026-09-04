import  {Types} from "mongoose";
import jwt from "jsonwebtoken";
import crypto from "crypto";

function getJwtSecret():string{
    const secret= process.env.JWT_SECRET;
    if(!secret)
        throw new Error("JWT_SECRET is not defined inside .env");
    return secret;
}

export function generateToken(id:Types.ObjectId){
    return jwt.sign({id: id.toString()}, getJwtSecret(),{expiresIn:"7d"});
}

export function verifyToken(token:string){
    return jwt.verify(token, getJwtSecret()) as {id:string};
}

export function generateResetToken(){
    return crypto.randomBytes(32).toString("hex");
}

export function hashResetToken(token:string){
    return crypto.createHash("sha256").update(token).digest("hex");
}

