"use server";

import { auth } from "@/lib/auth";
import { db } from "@/lib/db-connection";
import { trainingSession } from "@/db/schema";
import {
  sessionSchema,
  renameSessionSchema,
} from "@/lib/validation/session-schema";
import { headers } from "next/headers";
import { revalidatePath } from "next/cache";
import z from "zod/v4";
import { and, eq } from "drizzle-orm";

export async function createSession(data: { name: string }) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    throw new Error("Unauthorized");
  }

  const parsed = sessionSchema.parse(data);

  await db.insert(trainingSession).values({
    name: parsed.name,
    userId: session.user.id,
  });

  revalidatePath("/sessions");
}

const idSchema = z.uuid();

export async function deleteSession(sessionId: string) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    throw new Error("Unauthorized");
  }

  const parsed = idSchema.parse(sessionId);

  await db
    .delete(trainingSession)
    .where(
      and(
        eq(trainingSession.id, parsed),
        eq(trainingSession.userId, session.user.id),
      ),
    );

  revalidatePath("/sessions");
}

export async function renameSession(data: {
  sessionId: string;
  name: string;
}) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    throw new Error("Unauthorized");
  }

  const parsed = renameSessionSchema.parse(data);

  await db
    .update(trainingSession)
    .set({ name: parsed.name })
    .where(
      and(
        eq(trainingSession.id, parsed.sessionId),
        eq(trainingSession.userId, session.user.id),
      ),
    );

  revalidatePath("/sessions");
}
