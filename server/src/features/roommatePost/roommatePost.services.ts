import { uploadImagesToSupabase, deleteImageFromSupabase } from "../../utils/supabase.js";
import type {CreatePost,UpdatePost} from "../roommatePost/roommatePost.schema.js";
import RoommatePost from "./roommatePost.model.js";

export async function createPost(userId:string,data:CreatePost, files: Express.Multer.File[]){

    const activePost= await RoommatePost.findOne({
        createdBy: userId,
        status:"ACTIVE"
    });

    if(activePost)
        throw new Error("You already have an active post")

    const imageURLs= await uploadImagesToSupabase(files);

    const post = await RoommatePost.create({
        ...data,
        createdBy: userId,
        status:"ACTIVE",
        images: imageURLs 
    })

    return post;
}

export async function getMyPosts(userId:string){

    return RoommatePost.find({createdBy: userId}).sort({createdAt:-1});
}

export async function getPosts(filters: {status?:string; location?:string, maxRent?:number}){
    const query :Record<string, unknown>={};

    if(filters.status)
        query.status= filters.status;
    if(filters.location)
        query.location= {$regex: filters.location, $options:"i"}
    if(filters.maxRent !== undefined)
        query.monthlyRent= {$lte: filters.maxRent}
    return RoommatePost.find(query).sort({createdAt: -1});
}


export async function updatePost(userId:string, postId:string, data:UpdatePost, files:Express.Multer.File[]){

    const updateData: Record<string, unknown>= {...data};

    if(files && files.length>0){
        const existingPost = await RoommatePost.findOne({
            _id:postId,
            createdBy:userId
        })

        if(!existingPost)
            throw new Error("Post not found")

        const newImageUrls= await uploadImagesToSupabase(files);
        updateData.images=[...existingPost.images, ...newImageUrls];
    }

    const post = await RoommatePost.findOneAndUpdate(
        {_id:postId, createdBy:userId},
        {$set:updateData},
        {new:true}
    );

    if(!post)
        throw new Error("Post not found");

    return post;
}

export async function deletePost(userId:string, postId:string){
    const post = await RoommatePost.findOneAndDelete({
        _id: postId,
        createdBy:userId
    })

    if(!post)
        throw new Error("Post not found");

    return post;
}

export async function deleteImages(userId:string, postId:string, imageUrl:string){

    const post = await RoommatePost.findOne({
        _id:postId,
        createdBy:userId
    })

    if(!post)
        throw new Error("Post not found")

    if(!post.images.includes(imageUrl))
        throw new Error("Image not found on this post")

    await deleteImageFromSupabase(imageUrl)

    post.images=post.images.filter((img)=> img!== imageUrl);
    await post.save();

    return post;
}