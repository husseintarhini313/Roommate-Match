import { z } from "zod";

export const createPostSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  location: z.string().min(1, "Location is required"),
  accommodationType: z.enum(["apartment", "dorm", "studio"], {
    message: "Please select a valid accommodation type",
  }),
  totalBeds: z.coerce.number().min(1, "Total beds must be at least 1"),
  availableBeds: z.coerce.number().min(1, "Available beds must be at least 1"),
  monthlyRent: z.coerce.number().min(0, "Monthly rent must be a positive number"),
  expenses: z.coerce.number().min(0, "Expenses must be a positive number"),
  amenities: z.preprocess(
    (val) => (Array.isArray(val) ? val : [val]),
    z.array(z.string()).min(1, "Please add at least one amenity")
  ),
  rules: z.string().min(1, "House rules are required"),
  availableFrom: z.iso.date("Please provide a valid date"),
});

export type CreatePost = z.infer<typeof createPostSchema>;

export const updatePostSchema = z.object({
  title: z.string().min(1, "Title is required").optional(),
  description: z.string().min(1, "Description is required").optional(),
  location: z.string().min(1, "Location is required").optional(),
  accommodationType: z
    .enum(["apartment", "dorm", "studio"], { message: "Please select a valid accommodation type" })
    .optional(),
  totalBeds: z.coerce.number().min(1, "Total beds must be at least 1").optional(),
  availableBeds: z.coerce.number().min(1, "Available beds must be at least 1").optional(),
  monthlyRent: z.coerce.number().min(0, "Monthly rent must be a positive number").optional(),
  expenses: z.coerce.number().min(0, "Expenses must be a positive number").optional(),
  amenities: z.preprocess(
    (val) => (Array.isArray(val) ? val : val === undefined ? undefined : [val]),
    z.array(z.string()).min(1, "Please add at least one amenity").optional()
  ),
  rules: z.string().min(1, "House rules are required").optional(),
  availableFrom: z.iso.date("Please provide a valid date").optional(),
});

export type UpdatePost = z.infer<typeof updatePostSchema>;

export const deleteImageSchema = z.object({
  imageUrl: z.string().min(1, "Image URL is required"),
});

export type DeleteImage = z.infer<typeof deleteImageSchema>;