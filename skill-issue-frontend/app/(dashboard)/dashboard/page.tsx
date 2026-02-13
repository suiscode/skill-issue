"use client"

import Link from "next/link"
import { Plus, ShieldCheck, Target, Wrench } from "lucide-react"
import { Button } from "@/components/ui/button"
import { TopNavbar } from "@/components/top-navbar"
import { WalletCard } from "@/components/dashboard/wallet-card"
import { ActiveMatches } from "@/components/dashboard/active-matches"
import { MatchHistory } from "@/components/dashboard/match-history"
import { useAuth } from "@/components/auth-provider"

const quickStats = [
  {
    label: "Account",
    value: "Verified",
    icon: ShieldCheck,
    change: "Email confirmed",
  },
  {
    label: "Setup",
    value: "In Progress",
    icon: Target,
    change: "Create your first lobby",
  },
  {
    label: "Build Stage",
    value: "Beta",
    icon: Wrench,
    change: "Weekly improvements",
  },
]

export default function DashboardPage() {
  const { user } = useAuth()

  return (
    <>
      <TopNavbar title="Dashboard" />
      <div className="flex-1 overflow-auto p-4 lg:p-6">
        {/* Quick action */}
        <div className="mb-6 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h2 className="text-2xl font-bold text-foreground">
              Welcome, {user?.username ?? "Player"}
            </h2>
            <p className="text-sm text-muted-foreground">
              Beta workspace for setting up your competitive profile and first match flow.
            </p>
          </div>
          <Button
            asChild
            className="glow-sm bg-primary text-primary-foreground hover:bg-primary/90"
          >
            <Link href="/create-match">
              <Plus className="mr-1.5 h-4 w-4" />
              Create Your First Match
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
