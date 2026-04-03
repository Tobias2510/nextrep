import dynamic from "next/dynamic";

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
      <main>
        <Hero />
        <Features />
        <CTA />
      </main>
      <footer className="text-muted-foreground py-8 text-center text-sm">
        Hythropa &middot; {new Date().getFullYear()}
      </footer>
    </>
  );
}
