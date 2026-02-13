import Link from "next/link"
import { ArrowRight, ShieldCheck, Sparkles, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"

export function HeroSection() {
  return (
    <section className="relative flex min-h-[95vh] flex-col items-center justify-center overflow-hidden px-4 text-center">
      <div
        className="pointer-events-none absolute inset-0 opacity-60"
        style={{
          backgroundImage:
            "linear-gradient(hsl(var(--border) / 0.3) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--border) / 0.3) 1px, transparent 1px)",
          backgroundSize: "52px 52px",
        }}
      />
      <div className="pointer-events-none absolute top-20 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-primary/25 blur-[110px]" />
      <div className="pointer-events-none absolute bottom-10 right-1/4 h-44 w-44 rounded-full bg-accent/20 blur-[90px]" />

      <div className="relative z-10 flex max-w-5xl flex-col items-center gap-8">
        <div className="fade-up inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs uppercase tracking-[0.16em] text-primary">
          <Sparkles className="h-3.5 w-3.5" />
          <span>Early Access Open</span>
        </div>

        <h1 className="fade-up text-balance text-5xl font-bold leading-tight tracking-tight text-foreground md:text-7xl lg:text-8xl">
          Build Your Competitive
          <br />
          <span className="glow-text text-primary">Edge From Day One.</span>
        </h1>

        <p className="fade-up max-w-3xl text-balance text-lg leading-relaxed text-muted-foreground md:text-xl">
          ARENA is a brand-new competitive match platform in beta. Join early,
          verify your account, create your first lobby, and help shape the
          product before full launch.
        </p>

        <div className="fade-up flex flex-col items-center gap-4 sm:flex-row">
          <Button
            asChild
            size="lg"
            className="surface-border glow-md bg-primary text-primary-foreground hover:bg-primary/90 px-8 text-base font-semibold"
          >
            <Link href="/signup">
              Join Beta
              <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </Button>
          <Button
            asChild
            variant="outline"
            size="lg"
            className="border-border bg-secondary/60 text-foreground hover:bg-secondary px-8 text-base"
          >
            <Link href="/signin">Sign In</Link>
          </Button>
        </div>

        <div className="fade-up mt-2 grid w-full max-w-3xl gap-3 text-left sm:grid-cols-3">
          <div className="surface-border rounded-xl bg-card/55 p-3">
            <div className="mb-2 flex items-center gap-2 text-primary">
              <ShieldCheck className="h-4 w-4" />
              <span className="text-xs uppercase tracking-[0.14em]">Security</span>
            </div>
            <p className="text-xs text-muted-foreground">
              Verified accounts and clear access controls before real-money flow.
            </p>
          </div>
          <div className="surface-border rounded-xl bg-card/55 p-3">
            <div className="mb-2 flex items-center gap-2 text-primary">
              <Zap className="h-4 w-4" />
              <span className="text-xs uppercase tracking-[0.14em]">Speed</span>
            </div>
            <p className="text-xs text-muted-foreground">
              Fast setup for lobbies and matches with minimal friction.
            </p>
          </div>
          <div className="surface-border rounded-xl bg-card/55 p-3">
            <div className="mb-2 flex items-center gap-2 text-primary">
              <Sparkles className="h-4 w-4" />
              <span className="text-xs uppercase tracking-[0.14em]">Beta</span>
            </div>
            <p className="text-xs text-muted-foreground">
              Product is evolving weekly. Early users directly influence roadmap.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
