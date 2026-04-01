import { ExerciseList } from "@/components/exercises/exercise-list";
import { UserMenu } from "@/components/sessions/user-menu";
import { Button } from "@/components/ui/button";
import { exercise, exerciseEntry, trainingSession } from "@/db/schema";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db-connection";
import { and, desc, eq, sql } from "drizzle-orm";
import { ChevronLeft } from "lucide-react";
import { headers } from "next/headers";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";

export default async function SessionDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) redirect("/login");

  const { name, email } = session.user;

  const [found] = await db
    .select({ id: trainingSession.id, name: trainingSession.name })
    .from(trainingSession)
    .where(
      and(
        eq(trainingSession.id, id),
        eq(trainingSession.userId, session.user.id),
      ),
    );

  if (!found) notFound();

  // Subquery: latest entry per exercise
  const latestEntry = db
    .select({
      exerciseId: exerciseEntry.exerciseId,
      weight: exerciseEntry.weight,
      reps: exerciseEntry.reps,
      rn: sql<number>`row_number() over (partition by ${exerciseEntry.exerciseId} order by ${exerciseEntry.createdAt} desc)`.as(
        "rn",
      ),
    })
    .from(exerciseEntry)
    .as("latest_entry");

  const exercises = await db
    .select({
      id: exercise.id,
      name: exercise.name,
      lastWeight: latestEntry.weight,
      lastReps: latestEntry.reps,
    })
    .from(exercise)
    .leftJoin(
      latestEntry,
      and(eq(exercise.id, latestEntry.exerciseId), eq(latestEntry.rn, 1)),
    )
    .where(eq(exercise.sessionId, found.id))
    .orderBy(desc(exercise.createdAt));

  return (
    <div className="min-h-svh px-4 py-6">
      <div className="mx-auto w-full max-w-lg">
        <header className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" asChild>
              <Link href="/sessions">
                <ChevronLeft className="size-5" />
                <span className="sr-only">Back to sessions</span>
              </Link>
            </Button>
            <div>
              <p className="text-primary mb-1 text-xs font-medium tracking-widest uppercase">
                Session
              </p>
              <h1 className="text-2xl font-bold tracking-tight">
                {found.name}
              </h1>
            </div>
          </div>
          <UserMenu name={name} email={email} />
        </header>
        <ExerciseList exercises={exercises} sessionId={found.id} />
      </div>
    </div>
  );
}
