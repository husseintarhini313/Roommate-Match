import {Resend} from "resend";

function getResend(){
    const apiKey= process.env.RESEND_API_KEY;
    if(!apiKey)
        throw new Error("RESEND_API_KEY is not defined inside .env");
    return new Resend(apiKey)
}

export async function sendResetEmail(to:string, resetLink:string){
    const resend= getResend();

    await resend.emails.send({
        from:"onboarding@resend.dev",
        to,
        subject:"Reset your RoomMatch password",
        html:`<p>Click the link to reset your password: </p><a href="${resetLink}">${resetLink}</a>`
    })
}