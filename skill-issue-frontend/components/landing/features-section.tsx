import { Shield, Users, Zap } from "lucide-react"

const features = [
  {
    icon: Shield,
    title: "Secure Escrow",
    description:
      "All bets are held in escrow until match completion. Funds are fully protected and automatically distributed to the winners.",
  },
  {
    icon: Users,
    title: "Fair Matchmaking",
    description:
      "Our ELO-based system ensures balanced matches. Play against opponents of similar skill level for truly competitive games.",
  },
  {
    icon: Zap,
    title: "Instant Payouts",
    description:
      "Winnings are credited to your wallet in under 30 seconds. Withdraw to your bank or crypto wallet anytime.",
  },
]

export function FeaturesSection() {
  return (
    <section className="px-4 py-24">
      <div className="mx-auto max-w-6xl">
        <div className="mb-16 text-center">
          <h2 className="text-balance text-3xl font-bold text-foreground md:text-4xl">
            Built for competitive players
          </h2>
          <p className="mt-4 text-muted-foreground text-lg">
            Every feature designed to make wagering safe, fair, and fast.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="group relative rounded-xl border border-border bg-card p-8 transition-all hover:border-primary/30 hover:glow-sm"
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
