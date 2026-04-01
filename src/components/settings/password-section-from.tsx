"use client";

import { authClient } from "@/lib/auth-client";
import {
  changePasswordSchema,
  ChangePasswordSchema,
} from "@/lib/validation/settings-schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import SectionHeader from "./section-header";
import { Field, FieldError, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Spinner } from "../ui/spinner";

export default function PasswordSection() {
  const [loading, setLoading] = useState(false);

  const form = useForm<ChangePasswordSchema>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  async function onSubmit(data: ChangePasswordSchema) {
    setLoading(true);
    try {
      const { error } = await authClient.changePassword({
        currentPassword: data.currentPassword,
        newPassword: data.newPassword,
        revokeOtherSessions: true,
      });

      if (error) throw error;

      toast.success("Password changed");
      form.reset();
    } catch {
      toast.error("Failed to change password.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section>
      <SectionHeader title="Password" description="Change your password." />

      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-3"
      >
        <Controller
          name="currentPassword"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="settings-current-password">
                Current Password
              </FieldLabel>
              <Input
                {...field}
                id="settings-current-password"
                type="password"
                placeholder="Enter current password"
                aria-invalid={fieldState.invalid}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          name="newPassword"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="settings-new-password">
                New Password
              </FieldLabel>
              <Input
                {...field}
                id="settings-new-password"
                type="password"
                placeholder="Enter new password"
                aria-invalid={fieldState.invalid}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          name="confirmPassword"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="settings-confirm-password">
                Confirm Password
              </FieldLabel>
              <Input
                {...field}
                id="settings-confirm-password"
                type="password"
                placeholder="Confirm new password"
                aria-invalid={fieldState.invalid}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        {form.formState.errors.root && (
          <FieldError errors={[form.formState.errors.root]} />
        )}
        <Button type="submit" disabled={loading} className="self-end">
          {loading && <Spinner />}
          Change Password
        </Button>
      </form>
    </section>
  );
}
