"use client";

import { authClient } from "@/lib/auth-client";
import {
  deleteAccountSchema,
  DeleteAccountSchema,
} from "@/lib/validation/settings-schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import SectionHeader from "./section-header";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "../ui/drawer";
import { Button } from "../ui/button";
import { Field, FieldError, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";
import { Spinner } from "../ui/spinner";

export default function DangerZoneSection() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const form = useForm<DeleteAccountSchema>({
    resolver: zodResolver(deleteAccountSchema),
    defaultValues: { password: "" },
  });

  async function onSubmit(data: DeleteAccountSchema) {
    setLoading(true);
    try {
      const { error } = await authClient.deleteUser({
        password: data.password,
      });
      if (error) throw error;
      router.push("/login");
    } catch {
      toast.error("Failed to delete account.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section>
      <SectionHeader
        title="Danger Zone"
        description="Permanently delete your account and all data."
      />

      <Drawer
        open={open}
        onOpenChange={(isOpen) => {
          setOpen(isOpen);
          if (!isOpen) form.reset();
        }}
      >
        <DrawerTrigger asChild>
          <Button variant="destructive">Delete Account</Button>
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader className="text-left">
            <DrawerTitle>Delete Account</DrawerTitle>
            <DrawerDescription>
              This action is permanent and cannot be undone. Enter your password
              to confirm.
            </DrawerDescription>
          </DrawerHeader>

          <form onSubmit={form.handleSubmit(onSubmit)} className="px-4">
            <Controller
              name="password"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="delete-password">Password</FieldLabel>
                  <Input
                    {...field}
                    id="delete-password"
                    type="password"
                    placeholder="Enter your password"
                    autoFocus
                    aria-invalid={fieldState.invalid}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </form>

          <DrawerFooter>
            <Button
              variant="destructive"
              disabled={loading}
              onClick={form.handleSubmit(onSubmit)}
            >
              {loading && <Spinner />}
              Delete Account
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </section>
  );
}
