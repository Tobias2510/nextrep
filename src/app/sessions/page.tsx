import { auth } from "@/lib/auth";
import { db } from "@/lib/db-connection";
import { trainingSession } from "@/db/schema";
import { eq, desc } from "drizzle-orm";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { SessionList } from "@/components/sessions/session-list";
import { UserMenu } from "@/components/sessions/user-menu";

export default async function HomePage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) redirect("/login");

  const { name, email } = session.user;

  const sessions = await db
    .select({ id: trainingSession.id, name: trainingSession.name })
    .from(trainingSession)
    .where(eq(trainingSession.userId, session.user.id))
    .orderBy(desc(trainingSession.createdAt));

  return (
    <div className="min-h-svh px-4 py-6">
      <div className="mx-auto w-full max-w-lg">
        <header className="mb-6 flex items-center justify-between">
          <div>
            <p className="text-primary mb-1 text-xs font-medium tracking-widest uppercase">
              Dashboard
            </p>
            <h1 className="text-2xl font-bold tracking-tight">Your Sessions</h1>
          </div>
          <UserMenu name={name} email={email} />
        </header>
        <SessionList sessions={sessions} />
      </div>
    </div>
  );
}
