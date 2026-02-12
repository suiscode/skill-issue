import Link from "next/link"
import { Plus, Trophy, TrendingUp, Target } from "lucide-react"
import { Button } from "@/components/ui/button"
import { TopNavbar } from "@/components/top-navbar"
import { WalletCard } from "@/components/dashboard/wallet-card"
import { ActiveMatches } from "@/components/dashboard/active-matches"
import { MatchHistory } from "@/components/dashboard/match-history"

const quickStats = [
  {
    label: "Win Rate",
    value: "68%",
    icon: Trophy,
    change: "+3%",
  },
  {
    label: "Matches",
    value: "142",
    icon: Target,
    change: "+12 this week",
  },
  {
    label: "Earnings",
    value: "$1,247",
    icon: TrendingUp,
    change: "+$180 this week",
  },
]

export default function DashboardPage() {
  return (
    <>
      <TopNavbar title="Dashboard" />
      <div className="flex-1 overflow-auto p-4 lg:p-6">
        {/* Quick action */}
        <div className="mb-6 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h2 className="text-2xl font-bold text-foreground">
              Welcome back, ProXenon
            </h2>
            <p className="text-sm text-muted-foreground">
              {"Here's what's happening with your matches today."}
            </p>
          </div>
          <Button
            asChild
            className="glow-sm bg-primary text-primary-foreground hover:bg-primary/90"
          >
            <Link href="/create-match">
              <Plus className="mr-1.5 h-4 w-4" />
              Create New Match
            </Link>
          </Button>
        </div>

        {/* Stats + Wallet Row */}
        <div className="mb-6 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <WalletCard />
          {quickStats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-xl border border-border bg-card p-5"
            >
              <div className="flex items-center gap-2 text-muted-foreground">
                <stat.icon className="h-4 w-4" />
                <span className="text-xs">{stat.label}</span>
              </div>
              <div className="mt-2 font-mono text-2xl font-bold text-foreground">
                {stat.value}
              </div>
              <div className="mt-1 text-xs text-success">{stat.change}</div>
            </div>
          ))}
        </div>

        {/* Active Matches + History */}
        <div className="grid gap-6 lg:grid-cols-2">
          <ActiveMatches />
          <MatchHistory />
        </div>
      </div>
    </>
  )
}
