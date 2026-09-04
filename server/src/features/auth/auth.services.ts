import type {Signup, Signin, ForgotPassword, ResetPassword} from "./auth.schema.js";
import User from "./auth.model.js";
import { comparePassword } from "../../utils/hash.js";
import { generateToken, generateResetToken, hashResetToken } from "../../utils/token.js";
import {sendResetEmail} from "../../utils/email.js";

export async function signupUser({email, password}: Signup ){

    const existingUser= await User.findOne({email});

    if(existingUser){
        throw new Error("Email already in use");
    }

    const user= await User.create({email, passwordHash:password});

    return {id:user._id,email:user.email};
}

export async function signinUser({email, password}:Signin){

    const findUser= await User.findOne({email});

    if(!findUser)
        throw new Error("Invalid email or password");

    const isMatch= await comparePassword(password, findUser.passwordHash);

    if(!isMatch)
        throw new Error("Invalid email or password");

    const token=generateToken(findUser._id);

    return {id: findUser._id, email: findUser.email, token};
}

export async function forgotPassword({email}:ForgotPassword){

    const user =await User.findOne({email});

    if(!user)
        return;

    const token= generateResetToken();

    user.resetPasswordTokenHash= hashResetToken(token);

    user.resetPasswordTokenExpiration = new Date(Date.now() +15 *60 *1000);

    await user.save();

    const resetLink = `${process.env.CLIENT_URL}/reset-password?token=${token}`;

    await sendResetEmail(email, resetLink);
}

export async function resetPassword({token,newPassword}: ResetPassword){

    const hashedToken= hashResetToken(token);

    const user= await User.findOne({
        resetPasswordTokenHash: hashedToken,
        resetPasswordTokenExpiration: {$gt: new Date()}
    })

    if(!user)
        throw new Error("Invalid or expired token");

    user.passwordHash= newPassword;
    user.resetPasswordTokenHash= undefined;
    user.resetPasswordTokenExpiration= undefined;

    await user.save();
}