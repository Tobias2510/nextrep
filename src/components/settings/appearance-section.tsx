"use client";

import { useEffect, useState } from "react";
import { Monitor, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import SectionHeader from "./section-header";
import { cn } from "@/lib/utils";

export default function AppearanceSection() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const options = [
    { value: "light", label: "Light", icon: Sun },
    { value: "dark", label: "Dark", icon: Moon },
    { value: "system", label: "System", icon: Monitor },
  ] as const;

  return (
    <section>
      <SectionHeader
        title="Appearance"
        description="Choose your preferred theme."
      />

      <div className="flex gap-2">
        {options.map(({ value, label, icon: Icon }) => (
          <button
            key={value}
            type="button"
            onClick={() => setTheme(value)}
            className={cn(
              "flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-lg border px-3 py-2.5 text-sm font-medium transition-colors",
              mounted && theme === value
                ? "bg-primary text-primary-foreground border-primary"
                : "bg-muted/40 text-muted-foreground hover:bg-muted border-transparent",
            )}
          >
            <Icon className="size-4" />
            {label}
          </button>
        ))}
      </div>
    </section>
  );
}
