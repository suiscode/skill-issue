const stats = [
  { label: "Total Matches", value: "1.2M+", description: "matches played" },
  { label: "Total Payouts", value: "$8.4M", description: "paid to winners" },
  { label: "Active Players", value: "48K", description: "playing now" },
  { label: "Avg Payout Time", value: "<30s", description: "instant cashout" },
]

export function StatsSection() {
  return (
    <section className="border-y border-border bg-card/30">
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
            <span className="font-mono text-3xl font-bold text-primary md:text-4xl">
              {stat.value}
            </span>
            <span className="text-sm text-muted-foreground">
              {stat.description}
            </span>
          </div>
        ))}
      </div>
    </section>
  )
}
