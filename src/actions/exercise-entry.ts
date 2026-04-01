"use server";

import { auth } from "@/lib/auth";
import { db } from "@/lib/db-connection";
import { exercise, exerciseEntry, trainingSession } from "@/db/schema";
import { exerciseEntrySchema } from "@/lib/validation/exercise-entry-schema";
import { headers } from "next/headers";
import { revalidatePath } from "next/cache";
import z from "zod/v4";
import { and, eq } from "drizzle-orm";

export async function createExerciseEntry(data: {
  exerciseId: string;
  weight: number;
  reps: number;
}) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    throw new Error("Unauthorized");
  }

  const parsed = exerciseEntrySchema.parse(data);

  const [owned] = await db
    .select({ id: exercise.id })
    .from(exercise)
    .innerJoin(trainingSession, eq(exercise.sessionId, trainingSession.id))
    .where(
      and(
        eq(exercise.id, parsed.exerciseId),
        eq(trainingSession.userId, session.user.id),
      ),
    );

  if (!owned) {
    throw new Error("Unauthorized");
  }

  await db.insert(exerciseEntry).values({
    exerciseId: parsed.exerciseId,
    weight: parsed.weight,
    reps: parsed.reps,
  });

  revalidatePath(`/sessions`);
}

const idSchema = z.uuid();

export async function deleteExerciseEntry(
  entryId: string,
  exerciseId: string,
) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    throw new Error("Unauthorized");
  }

  const parsedId = idSchema.parse(entryId);
  idSchema.parse(exerciseId);

  const [owned] = await db
    .select({ id: exerciseEntry.id })
    .from(exerciseEntry)
    .innerJoin(exercise, eq(exerciseEntry.exerciseId, exercise.id))
    .innerJoin(trainingSession, eq(exercise.sessionId, trainingSession.id))
    .where(
      and(
        eq(exerciseEntry.id, parsedId),
        eq(trainingSession.userId, session.user.id),
      ),
    );

  if (!owned) {
    throw new Error("Unauthorized");
  }

  await db.delete(exerciseEntry).where(eq(exerciseEntry.id, parsedId));

  revalidatePath(`/sessions`);
}
