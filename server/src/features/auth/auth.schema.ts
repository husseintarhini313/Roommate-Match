import {z} from "zod";

export const signupSchema= z.object({

    email: z.email("Invalid Format Email"),

    password: z.string()
               .min(8,"Password must be at least 8 characters")
               .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
               .regex(/[a-z]/, "Password must contain at least one lowercase letter")
               .regex(/[^A-Za-z0-9]/, "Password must contain at least one special character"),
});
export type Signup= z.infer<typeof signupSchema>;


export const signinSchema= z.object({

    email: z.email(),

    password: z.string()
});
export type Signin= z.infer<typeof signinSchema>;



export const forgotPasswordSchema= z.object({
    email: z.email("Invalid Format Email")
})
export type ForgotPassword = z.infer<typeof forgotPasswordSchema>;



export const resetPasswordSchema= z.object({
    token:z.string(),
    newPassword: z.string()
               .min(8,"Password must be at least 8 characters")
               .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
               .regex(/[a-z]/, "Password must contain at least one lowercase letter")
               .regex(/[^A-Za-z0-9]/, "Password must contain at least one special character")
})
export type ResetPassword = z.infer<typeof resetPasswordSchema>;