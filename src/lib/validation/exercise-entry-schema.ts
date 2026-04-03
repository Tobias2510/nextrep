import z from "zod/v4";

export const exerciseEntrySchema = z.object({
  exerciseId: z.uuid(),
  weight: z.number({ error: "Please enter a weight." }).positive("Weight must be positive."),
  reps: z.int({ error: "Please enter reps." }).positive("Reps must be at least 1."),
});

export type ExerciseEntrySchema = z.infer<typeof exerciseEntrySchema>;
