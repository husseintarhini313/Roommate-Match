import express from "express";
import type{Request, Response} from "express";
import { validateToken } from "../../middlewares/authenticate.js";
import { createRequest } from "./request.services.js";
import { createRequestSchema } from "./request.schema.js";
import { validate } from "../../middlewares/validate.js";

const requestRouter = express.Router();

requestRouter.post('/:postId',
                    validateToken,
                    validate(createRequestSchema),
                    async (req:Request, res:Response)=>{

                        const applicantId = (req as any).userId;
                        const postId= req.params.postId as string;
                        const { message } = req.body;

                        const request= await createRequest(applicantId, postId, message);

                        res.status(201).json(request)
                    }
)   

export default requestRouter;