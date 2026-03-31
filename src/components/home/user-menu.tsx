"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
} from "@/components/ui/drawer";
import { Separator } from "@/components/ui/separator";
import { Settings, LogOut } from "lucide-react";
import { Button } from "../ui/button";

export function UserMenu({ name, email }: { name: string; email: string }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);

  const initial = name.charAt(0).toUpperCase();

  async function handleLogout() {
    setLoggingOut(true);
    await authClient.signOut();
    router.push("/login");
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button
          type="button"
          className="flex size-11 shrink-0 cursor-pointer items-center justify-center rounded-full bg-primary/15 text-base font-semibold text-primary transition-colors hover:bg-primary/25"
        >
          {initial}
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <div className="flex items-center gap-3">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary/15 text-sm font-semibold text-primary">
              {initial}
            </div>
            <div className="min-w-0">
              <DrawerTitle>{name}</DrawerTitle>
              <DrawerDescription className="truncate">
                {email}
              </DrawerDescription>
            </div>
          </div>
        </DrawerHeader>

        <Separator />

        <nav className="flex flex-col gap-1 px-4 py-2">
          <button
            type="button"
            className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-foreground transition-colors hover:bg-muted"
          >
            <Settings className="size-4 text-muted-foreground" />
            Settings
          </button>
        </nav>

        <Separator />

        <div className="px-4 py-2 pb-4">
          <button
            type="button"
            disabled={loggingOut}
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-destructive transition-colors hover:bg-destructive/10 disabled:opacity-50"
          >
            <LogOut className="size-4" />
            {loggingOut ? "Logging out..." : "Log out"}
          </button>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
