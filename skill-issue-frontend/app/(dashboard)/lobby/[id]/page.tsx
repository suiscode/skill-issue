"use client"

import { useState, useEffect } from "react"
import { Clock, Shield, Swords } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { TopNavbar } from "@/components/top-navbar"
import { TeamPanel } from "@/components/lobby/team-panel"
import { LobbyChat } from "@/components/lobby/lobby-chat"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const teamA = [
  {
    name: "ProXenon",
    avatar: "https://api.dicebear.com/7.x/thumbs/svg?seed=proxenon",
    ready: true,
    rank: "Diamond II",
  },
  {
    name: "NightOwl",
    avatar: "https://api.dicebear.com/7.x/thumbs/svg?seed=nightowl",
    ready: true,
    rank: "Platinum I",
  },
  {
    name: "ShadowX",
    avatar: "https://api.dicebear.com/7.x/thumbs/svg?seed=shadowx",
    ready: false,
    rank: "Diamond I",
  },
  {
    name: "BlazeFury",
    avatar: "https://api.dicebear.com/7.x/thumbs/svg?seed=blazefury",
    ready: true,
    rank: "Gold III",
  },
]

const teamB = [
  {
    name: "VoidWalker",
    avatar: "https://api.dicebear.com/7.x/thumbs/svg?seed=voidwalker",
    ready: true,
    rank: "Diamond III",
  },
  {
    name: "IceBreaker",
    avatar: "https://api.dicebear.com/7.x/thumbs/svg?seed=icebreaker",
    ready: true,
    rank: "Platinum II",
  },
  {
    name: "StormRider",
    avatar: "https://api.dicebear.com/7.x/thumbs/svg?seed=stormrider",
    ready: true,
    rank: "Diamond I",
  },
]

export default function LobbyPage() {
  const [countdown, setCountdown] = useState(127)

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown((c) => (c > 0 ? c - 1 : 0))
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  const minutes = Math.floor(countdown / 60)
  const seconds = countdown % 60

  return (
    <>
      <TopNavbar title="Match Lobby" />
      <div className="flex-1 overflow-auto p-4 lg:p-6">
        {/* Match Info Bar */}
        <div className="mb-6 flex flex-col items-start justify-between gap-4 rounded-xl border border-border bg-card px-5 py-4 sm:flex-row sm:items-center">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Swords className="h-4 w-4 text-primary" />
              <span className="text-sm font-semibold text-foreground">
                Valorant 5v5
              </span>
            </div>
            <Badge
              variant="outline"
              className="border-primary/30 bg-primary/10 text-primary text-xs"
            >
              $25 / player
            </Badge>
            <Badge
              variant="outline"
              className="border-success/30 bg-success/10 text-success text-xs"
            >
              <Shield className="mr-1 h-3 w-3" />
              Escrow Active
            </Badge>
          </div>
          <div className="flex items-center gap-2 rounded-lg border border-border bg-secondary px-4 py-2">
            <Clock className="h-4 w-4 text-chart-3" />
            <span className="font-mono text-sm font-bold text-foreground">
              {minutes}:{seconds.toString().padStart(2, "0")}
            </span>
            <span className="text-xs text-muted-foreground">until start</span>
          </div>
        </div>

        {/* Teams */}
        <div className="mb-6 grid gap-6 lg:grid-cols-2">
          <TeamPanel team="Team A" players={teamA} color="primary" />
          <TeamPanel team="Team B" players={teamB} color="destructive" />
        </div>

        {/* Chat + Result Panel */}
        <div className="grid gap-6 lg:grid-cols-2">
          <LobbyChat />

          {/* Match Result Submission */}
          <div className="rounded-xl border border-border bg-card">
            <div className="border-b border-border px-5 py-4">
              <h3 className="text-sm font-semibold text-foreground">
                Match Result
              </h3>
            </div>
            <div className="flex flex-col gap-4 p-5">
              <p className="text-sm text-muted-foreground">
                Submit the match result once the game has ended. Both teams must
                confirm the result.
              </p>
              <div>
                <label className="mb-2 block text-xs font-medium text-muted-foreground">
                  Winning Team
                </label>
                <Select>
                  <SelectTrigger className="border-border bg-secondary text-foreground">
                    <SelectValue placeholder="Select winner" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="team-a">Team A</SelectItem>
                    <SelectItem value="team-b">Team B</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="mb-2 block text-xs font-medium text-muted-foreground">
                    Score (Winner)
                  </label>
                  <Select>
                    <SelectTrigger className="border-border bg-secondary text-foreground">
                      <SelectValue placeholder="13" />
                    </SelectTrigger>
                    <SelectContent>
                      {Array.from({ length: 14 }, (_, i) => i + 13).map(
                        (n) => (
                          <SelectItem key={n} value={String(n)}>
                            {n}
                          </SelectItem>
                        ),
                      )}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="mb-2 block text-xs font-medium text-muted-foreground">
                    Score (Loser)
                  </label>
                  <Select>
                    <SelectTrigger className="border-border bg-secondary text-foreground">
                      <SelectValue placeholder="0" />
                    </SelectTrigger>
                    <SelectContent>
                      {Array.from({ length: 13 }, (_, i) => i).map((n) => (
                        <SelectItem key={n} value={String(n)}>
                          {n}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <Button className="glow-sm bg-primary text-primary-foreground hover:bg-primary/90 font-semibold">
                Submit Result
              </Button>
              <p className="text-[10px] text-muted-foreground">
                Submitting false results may lead to account suspension and
                forfeiture of funds.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
