import RoommatePost from "../roommatePost/roommatePost.model.js";
import RoommateRequest from "./request.model.js";

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