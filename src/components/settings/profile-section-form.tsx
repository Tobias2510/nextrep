"use client";

import { authClient } from "@/lib/auth-client";
import {
  updateEmailSchema,
  UpdateEmailSchema,
  updateNameSchema,
  UpdateNameSchema,
} from "@/lib/validation/settings-schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import { Field, FieldError, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Spinner } from "../ui/spinner";
import SectionHeader from "./section-header";

export default function ProfileSection({
  name,
  email,
}: {
  name: string;
  email: string;
}) {
  const [nameLoading, setNameLoading] = useState(false);
  const [emailLoading, setEmailLoading] = useState(false);

  const nameForm = useForm<UpdateNameSchema>({
    resolver: zodResolver(updateNameSchema),
    defaultValues: { name },
  });

  const emailForm = useForm<UpdateEmailSchema>({
    resolver: zodResolver(updateEmailSchema),
    defaultValues: { email },
  });

  async function onNameSubmit(data: UpdateNameSchema) {
    setNameLoading(true);
    try {
      const { error } = await authClient.updateUser({ name: data.name });
      if (error) throw error;
      toast.success("Name updated");
    } catch {
      toast.error("Failed to update name.");
    } finally {
      setNameLoading(false);
    }
  }

  async function onEmailSubmit(data: UpdateEmailSchema) {
    setEmailLoading(true);
    try {
      const { error } = await authClient.changeEmail({
        newEmail: data.email,
      });
      if (error) throw error;
      toast.success("If that email is available, it has been updated.");
    } catch {
      toast.error("Failed to update email.");
    } finally {
      setEmailLoading(false);
    }
  }

  return (
    <section>
      <SectionHeader
        title="Profile"
        description="Update your personal information."
      />

      <div className="flex flex-col gap-4">
        <form
          onSubmit={nameForm.handleSubmit(onNameSubmit)}
          className="flex flex-col gap-3"
        >
          <Controller
            name="name"
            control={nameForm.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="settings-name">Name</FieldLabel>
                <Input
                  {...field}
                  id="settings-name"
                  placeholder="Your name"
                  aria-invalid={fieldState.invalid}
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <Button type="submit" disabled={nameLoading} className="self-end">
            {nameLoading && <Spinner />}
            Save
          </Button>
        </form>

        <form
          onSubmit={emailForm.handleSubmit(onEmailSubmit)}
          className="flex flex-col gap-3"
        >
          <Controller
            name="email"
            control={emailForm.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="settings-email">Email</FieldLabel>
                <Input
                  {...field}
                  id="settings-email"
                  type="email"
                  placeholder="your@email.com"
                  aria-invalid={fieldState.invalid}
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <Button type="submit" disabled={emailLoading} className="self-end">
            {emailLoading && <Spinner />}
            Save
          </Button>
        </form>
      </div>
    </section>
  );
}
