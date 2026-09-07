import { z } from "zod";

export const createPostSchema = z.object({
  title: z.string(),
  description: z.string(),
  location: z.string().min(1),
  accommodationType: z.enum(["apartment", "dorm", "studio"]),
  totalBeds: z.coerce.number(),
  availableBeds: z.coerce.number(),
  monthlyRent: z.coerce.number(),
  expenses: z.coerce.number(),
  amenities: z.array(z.string()),
  rules: z.string(),
  availableFrom: z.iso.date(),
});

export type CreatePost = z.infer<typeof createPostSchema>;

export const updatePostSchema = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
  location: z.string().min(1).optional(),
  accommodationType: z.enum(["apartment", "dorm", "studio"]).optional(),
  totalBeds: z.number().optional(),
  availableBeds: z.number().optional(),
  monthlyRent: z.number().optional(),
  expenses: z.number().optional(),
  amenities: z.array(z.string()).optional(),
  rules: z.string().optional(),
  availableFrom: z.iso.date().optional(),
});

export type UpdatePost = z.infer<typeof updatePostSchema>;


export const deleteImageSchema = z.object({
  imageUrl: z.string(),
});
