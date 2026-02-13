import { Shield, Users, Zap } from "lucide-react"

const features = [
  {
    icon: Shield,
    title: "Trust-First Onboarding",
    description:
      "Email verification, profile identity, and transparent permissions are prioritized before scaling money flows.",
  },
  {
    icon: Users,
    title: "Structured Match Creation",
    description:
      "Create clear team formats and lobby rules so competitive games are easy to organize from day one.",
  },
  {
    icon: Zap,
    title: "Fast Iteration",
    description:
      "As a beta user, your feedback drives product direction. UX and systems are evolving weekly.",
  },
]

export function FeaturesSection() {
  return (
    <section className="px-4 py-24">
      <div className="mx-auto max-w-6xl">
        <div className="mb-16 text-center fade-up">
          <h2 className="text-balance text-3xl font-bold text-foreground md:text-4xl">
            Built for launch-ready competitive play
          </h2>
          <p className="mt-4 text-muted-foreground text-lg">
            Core systems first. Real polish next. No fake promises.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="surface-border group relative rounded-xl bg-card/70 p-8 transition-all hover:glow-sm"
            >
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary/20">
                <feature.icon className="h-5 w-5" />
              </div>
              <h3 className="mb-2 text-lg font-semibold text-foreground">
                {feature.title}
              </h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
