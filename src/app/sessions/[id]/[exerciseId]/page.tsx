import { auth } from "@/lib/auth";
import { db } from "@/lib/db-connection";
import { exercise, exerciseEntry, trainingSession } from "@/db/schema";
import { and, desc, eq } from "drizzle-orm";
import { headers } from "next/headers";
import { notFound, redirect } from "next/navigation";
import { AddEntryForm } from "@/components/exercises/add-entry-form";
import { EntryHistory } from "@/components/exercises/entry-history";
import { ExerciseCharts } from "@/components/exercises/exercise-charts";
import { UserMenu } from "@/components/sessions/user-menu";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";

export default async function ExercisePage({
  params,
}: {
  params: Promise<{ id: string; exerciseId: string }>;
}) {
  const { id: sessionId, exerciseId } = await params;

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) redirect("/login");

  const { name, email } = session.user;

  // Verify ownership: exercise → trainingSession → user
  const [found] = await db
    .select({
      id: exercise.id,
      name: exercise.name,
      notes: exercise.notes,
      sessionId: exercise.sessionId,
    })
    .from(exercise)
    .innerJoin(trainingSession, eq(exercise.sessionId, trainingSession.id))
    .where(
      and(
        eq(exercise.id, exerciseId),
        eq(exercise.sessionId, sessionId),
        eq(trainingSession.userId, session.user.id),
      ),
    );

  if (!found) notFound();

  const entries = await db
    .select({
      id: exerciseEntry.id,
      weight: exerciseEntry.weight,
      reps: exerciseEntry.reps,
      createdAt: exerciseEntry.createdAt,
    })
    .from(exerciseEntry)
    .where(eq(exerciseEntry.exerciseId, found.id))
    .orderBy(desc(exerciseEntry.createdAt));

  return (
    <div className="min-h-svh px-4 py-6">
      <div className="mx-auto w-full max-w-lg">
        <header className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" asChild>
              <Link href={`/sessions/${sessionId}`}>
                <ChevronLeft className="size-5" />
                <span className="sr-only">Back to exercises</span>
              </Link>
            </Button>
            <div>
              <p className="text-primary mb-1 text-xs font-medium tracking-widest uppercase">
                Exercise
              </p>
              <h1 className="text-2xl font-bold tracking-tight">
                {found.name}
              </h1>
            </div>
          </div>
          <UserMenu name={name} email={email} />
        </header>

        <div className="flex flex-col gap-6">
          <AddEntryForm
            exerciseId={found.id}
            lastWeight={entries[0]?.weight}
            lastReps={entries[0]?.reps}
            notes={found.notes ?? undefined}
          />
          {entries.length >= 1 && <Separator />}
          <EntryHistory entries={entries} exerciseId={found.id} />
          <Separator />
          <ExerciseCharts entries={entries} />
        </div>
      </div>
    </div>
  );
}
