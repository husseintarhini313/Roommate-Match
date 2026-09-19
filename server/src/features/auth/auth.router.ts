import express from "express";
import type { Request, Response } from "express";
import {signupUser, signinUser, forgotPassword, resetPassword, refreshAccessToken, logoutUser} from "../auth/auth.services.js"
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

                        res.cookie("refreshToken",user.refreshToken,{
                            httpOnly: true,
                            secure: process.env.NODE_ENV === "production",
                            sameSite: "strict",
                            maxAge: 7 * 24 * 60 * 60 * 1000,
                        });

                        res.status(200).json({ id: user.id, email: user.email, token: user.token });
                        
                    }catch(err){
                        recordFailedLogin(req.body.email);
                        throw err;
                    }
});

userRouter.post('/refresh',
                 async (req:Request, res: Response)=>{
                    const refreshToken = req.cookies.refreshToken;
                    const result = await refreshAccessToken(refreshToken);

                    res.status(200).json({token: result.token})
                 }
)

userRouter.post('/logout',
                 async (req: Request, res: Response)=>{
                    const refreshTokenValue = req.cookies.refreshToken;
                    await logoutUser(refreshTokenValue);

                    res.clearCookie("refreshToken");
                    res.status(200).json({message: "Logged out successfully"});
                 }
)

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