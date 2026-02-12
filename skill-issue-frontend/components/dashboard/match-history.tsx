import { Badge } from "@/components/ui/badge"

const history = [
  {
    game: "Valorant",
    date: "2 hours ago",
    result: "Win",
    earnings: "+$45.00",
    score: "13-9",
  },
  {
    game: "CS2",
    date: "5 hours ago",
    result: "Loss",
    earnings: "-$25.00",
    score: "14-16",
  },
  {
    game: "Valorant",
    date: "Yesterday",
    result: "Win",
    earnings: "+$90.00",
    score: "13-7",
  },
  {
    game: "Dota 2",
    date: "Yesterday",
    result: "Win",
    earnings: "+$20.00",
    score: "1-0",
  },
  {
    game: "CS2",
    date: "2 days ago",
    result: "Loss",
    earnings: "-$50.00",
    score: "10-16",
  },
]

export function MatchHistory() {
  return (
    <div className="rounded-xl border border-border bg-card">
      <div className="border-b border-border px-5 py-4">
        <h3 className="text-sm font-semibold text-foreground">
          Recent Match History
        </h3>
      </div>
      <div className="divide-y divide-border">
        {history.map((match, i) => (
          <div
            key={`${match.game}-${i}`}
            className="flex items-center justify-between px-5 py-3.5"
          >
            <div className="flex items-center gap-4">
              <Badge
                variant="outline"
                className={`w-12 justify-center text-[10px] font-semibold ${
                  match.result === "Win"
                    ? "border-success/30 bg-success/10 text-success"
                    : "border-destructive/30 bg-destructive/10 text-destructive"
                }`}
              >
                {match.result}
              </Badge>
              <div className="flex flex-col">
                <span className="text-sm font-medium text-foreground">
                  {match.game}
                </span>
                <span className="text-xs text-muted-foreground">
                  {match.date}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <span className="font-mono text-xs text-muted-foreground">
                {match.score}
              </span>
              <span
                className={`font-mono text-sm font-medium ${
                  match.result === "Win" ? "text-success" : "text-destructive"
                }`}
              >
                {match.earnings}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
