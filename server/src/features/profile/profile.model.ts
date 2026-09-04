import mongoose , {Schema}from "mongoose";

const profileSchema= new Schema({

    userId:{
        type: Schema.Types.ObjectId,
        ref:'User',
        required:true,
        unique: true
    },

    name:{
        type:String,
        required: true
    },

    age:{
        type:Number,
        required:true
    },

    bio:{
        type:String,
    },

    questionnaire: {
        smokes: { type: Boolean, required: true },
        pets: { type: Boolean, required: true },
        sleepSchedule: {
            type: String,
            enum: ["early", "late", "flexible"],
            required: true,
        },
        noisePreference: {
            type: String,
            enum: ["quiet", "moderate", "loud"],
            required: true,
        },
        guestFrequency: {
            type: String,
            enum: ["rarely", "sometimes", "often"],
            required: true,
        },
        cleanliness: { type: Number, min: 1, max: 5, required: true },
        socialLevel: { type: Number, min: 1, max: 5, required: true },
        budget: { type: Number, required: true },
        _id: false,
    },
    
    },
    {
        timestamps:true,
    }
);

const Profile= mongoose.model("Profile", profileSchema);

export default Profile;