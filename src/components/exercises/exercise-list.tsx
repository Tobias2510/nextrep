"use client";

import { Button } from "@/components/ui/button";
import { Card, CardAction, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { Separator } from "@/components/ui/separator";
import {
  Dumbbell,
  MoreHorizontal,
  Pencil,
  Trash2,
} from "lucide-react";
import { useState } from "react";
import { AddExerciseDrawer } from "./add-exercise-drawer";
import { toast } from "sonner";
import { deleteExercise } from "@/actions/exercise";
import { Spinner } from "../ui/spinner";
import Link from "next/link";

type Exercise = {
  id: string;
  name: string;
};

export function ExerciseList({
  exercises,
  sessionId,
}: {
  exercises: Exercise[];
  sessionId: string;
}) {
  if (exercises.length === 0) {
    return (
      <Empty>
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <Dumbbell />
          </EmptyMedia>
          <EmptyTitle>No Exercises</EmptyTitle>
          <EmptyDescription>
            Add your first exercise to this session.
          </EmptyDescription>
        </EmptyHeader>
        <EmptyContent>
          <AddExerciseDrawer sessionId={sessionId} />
        </EmptyContent>
      </Empty>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      {exercises.map((exercise) => (
        <ExerciseCard
          key={exercise.id}
          exercise={exercise}
          sessionId={sessionId}
        />
      ))}

      <AddExerciseDrawer sessionId={sessionId} />
    </div>
  );
}

function ExerciseCard({
  exercise,
  sessionId,
}: {
  exercise: Exercise;
  sessionId: string;
}) {
  const [open, setOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  async function handleDelete() {
    setLoading(true);
    try {
      await deleteExercise(exercise.id, sessionId);
    } catch {
      toast.error("Failed to delete the exercise.");
    } finally {
      setLoading(false);
      setOpen(false);
    }
  }

  return (
    <Card className="relative bg-muted/40 hover:bg-muted/60 active:bg-muted/80 cursor-pointer border-0 ring-0 transition-colors">
      <Link
        href={`/sessions/${sessionId}/${exercise.id}`}
        className="absolute inset-0 z-0"
        aria-hidden="true"
        tabIndex={-1}
      />
      <CardHeader className="items-center">
        <div className="flex items-center gap-3">
          <div className="bg-primary/10 flex size-9 shrink-0 items-center justify-center rounded-lg">
            <Dumbbell className="text-primary size-4" />
          </div>
          <CardTitle>{exercise.name}</CardTitle>
        </div>
        <CardAction className="relative z-10 self-center">
          <Drawer open={open} onOpenChange={setOpen}>
            <DrawerTrigger asChild>
              <Button variant="ghost" size="icon">
                <MoreHorizontal className="size-5" />
                <span className="sr-only">Actions</span>
              </Button>
            </DrawerTrigger>
            <DrawerContent>
              <DrawerHeader className="text-left">
                <DrawerTitle>{exercise.name}</DrawerTitle>
                <DrawerDescription>Exercise options</DrawerDescription>
              </DrawerHeader>

              <nav className="flex flex-col gap-1 px-4 pb-4">
                <button
                  type="button"
                  className="text-foreground hover:bg-muted flex items-center gap-3 rounded-lg px-3 py-3 text-sm transition-colors"
                  onClick={() => setOpen(false)}
                >
                  <Pencil className="text-muted-foreground size-4" />
                  Edit
                </button>
                <Separator />
                <button
                  type="button"
                  className="text-destructive hover:bg-destructive/10 flex items-center gap-3 rounded-lg px-3 py-3 text-sm transition-colors"
                  onClick={handleDelete}
                >
                  {loading ? (
                    <Spinner />
                  ) : (
                    <>
                      <Trash2 className="size-4" />
                      Delete
                    </>
                  )}
                </button>
              </nav>
            </DrawerContent>
          </Drawer>
        </CardAction>
      </CardHeader>
    </Card>
  );
}
