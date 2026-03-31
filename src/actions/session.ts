"use server";

import { auth } from "@/lib/auth";
import { db } from "@/lib/db-connection";
import { trainingSession } from "@/db/schema";
import { sessionSchema } from "@/lib/validation/session-schema";
import { headers } from "next/headers";
import { revalidatePath } from "next/cache";

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

  revalidatePath("/home");
}
