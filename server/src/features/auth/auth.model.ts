import mongoose, {Schema} from "mongoose";
import {hashPassword} from "../../utils/hash.js";

const userSchema = new Schema(
    {
        email:{
            type: String,
            required:true,
            unique:true,
        },
        passwordHash:{
            type:String,
            required: true
        },
        resetPasswordTokenHash:{
            type:String,
        },
        resetPasswordTokenExpiration:{
            type:Date,
        }
    },
    {
        timestamps:true,
    });

userSchema.pre("save", async function(){

    if (!this.isModified("passwordHash"))
        return ;

    this.passwordHash= await hashPassword(this.passwordHash);

});


const User = mongoose.model("User", userSchema);

export default User;