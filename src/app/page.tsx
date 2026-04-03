import dynamic from "next/dynamic";
import Link from "next/link";
import { Info } from "lucide-react";

const Navbar = dynamic(() =>
  import("@/components/landing/navbar").then((m) => m.Navbar),
);
const Hero = dynamic(() =>
  import("@/components/landing/hero").then((m) => m.Hero),
);
const Features = dynamic(() =>
  import("@/components/landing/features").then((m) => m.Features),
);
const CTA = dynamic(() =>
  import("@/components/landing/cta").then((m) => m.CTA),
);

export default function Home() {
  return (
    <>
      <Navbar />
      {process.env.SHOW_PERSONAL_USE_BANNER === "true" && (
        <div className="bg-muted/40 fixed top-14 right-0 left-0 z-40 border-b border-border/50 py-2 text-center text-xs text-muted-foreground">
          <span className="inline-flex items-center gap-1.5">
            <Info className="size-3" />
            This app is for personal use of the creator only.
          </span>
        </div>
      )}
      <main>
        <Hero />
        <Features />
        <CTA />
      </main>
      <footer className="text-muted-foreground flex flex-col items-center gap-2 py-8 text-sm">
        <span>Hythropa &middot; {new Date().getFullYear()}</span>
        <nav className="flex gap-4">
          <Link href="/impressum" className="hover:text-foreground transition-colors">
            Impressum
          </Link>
          <Link href="/privacy" className="hover:text-foreground transition-colors">
            Datenschutz
          </Link>
          <Link href="/terms" className="hover:text-foreground transition-colors">
            Nutzungsbedingungen
          </Link>
        </nav>
      </footer>
    </>
  );
}
