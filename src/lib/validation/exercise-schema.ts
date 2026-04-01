import z from "zod/v4";

export const exerciseSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Name is required.")
    .max(50, "Name is too long."),
  sessionId: z.uuid(),
});

export type ExerciseSchema = z.infer<typeof exerciseSchema>;

export const renameExerciseSchema = z.object({
  exerciseId: z.uuid(),
  sessionId: z.uuid(),
  name: z
    .string()
    .trim()
    .min(1, "Name is required.")
    .max(50, "Name is too long."),
});

export type RenameExerciseSchema = z.infer<typeof renameExerciseSchema>;
