"use client"

import { Bell, Search } from "lucide-react"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

export function TopNavbar({ title }: { title: string }) {
  return (
    <header className="flex h-14 items-center justify-between border-b border-border px-4 lg:px-6">
      <div className="flex items-center gap-3">
        <SidebarTrigger className="text-muted-foreground hover:text-foreground" />
        <h1 className="text-lg font-semibold text-foreground">{title}</h1>
      </div>
      <div className="flex items-center gap-4">
        <button
          type="button"
          className="text-muted-foreground hover:text-foreground transition-colors"
        >
          <Search className="h-4 w-4" />
          <span className="sr-only">Search</span>
        </button>
        <button
          type="button"
          className="relative text-muted-foreground hover:text-foreground transition-colors"
        >
          <Bell className="h-4 w-4" />
          <span className="sr-only">Notifications</span>
          <span className="absolute -right-1 -top-1 flex h-3 w-3 items-center justify-center rounded-full bg-primary text-[8px] font-bold text-primary-foreground">
            3
          </span>
        </button>
        <div className="flex items-center gap-2">
          <Badge
            variant="outline"
            className="border-primary/30 bg-primary/10 text-primary font-mono text-xs"
          >
            $247.50
          </Badge>
          <Avatar className="h-7 w-7 border border-border">
            <AvatarImage src="https://api.dicebear.com/7.x/thumbs/svg?seed=arena" />
            <AvatarFallback className="bg-secondary text-secondary-foreground text-xs">
              PX
            </AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  )
}
