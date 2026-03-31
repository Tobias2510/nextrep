"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const stagger = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] as const },
  },
};

export function Hero() {
  return (
    <section className="relative flex min-h-[100dvh] items-center justify-center overflow-hidden px-6 pt-14">
      {/* Gradient glow */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="bg-primary/15 h-[500px] w-[500px] rounded-full blur-[80px] md:h-[600px] md:w-[600px]"
        />
      </div>

      <motion.div
        variants={stagger}
        initial="hidden"
        animate="show"
        className="relative z-10 mx-auto flex max-w-2xl flex-col items-center text-center"
      >
        <motion.p
          variants={fadeUp}
          className="text-primary mb-4 text-sm font-medium tracking-widest uppercase"
        >
          Your Fitness Companion
        </motion.p>

        <motion.h1
          variants={fadeUp}
          className="text-foreground text-4xl leading-[1.1] font-bold tracking-tight sm:text-5xl md:text-6xl"
        >
          Track Every Rep.
          <br />
          <span className="text-primary">See Every Gain.</span>
        </motion.h1>

        <motion.p
          variants={fadeUp}
          className="text-muted-foreground mt-5 max-w-md text-base leading-relaxed md:text-lg"
        >
          Log your workouts, track your progress, and crush your personal
          records — all in one place.
        </motion.p>

        <motion.div
          variants={fadeUp}
          className="mt-8 flex flex-col gap-3 sm:flex-row"
        >
          <Button size="lg" asChild className="px-6">
            <Link href="/sessions">
              Get Started
              <ArrowRight className="ml-1 size-4" />
            </Link>
          </Button>
          <Button variant="ghost" size="lg" asChild>
            <a href="#features">Learn More</a>
          </Button>
        </motion.div>
      </motion.div>
    </section>
  );
}
