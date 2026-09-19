import mongoose, {Schema} from "mongoose";

const refreshTokenSchema = new Schema({

    token:{
        type: String,
        required: true,
        unique: true
    },
    userId:{
        type: Schema.Types.ObjectId,
        ref:"User",
        required: true
    },
    expiresAt:{
        type: Date,
        required: true,
        index:{expires: 0}
    }
});

const RefreshToken= mongoose.model("RefreshToken", refreshTokenSchema);

export default RefreshToken;