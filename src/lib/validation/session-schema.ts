import z from "zod/v4";

export const sessionSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Name is required.")
    .max(50, "Name is too long."),
});

export type SessionSchema = z.infer<typeof sessionSchema>;

export const renameSessionSchema = z.object({
  sessionId: z.uuid(),
  name: z
    .string()
    .trim()
    .min(1, "Name is required.")
    .max(50, "Name is too long."),
});

export type RenameSessionSchema = z.infer<typeof renameSessionSchema>;
