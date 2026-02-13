import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

const activeMatches = [
  {
    id: "draft-001",
    game: "Beta Queue",
    format: "5v5",
    bet: "TBD",
    status: "Planned",
    players: "0/10",
    region: "NA",
  },
]

export function ActiveMatches() {
  return (
    <div className="rounded-xl border border-border bg-card">
      <div className="flex items-center justify-between border-b border-border px-5 py-4">
        <h3 className="text-sm font-semibold text-foreground">
          Match Readiness
        </h3>
        <Badge
          variant="outline"
          className="border-primary/30 bg-primary/10 text-primary text-xs"
        >
          Beta
        </Badge>
      </div>
      <div className="divide-y divide-border">
        {activeMatches.map((match) => (
          <div
            key={match.id}
            className="flex items-center justify-between px-5 py-4"
          >
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-foreground">
                  {match.game}
                </span>
                <span className="text-xs text-muted-foreground">
                  {match.format}
                </span>
              </div>
              <div className="flex items-center gap-3 text-xs text-muted-foreground">
                <span>{match.region}</span>
                <span>{match.players} players</span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="text-right">
                <div className="font-mono text-sm font-medium text-foreground">
                  {match.bet}
                </div>
                <Badge
                  variant="outline"
                  className={`text-[10px] ${
                    match.status === "In Progress"
                      ? "border-success/30 bg-success/10 text-success"
                      : "border-accent/30 bg-accent/10 text-accent"
                  }`}
                >
                  {match.status}
                </Badge>
              </div>
              <Button variant="outline" size="sm" className="text-xs">
                Setup
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
