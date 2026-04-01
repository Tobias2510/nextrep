"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  exerciseEntrySchema,
  type ExerciseEntrySchema,
} from "@/lib/validation/exercise-entry-schema";
import { createExerciseEntry } from "@/actions/exercise-entry";
import { updateExerciseNotes } from "@/actions/exercise";
import { Field, FieldLabel, FieldError } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { toast } from "sonner";

export function AddEntryForm({
  exerciseId,
  lastWeight,
  lastReps,
  notes,
}: {
  exerciseId: string;
  lastWeight?: number;
  lastReps?: number;
  notes?: string;
}) {
  const [loading, setLoading] = useState(false);
  const [notesLoading, setNotesLoading] = useState(false);
  const [currentNotes, setCurrentNotes] = useState(notes ?? "");

  const form = useForm<ExerciseEntrySchema>({
    resolver: zodResolver(exerciseEntrySchema),
    defaultValues: {
      exerciseId,
      weight: lastWeight,
      reps: lastReps,
    },
  });

  async function onSubmit(data: ExerciseEntrySchema) {
    setLoading(true);
    try {
      await createExerciseEntry(data);
      toast.success("Entry logged");
    } catch {
      form.setError("root", { message: "Failed to log entry." });
    } finally {
      setLoading(false);
    }
  }

  async function handleSaveNotes() {
    setNotesLoading(true);
    try {
      await updateExerciseNotes({ exerciseId, notes: currentNotes });
      toast.success("Notes saved");
    } catch {
      toast.error("Failed to save notes.");
    } finally {
      setNotesLoading(false);
    }
  }

  return (
    <div className="flex flex-col gap-4">
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-3"
      >
        <div className="grid grid-cols-2 gap-3">
          <Field data-invalid={!!form.formState.errors.weight}>
            <FieldLabel htmlFor="weight">Weight (kg)</FieldLabel>
            <Input
              {...form.register("weight", { valueAsNumber: true })}
              id="weight"
              type="number"
              step="0.5"
              min="0"
              placeholder="0"
              defaultValue={lastWeight}
              aria-invalid={!!form.formState.errors.weight}
            />
            {form.formState.errors.weight && (
              <FieldError errors={[form.formState.errors.weight]} />
            )}
          </Field>
          <Field data-invalid={!!form.formState.errors.reps}>
            <FieldLabel htmlFor="reps">Reps</FieldLabel>
            <Input
              {...form.register("reps", { valueAsNumber: true })}
              id="reps"
              type="number"
              min="1"
              placeholder="0"
              defaultValue={lastReps}
              aria-invalid={!!form.formState.errors.reps}
            />
            {form.formState.errors.reps && (
              <FieldError errors={[form.formState.errors.reps]} />
            )}
          </Field>
        </div>
        {form.formState.errors.root && (
          <FieldError errors={[form.formState.errors.root]} />
        )}
        <Button type="submit" disabled={loading}>
          {loading && <Spinner />}
          Log Entry
        </Button>
      </form>

      <div className="flex flex-col gap-2">
        <Field>
          <FieldLabel htmlFor="notes">Notes</FieldLabel>
          <Textarea
            id="notes"
            value={currentNotes}
            onChange={(e) => setCurrentNotes(e.target.value)}
          />
        </Field>
        <Button
          variant="outline"
          size="sm"
          onClick={handleSaveNotes}
          disabled={notesLoading || currentNotes === (notes ?? "")}
        >
          {notesLoading && <Spinner />}
          Save Notes
        </Button>
      </div>
    </div>
  );
}
