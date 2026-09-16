import type { Post } from "./post";


export type RequestStatus = "PENDING" | "ACCEPTED" | "REJECTED";

export type RequestWithApplicant = {
  _id: string;
  applicantId: string;
  postId: string;
  message?: string;
  status: RequestStatus;
  applicantName: string;
  applicantAge: number | null;
  applicantQuestionnaire: ApplicantQuestionnaire | null;
  compatibilityScore: number | null;
  compatibilityBreakdown: CompatibilityBreakdown | null;
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

export type ApplicantQuestionnaire = {
  smokes: boolean;
  pets: boolean;
  sleepSchedule: "early" | "late" | "flexible";
  noisePreference: "quiet" | "moderate" | "loud";
  guestFrequency: "rarely" | "sometimes" | "often";
  cleanliness: number;
  socialLevel: number;
  budget: number;
};

export type CompatibilityBreakdown = {
  smokes: number;
  sleepSchedule: number;
  pets: number;
  noisePreference: number;
  guestFrequency: number;
  cleanliness: number;
  socialLevel: number;
  budget: number;
};