import type { Post } from "./post";


export type RequestStatus = "PENDING" | "ACCEPTED" | "REJECTED";

export type RequestWithApplicant = {
  _id: string;
  applicantId: string;
  postId: string;
  message?: string;
  status: RequestStatus;
  applicantName: string;
  compatibilityScore: number | null;
  createdAt: string;
};

export type RequestWithPost = {
  _id: string;
  applicantId: string;
  postId: string;
  message?: string;
  status: RequestStatus;
  post: Post | null;
  createdAt: string;
};