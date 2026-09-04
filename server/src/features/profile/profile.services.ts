import type { CreateProfile, UpdateProfile } from "./profile.schema.js";
import Profile from "./profile.model.js";

export async function createProfile(userId:string, data: CreateProfile){

    const existingProfile= await Profile.findOne({userId});

    if(existingProfile)
        throw new Error("Profile already exists for this user");

    const profile= await Profile.create({userId, ...data});

    return profile;
}                       

export async function getProfile(userId: string ){
    const profile= await Profile.findOne({userId});
    
    if(!profile)
        throw new Error("Profile not found")

    return profile;
}

export async function updateProfile(userId: string, data: UpdateProfile){

    const profile= await Profile.findOneAndUpdate(
        {userId},
        {$set: data},
        {new: true}
    );

    if(!profile)
        throw new Error("Profile not found");

    return profile;
}