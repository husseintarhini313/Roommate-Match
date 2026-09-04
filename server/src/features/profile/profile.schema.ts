import {z} from "zod";

export const questionnaireSchema = z.object({
    smokes: z.boolean(),
    pets: z.boolean(),
    sleepSchedule: z.enum(["early", "late", "flexible"]),
    noisePreference: z.enum(["quiet", "moderate", "loud"]),
    guestFrequency: z.enum(["rarely", "sometimes", "often"]),
    cleanliness: z.number().min(1).max(5),
    socialLevel: z.number().min(1).max(5),
    budget: z.number(),
});

export const createProfileSchema = z.object({

    name:z.string(),

    age:z.number(),

    bio:z.string().optional(),

    questionnaire: questionnaireSchema

});

export type CreateProfile= z.infer <typeof createProfileSchema >;

export const updateProfileSchema=z.object({

    name: z.string().optional(),
    age: z.number().optional(),
    bio: z.string().optional(),
    questionnaire: questionnaireSchema.partial().optional()
});

export type UpdateProfile= z.infer<typeof updateProfileSchema>;