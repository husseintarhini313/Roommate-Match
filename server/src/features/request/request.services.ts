import RoommatePost from "../roommatePost/roommatePost.model.js";
import RoommateRequest from "./request.model.js";
import Profile from "../profile/profile.model.js";
import { calculateCompatibility, type Questionnaire } from "../../utils/matching.js";
import { request } from "node:http";

export async function createRequest(applicantId: string, postId: string, message?: string) {

  const post = await RoommatePost.findById(postId);
  if (!post) 
    throw new Error("Post not found");

  if (post.status !== "ACTIVE") {
    throw new Error("This post is not available");
  }

  if (post.createdBy.toString() === applicantId) {
    throw new Error("You can't apply to a post you have created");
  }

  const existingRequest = await RoommateRequest.findOne({ applicantId, postId });
  if (existingRequest) {
    throw new Error("You have already applied to that post");
  }

  const request = await RoommateRequest.create({
    applicantId,
    postId,
    message,
    status: "PENDING",
  });

  return request;
}



export async function getRequestsForPost(userId: string, postId: string){
  const post = await RoommatePost.findById(postId);
  if(!post)
    throw new Error("Post not found")

  if(post.createdBy.toString() !== userId)
    throw new Error("You are not authorized to view these applicants")

  const requests = await RoommateRequest.find({postId}).sort({createdAt: -1});
  const ownerProfile = await Profile.findOne({userId});

  const requestDetails = await Promise.all(
    requests.map(async (request)=>{
      const applicantProfile = await Profile.findOne({userId: request.applicantId});

      const compatibilityScore= ownerProfile?.questionnaire && applicantProfile?.questionnaire ?
      calculateCompatibility(
        ownerProfile.questionnaire as Questionnaire,
        applicantProfile.questionnaire as Questionnaire,
        post.monthlyRent + post.expenses
      ): null;

      return {
        ...request.toObject(),
        applicantName: applicantProfile?.name ?? "Unknown",
        compatibilityScore,
      };
    })
  );

  return requestDetails;
}


export async function getMyRequests(applicantId: string){

  const requests = await RoommateRequest.find({applicantId}).sort({createdAt: -1});

  const requestDetails = await Promise.all(
    requests.map(async (request)=>{
      const post = await RoommatePost.findById(request.postId);

      return {
        ...request.toObject(),
        post
      }
    })
  );

  return requestDetails;
}



export async function rejectRequest(userId:string, requestId: string){

  const request = await RoommateRequest.findById(requestId);

  if(!request)
    throw new Error("Request not found");

  const post = await RoommatePost.findById(request.postId); 

  if(!post)
    throw new Error("Post not found")

  if(post.createdBy.toString() !== userId)
    throw new Error("You are not authorized to manage this request")

  if(request.status !== "PENDING")
    throw new Error("This request has already been handled")

  request.status= "REJECTED";

  await request.save();

  return request;
}  



export async function acceptRequest(userId: string, requestId: string){

  const request = await RoommateRequest.findById(requestId);
  if(!request)
    throw new Error("Request not found");

  const post = await RoommatePost.findById(request.postId);
  if(!post)
    throw new Error("Post not found");

  if(post.createdBy.toString() !== userId)
    throw new Error("You are not authorized to manage this request")

  if(request.status !== "PENDING")
    throw new Error("This request has already benn handled")

  request.status= "ACCEPTED";
  await request.save();

  post.availableBeds--;

  if(post.availableBeds === 0){
    post.status = "FULL";
  }

  await post.save();

  if(post.availableBeds=== 0){
    await RoommateRequest.updateMany(
      { postId: post._id,
        status: "PENDING",
        _id: { $ne: request._id } 
      },
      { $set: { status: "REJECTED" } }
    );
  }
  await RoommateRequest.updateMany({
    applicantId: request.applicantId,
    status: "PENDING",
    _id: {$ne : request._id}
  },{
    $set : {status: "REJECTED"}
  });

  return request;
}




