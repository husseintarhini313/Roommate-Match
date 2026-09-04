import express from "express";
import type {Request, Response} from "express";
import { validateToken } from "../../middlewares/authenticate.js";
import  {createProfileSchema, updateProfileSchema} from "../profile/profile.schema.js";
import {validate} from "../../middlewares/validate.js";
import { getProfile,createProfile, updateProfile } from "./profile.services.js";

const profileRouter = express.Router();

profileRouter.get('/', validateToken ,async (req:Request, res: Response)=>{
    const userId= (req as any ).userId;
    const profile= await getProfile(userId);

    res.status(200).json(profile);
})

profileRouter.post('/', 
                    validateToken,
                    validate(createProfileSchema),
                    async (req:Request,res:Response)=>{

                        const userId= (req as any).userId;

                        const profile =await createProfile(userId, req.body);

                        res.status(201).json(profile);
                    }
)

profileRouter.patch('/',
                  validateToken,
                  validate(updateProfileSchema),
                  async (req:Request, res:Response)=>{

                    const userId= (req as any ).userId;

                    const profile= await updateProfile(userId, req.body);

                    res.status(200).json(profile);
                  }
);

export default profileRouter;