import z from "zod/v4";

export const updateNameSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Name is required.")
    .max(50, "Name is too long."),
});

export type UpdateNameSchema = z.infer<typeof updateNameSchema>;

export const updateEmailSchema = z.object({
  email: z.email("Please enter a valid email address."),
});

export type UpdateEmailSchema = z.infer<typeof updateEmailSchema>;

export const changePasswordSchema = z
  .object({
    currentPassword: z.string().min(8, "Current password is required."),
    newPassword: z
      .string()
      .min(8, "Password must be at least 8 characters.")
      .max(128, "Password is too long."),
    confirmPassword: z.string().min(1, "Please confirm your password."),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
  });

export type ChangePasswordSchema = z.infer<typeof changePasswordSchema>;

export const deleteAccountSchema = z.object({
  password: z.string().min(8, "Password is required."),
});

export type DeleteAccountSchema = z.infer<typeof deleteAccountSchema>;
