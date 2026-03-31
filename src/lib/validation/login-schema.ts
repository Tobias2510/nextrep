import z from "zod/v4";

export const loginSchema = z.object({
  email: z.email(),
  password: z.string().min(8, "Password must be atleast 8 characters."),
});

export type LoginSchema = z.infer<typeof loginSchema>;
