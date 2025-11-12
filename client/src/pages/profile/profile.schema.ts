import { z } from "zod";

export const profileSchema = z.object({
  bio: z.string().min(2).optional().or(z.literal("")),
  sosialLinks: z
    .object({
      twitter: z.string().url().optional().or(z.literal("")),
      facebook: z.string().url().optional().or(z.literal("")),
      instagram: z.string().url().optional().or(z.literal("")),
    })
    .optional(),
  avatarUrl: z.string().url().optional().or(z.literal("")),
});

export type ProfileSchema = z.infer<typeof profileSchema>;