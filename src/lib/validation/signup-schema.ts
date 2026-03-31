import z from "zod/v4";

export const signupSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters long."),
  email: z.email(),
  password: z.string().min(8, "Password must be at least 8 characters long."),
  confirmPassword: z
    .string()
    .min(8, "Password must be at least 8 characters long."),
});

export type SignupSchema = z.infer<typeof signupSchema>;
