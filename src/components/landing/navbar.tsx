"use client";

import Link from "next/link";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function Navbar() {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 20);
  });

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] as const }}
      className={cn(
        "fixed top-0 right-0 left-0 z-50 flex h-14 items-center justify-between px-6 transition-colors duration-300",
        scrolled
          ? "border-b border-border/50 bg-background/80 backdrop-blur-xl"
          : "bg-transparent"
      )}
    >
      <Link
        href="/"
        className="text-lg font-bold tracking-tight text-foreground"
      >
        NextRep
      </Link>
      <Button variant="ghost" size="sm" asChild>
        <Link href="/login">Log in</Link>
      </Button>
    </motion.nav>
  );
}
