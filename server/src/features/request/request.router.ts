import express from "express";
import type{Request, Response} from "express";
import { validateToken } from "../../middlewares/authenticate.js";
import { acceptRequest, createRequest, getMyRequests, getRequestsForPost, rejectRequest, withdrawRequest } from "./request.services.js";
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


requestRouter.get('/post/:postId',
                   validateToken,
                   async (req:Request, res: Response)=>{
                    const userId = (req as any).userId;
                    const postId = req.params.postId as string;
                    const requests = await getRequestsForPost(userId, postId);

                    res.status(200).json(requests);
                   }
)


requestRouter.get('/mine',
                   validateToken,
                   async (req:Request, res: Response)=>{
                    const applicantId = (req as any).userId;
                    const requests = await getMyRequests(applicantId);

                    res.status(200).json(requests);
                   }
)



requestRouter.patch('/:requestId/reject',
                    validateToken,
                    async (req:Request, res: Response)=>{
                        const userId = (req as any).userId;
                        const requestId = req.params.requestId as string;
                        const request = await rejectRequest(userId, requestId);

                        res.status(200).json(request);
                    }
)

requestRouter.patch('/:requestId/accept',
                    validateToken,
                    async (req: Request, res:Response)=>{
                        const userId = (req as any).userId;
                        const requestId = req.params.requestId as string;
                        
                        const request = await acceptRequest(userId,requestId);

                        res.status(200).json(request);
                    }
)



requestRouter.delete('/:requestId',
                      validateToken,
                      async (req: Request, res: Response)=>{
                        const applicantId = (req as any).userId;
                        const requestId= req.params.requestId as string;
                        
                        const result = await withdrawRequest(applicantId, requestId);
                        
                        res.status(200).json(result);
                      }
)

export default requestRouter;