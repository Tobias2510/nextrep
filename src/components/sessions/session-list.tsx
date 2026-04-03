"use client";

import { Button } from "@/components/ui/button";
import { Card, CardAction, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
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
  BicepsFlexed,
  Dumbbell,
  MoreHorizontal,
  Pencil,
  Trash2,
} from "lucide-react";
import { useState } from "react";
import { AddSessionDrawer } from "./add-session-drawer";
import { toast } from "sonner";
import { deleteSession, renameSession } from "@/actions/session";
import { Input } from "@/components/ui/input";
import { Spinner } from "../ui/spinner";
import Link from "next/link";

type Session = {
  id: string;
  name: string;
};

export function SessionList({ sessions }: { sessions: Session[] }) {
  if (sessions.length === 0) {
    return (
      <Empty>
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <BicepsFlexed />
          </EmptyMedia>
          <EmptyTitle>No Training Sessions</EmptyTitle>
          <EmptyDescription>
            You did not created any training sessions, yet.
          </EmptyDescription>
        </EmptyHeader>
        <EmptyContent>
          <AddSessionDrawer />
        </EmptyContent>
      </Empty>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      {sessions.map((session) => (
        <SessionCard key={session.id} session={session} />
      ))}

      <AddSessionDrawer />
    </div>
  );
}

function SessionCard({ session }: { session: Session }) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(session.name);

  async function handleRename() {
    const trimmed = name.trim();
    if (!trimmed || trimmed === session.name) {
      setEditing(false);
      return;
    }
    setLoading(true);
    try {
      await renameSession({ sessionId: session.id, name: trimmed });
      toast.success("Session renamed");
      setEditing(false);
      setOpen(false);
    } catch {
      toast.error("Failed to rename the session.");
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete() {
    setLoading(true);
    try {
      await deleteSession(session.id);
    } catch {
      toast.error("Failed to delete the session.");
    } finally {
      setLoading(false);
      setOpen(false);
    }
  }

  return (
    <Card className="relative bg-muted/40 hover:bg-muted/60 active:bg-muted/80 cursor-pointer border-0 ring-0 transition-colors">
      <Link
        href={`/sessions/${session.id}`}
        className="absolute inset-0 z-0"
        aria-hidden="true"
        tabIndex={-1}
      />
      <CardHeader className="items-center">
        <div className="flex items-center gap-3">
          <div className="bg-primary/10 flex size-9 shrink-0 items-center justify-center rounded-lg">
            <Dumbbell className="text-primary size-4" />
          </div>
          <CardTitle>{session.name}</CardTitle>
        </div>
        <CardAction className="relative z-10 self-center">
          <Drawer
            open={open}
            onOpenChange={(isOpen) => {
              setOpen(isOpen);
              if (!isOpen) {
                setEditing(false);
                setName(session.name);
              }
            }}
          >
            <DrawerTrigger asChild>
              <Button variant="ghost" size="icon">
                <MoreHorizontal className="size-5" />
                <span className="sr-only">Actions</span>
              </Button>
            </DrawerTrigger>
            <DrawerContent>
              {editing ? (
                <>
                  <DrawerHeader className="text-left">
                    <DrawerTitle>Rename Session</DrawerTitle>
                    <DrawerDescription>
                      Give your session a new name.
                    </DrawerDescription>
                  </DrawerHeader>
                  <div className="px-4">
                    <Input
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") handleRename();
                      }}
                      placeholder="e.g. Upper Body"
                      autoFocus
                      maxLength={50}
                    />
                  </div>
                  <DrawerFooter>
                    <Button disabled={loading} onClick={handleRename}>
                      {loading && <Spinner />}
                      Save
                    </Button>
                  </DrawerFooter>
                </>
              ) : (
                <>
                  <DrawerHeader className="text-left">
                    <DrawerTitle>{session.name}</DrawerTitle>
                    <DrawerDescription>Session options</DrawerDescription>
                  </DrawerHeader>
                  <nav className="flex flex-col gap-1 px-4 pb-4">
                    <button
                      type="button"
                      className="text-foreground hover:bg-muted flex items-center gap-3 rounded-lg px-3 py-3 text-sm transition-colors"
                      onClick={() => setEditing(true)}
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
                </>
              )}
            </DrawerContent>
          </Drawer>
        </CardAction>
      </CardHeader>
    </Card>
  );
}
