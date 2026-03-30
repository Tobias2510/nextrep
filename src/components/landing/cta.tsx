"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { AnimatedSection } from "./animated-section";

export function CTA() {
  return (
    <section className="px-6 py-20 md:py-32">
      <AnimatedSection>
        <div className="mx-auto max-w-lg rounded-2xl bg-muted/30 px-6 py-16 text-center ring-1 ring-border/50 md:px-12">
          <h2 className="text-3xl font-bold tracking-tight text-foreground">
            Start Tracking Today
          </h2>
          <p className="mt-3 text-muted-foreground">
            Free to use. No credit card required.
          </p>
          <div className="mt-8">
            <Button size="lg" asChild className="px-6">
              <Link href="/login">
                Get Started
                <ArrowRight className="ml-1 size-4" />
              </Link>
            </Button>
          </div>
        </div>
      </AnimatedSection>
    </section>
  );
}
