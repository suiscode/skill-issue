import Link from "next/link"
import { ArrowDownLeft, ArrowUpRight, Wallet } from "lucide-react"
import { Button } from "@/components/ui/button"

export function WalletCard() {
  return (
    <div className="relative overflow-hidden rounded-xl border border-primary/20 bg-card p-6 glow-sm">
      <div className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-primary/5 blur-2xl" />
      <div className="flex items-center gap-2 text-muted-foreground">
        <Wallet className="h-4 w-4" />
        <span className="text-sm">Wallet</span>
      </div>
      <div className="mt-2 font-mono text-3xl font-bold text-foreground">
        Coming Soon
      </div>
      <div className="mt-1 text-xs text-muted-foreground">
        Deposit, escrow and payout modules are in active development.
      </div>
      <div className="mt-5 flex gap-3">
        <Button
          asChild
          size="sm"
          variant="outline"
          className="border-border bg-transparent text-foreground hover:bg-accent"
        >
          <Link href="/wallet">
            <ArrowDownLeft className="mr-1 h-3.5 w-3.5" />
            Roadmap
          </Link>
        </Button>
        <Button
          asChild
          variant="outline"
          size="sm"
          className="border-border bg-transparent text-foreground hover:bg-accent"
        >
          <Link href="/wallet">
            <ArrowUpRight className="mr-1 h-3.5 w-3.5" />
            Feedback
          </Link>
        </Button>
      </div>
    </div>
  )
}
