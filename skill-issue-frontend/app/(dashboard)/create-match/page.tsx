"use client"

import { useState } from "react"
import Link from "next/link"
import { Swords, Trophy, Users, DollarSign, Globe } from "lucide-react"
import { Button } from "@/components/ui/button"
import { TopNavbar } from "@/components/top-navbar"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"

const games = [
  { value: "valorant", label: "Valorant" },
  { value: "cs2", label: "CS2" },
  { value: "dota2", label: "Dota 2" },
  { value: "league", label: "League of Legends" },
  { value: "overwatch", label: "Overwatch 2" },
]

const regions = [
  { value: "na-east", label: "NA East" },
  { value: "na-west", label: "NA West" },
  { value: "eu-west", label: "EU West" },
  { value: "eu-east", label: "EU East" },
  { value: "asia", label: "Asia Pacific" },
]

export default function CreateMatchPage() {
  const [betAmount, setBetAmount] = useState([25])
  const [selectedGame, setSelectedGame] = useState("")

  const potentialWinnings = betAmount[0] * 10 * 0.9

  return (
    <>
      <TopNavbar title="Create Match" />
      <div className="flex-1 overflow-auto p-4 lg:p-6">
        <div className="mx-auto max-w-3xl">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-foreground">
              Create a New Match
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Set up your competitive match and start earning.
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-5">
            {/* Form */}
            <div className="flex flex-col gap-5 lg:col-span-3">
              {/* Game Selection */}
              <div className="rounded-xl border border-border bg-card p-5">
                <label className="mb-3 flex items-center gap-2 text-sm font-medium text-foreground">
                  <Swords className="h-4 w-4 text-primary" />
                  Game
                </label>
                <Select value={selectedGame} onValueChange={setSelectedGame}>
                  <SelectTrigger className="border-border bg-secondary text-foreground">
                    <SelectValue placeholder="Select a game" />
                  </SelectTrigger>
                  <SelectContent>
                    {games.map((game) => (
                      <SelectItem key={game.value} value={game.value}>
                        {game.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Format */}
              <div className="rounded-xl border border-border bg-card p-5">
                <label className="mb-3 flex items-center gap-2 text-sm font-medium text-foreground">
                  <Users className="h-4 w-4 text-primary" />
                  Match Format
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {["1v1", "3v3", "5v5"].map((format) => (
                    <button
                      key={format}
                      type="button"
                      className={`rounded-lg border px-4 py-3 text-sm font-medium transition-all ${
                        format === "5v5"
                          ? "border-primary bg-primary/10 text-primary glow-sm"
                          : "border-border bg-secondary text-muted-foreground hover:border-border hover:text-foreground"
                      }`}
                    >
                      {format}
                    </button>
                  ))}
                </div>
              </div>

              {/* Bet Amount */}
              <div className="rounded-xl border border-border bg-card p-5">
                <label className="mb-3 flex items-center gap-2 text-sm font-medium text-foreground">
                  <DollarSign className="h-4 w-4 text-primary" />
                  Bet per Player
                </label>
                <div className="mb-3 flex items-center justify-between">
                  <span className="font-mono text-2xl font-bold text-foreground">
                    ${betAmount[0]}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    $1 - $100
                  </span>
                </div>
                <Slider
                  value={betAmount}
                  onValueChange={setBetAmount}
                  min={1}
                  max={100}
                  step={1}
                  className="[&_[role=slider]]:bg-primary [&_[role=slider]]:border-primary [&_.range]:bg-primary"
                />
              </div>

              {/* Region */}
              <div className="rounded-xl border border-border bg-card p-5">
                <label className="mb-3 flex items-center gap-2 text-sm font-medium text-foreground">
                  <Globe className="h-4 w-4 text-primary" />
                  Region
                </label>
                <Select defaultValue="na-east">
                  <SelectTrigger className="border-border bg-secondary text-foreground">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {regions.map((region) => (
                      <SelectItem key={region.value} value={region.value}>
                        {region.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <Button
                asChild
                size="lg"
                className="glow-md bg-primary text-primary-foreground hover:bg-primary/90 font-semibold"
              >
                <Link href="/lobby/new-match">Start Match</Link>
              </Button>
            </div>

            {/* Preview Card */}
            <div className="lg:col-span-2">
              <div className="sticky top-6 rounded-xl border border-primary/20 bg-card p-6 glow-sm">
                <div className="mb-4 flex items-center gap-2">
                  <Trophy className="h-4 w-4 text-primary" />
                  <span className="text-sm font-semibold text-foreground">
                    Match Preview
                  </span>
                </div>
                <div className="flex flex-col gap-4">
                  <div className="flex items-center justify-between border-b border-border pb-3">
                    <span className="text-xs text-muted-foreground">Game</span>
                    <span className="text-sm font-medium text-foreground">
                      {selectedGame
                        ? games.find((g) => g.value === selectedGame)?.label
                        : "Not selected"}
                    </span>
                  </div>
                  <div className="flex items-center justify-between border-b border-border pb-3">
                    <span className="text-xs text-muted-foreground">
                      Format
                    </span>
                    <span className="text-sm font-medium text-foreground">
                      5v5
                    </span>
                  </div>
                  <div className="flex items-center justify-between border-b border-border pb-3">
                    <span className="text-xs text-muted-foreground">
                      Bet / Player
                    </span>
                    <span className="font-mono text-sm font-medium text-foreground">
                      ${betAmount[0]}
                    </span>
                  </div>
                  <div className="flex items-center justify-between border-b border-border pb-3">
                    <span className="text-xs text-muted-foreground">
                      Total Pool
                    </span>
                    <span className="font-mono text-sm font-medium text-foreground">
                      ${betAmount[0] * 10}
                    </span>
                  </div>
                  <div className="flex items-center justify-between border-b border-border pb-3">
                    <span className="text-xs text-muted-foreground">
                      Platform Fee
                    </span>
                    <span className="font-mono text-sm text-muted-foreground">
                      10%
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium text-foreground">
                      Potential Winnings
                    </span>
                    <span className="font-mono text-lg font-bold text-primary">
                      ${potentialWinnings.toFixed(2)}
                    </span>
                  </div>
                </div>
                <p className="mt-4 text-[10px] text-muted-foreground leading-relaxed">
                  Winnings are split equally among the winning team. Funds are
                  held in secure escrow until match completion.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
