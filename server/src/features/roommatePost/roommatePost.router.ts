import express from "express";
import type { Request, Response } from "express";
import { validateToken } from "../../middlewares/authenticate.js";
import { createPostSchema, updatePostSchema, deleteImageSchema} from "./roommatePost.schema.js";
import {validate} from "../../middlewares/validate.js";
import {createPost, deletePost, updatePost, deleteImages, getMyPosts, getPosts} from "../roommatePost/roommatePost.services.js";
import {upload} from "../../middlewares/multer.js";
import { deleteImageFromSupabase } from "../../utils/supabase.js";

const postRouter = express.Router();

postRouter.post('/',
                validateToken,
                upload.array('images',5),
                validate(createPostSchema),
                async (req:Request, res:Response)=>{

                    const userId = (req as any).userId;
                    const post = await createPost(userId, req.body, req.files as Express.Multer.File[]);

                    res.status(201).json(post);
                }
)


postRouter.get('/',
                async (req:Request, res:Response)=>{

                    const {status, location, maxRent}= req.query;
                    const posts = await getPosts({status:status as string | undefined, 
                                                  location:location as string | undefined,
                                                  maxRent:maxRent? Number(maxRent): undefined});

                    res.status(200).json(posts);
                }
)

postRouter.get('/mine',
                validateToken,
                async (req:Request, res:Response)=>{
                    const userId= (req as any).userId;

                    const posts= await getMyPosts(userId);

                    res.status(200).json(posts)
                }
)


postRouter.patch('/:id',
                validateToken,
                upload.array('images',5),
                validate(updatePostSchema),
                async(req:Request, res:Response)=>{

                    const userId= (req as any).userId;
                    const postId= req.params.id as string;

                    const post = await updatePost(userId,postId, req.body, req.files as Express.Multer.File[]);

                    res.status(200).json(post);
                }   
)


postRouter.delete('/:id',
                   validateToken,
                   async (req:Request, res:Response)=>{

                    const userId= (req as any).userId;
                    const postId= req.params.id as string;

                    const post = await deletePost(userId, postId);

                    res.status(200).json(post);
                   }
)

postRouter.delete('/:id/images',
                   validateToken,
                   validate(deleteImageSchema),
                   async (req:Request, res:Response)=>{

                    const userId= (req as any).userId;
                    const postId= req.params.id as string;

                    const {imageUrl}= req.body;

                    const post = await deleteImages(userId, postId, imageUrl);

                    res.status(200).json(post);
                   }
)

export default postRouter;