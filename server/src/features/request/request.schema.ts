import { z } from "zod";

export const createRequestSchema = z.object({
  message: z.string().max(500, "Message must be under 500 characters").optional(),
});

export type CreateRequest = z.infer<typeof createRequestSchema>;