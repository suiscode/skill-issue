const stats = [
  { label: "Stage", value: "BETA", description: "public early access" },
  { label: "Region", value: "GLOBAL", description: "starting with NA + EU" },
  { label: "Focus", value: "5v5", description: "competitive team format" },
  { label: "Roadmap", value: "LIVE", description: "weekly feature updates" },
]

export function StatsSection() {
  return (
    <section className="border-y border-border bg-card/35">
      <div className="mx-auto grid max-w-6xl grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, i) => (
          <div
            key={stat.label}
            className={`flex flex-col items-center gap-1 px-6 py-10 ${
              i < stats.length - 1 ? "lg:border-r lg:border-border" : ""
            } ${i < 2 ? "border-b border-border lg:border-b-0" : ""} ${
              i === 0 ? "border-r border-border lg:border-r" : ""
            }`}
          >
            <span className="font-mono text-2xl font-bold tracking-tight text-primary md:text-3xl">
              {stat.value}
            </span>
            <span className="mt-1 text-[11px] uppercase tracking-[0.15em] text-foreground/80">
              {stat.label}
            </span>
            <span className="text-xs text-muted-foreground">
              {stat.description}
            </span>
          </div>
        ))}
      </div>
    </section>
  )
}
