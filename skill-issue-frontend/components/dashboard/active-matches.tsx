import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

const activeMatches = [
  {
    id: "match-001",
    game: "Valorant",
    format: "5v5",
    bet: "$25",
    status: "Waiting",
    players: "7/10",
    region: "NA East",
  },
  {
    id: "match-002",
    game: "CS2",
    format: "5v5",
    bet: "$50",
    status: "In Progress",
    players: "10/10",
    region: "EU West",
  },
  {
    id: "match-003",
    game: "Dota 2",
    format: "5v5",
    bet: "$10",
    status: "Waiting",
    players: "4/10",
    region: "NA West",
  },
]

export function ActiveMatches() {
  return (
    <div className="rounded-xl border border-border bg-card">
      <div className="flex items-center justify-between border-b border-border px-5 py-4">
        <h3 className="text-sm font-semibold text-foreground">
          Active Matches
        </h3>
        <Badge
          variant="outline"
          className="border-primary/30 bg-primary/10 text-primary text-xs"
        >
          {activeMatches.length} live
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
                      : "border-chart-3/30 bg-chart-3/10 text-chart-3"
                  }`}
                >
                  {match.status}
                </Badge>
              </div>
              <Button
                asChild
                variant="outline"
                size="sm"
                className="border-border bg-transparent text-foreground hover:bg-accent text-xs"
              >
                <Link href={`/lobby/${match.id}`}>
                  {match.status === "Waiting" ? "Join" : "Spectate"}
                </Link>
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
