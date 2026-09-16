import express from "express";
import type { Request, Response } from "express";
import {signupUser, signinUser, forgotPassword, resetPassword} from "../auth/auth.services.js"
import {forgotPasswordSchema, resetPasswordSchema, signinSchema, signupSchema} from "../auth/auth.schema.js";
import {validate} from "../../middlewares/validate.js";
import {resetPasswordLimiter} from "../../middlewares/rateLimiter.js";
import { recordFailedLogin, checkLoginBlock, recordSuccessfulLogin } from "../../middlewares/loginAttemptTracker.js";
import {checkIpBlock} from "../../middlewares/ipAttemptTracker.js"

const userRouter= express.Router();

userRouter.post('/signup',
                validate(signupSchema), 
                async (req:Request,res:Response)=>{

                    const user = await signupUser(req.body);
                    res.status(201).json(user);
});

userRouter.post('/signin',
                validate(signinSchema),
                checkIpBlock,
                checkLoginBlock,
                async(req:Request,res:Response)=>{
                    try{
                        const user = await signinUser(req.body);
                        recordSuccessfulLogin(req.body.email);
                        res.status(200).json(user);
                    }catch(err){
                        recordFailedLogin(req.body.email);
                        throw err;
                    }
});

userRouter.post('/forgot-password',
                validate(forgotPasswordSchema),
                async(req:Request, res: Response)=>{
                    await forgotPassword(req.body)

                    res.status(200).json({message: "If that email exists, a reset link has been sent."})
                }
);

userRouter.post('/reset-password',
                validate(resetPasswordSchema),
                resetPasswordLimiter,
                async(req: Request, res:Response)=>{
                    await resetPassword(req.body)
                    res.status(200).json({message: "Password reset successfully."})
                }
)

export default userRouter;