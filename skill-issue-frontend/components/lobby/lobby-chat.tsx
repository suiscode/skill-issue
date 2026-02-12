"use client"

import { useState } from "react"
import { Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"

const messages = [
  { user: "ProXenon", message: "GG boys, let's get this W", time: "2:34 PM" },
  { user: "NightOwl", message: "Ready when you are", time: "2:35 PM" },
  {
    user: "System",
    message: "ShadowX has joined Team A",
    time: "2:36 PM",
    isSystem: true,
  },
  { user: "VoidWalker", message: "First time on this map", time: "2:36 PM" },
  {
    user: "ProXenon",
    message: "No worries, we got this. Focus mid.",
    time: "2:37 PM",
  },
]

export function LobbyChat() {
  const [input, setInput] = useState("")

  return (
    <div className="flex flex-col rounded-xl border border-border bg-card">
      <div className="border-b border-border px-5 py-4">
        <h3 className="text-sm font-semibold text-foreground">Match Chat</h3>
      </div>
      <ScrollArea className="flex-1 px-5 py-3" style={{ height: "280px" }}>
        <div className="flex flex-col gap-3">
          {messages.map((msg, i) =>
            msg.isSystem ? (
              <div
                key={`msg-${i}`}
                className="text-center text-xs text-muted-foreground"
              >
                {msg.message}
              </div>
            ) : (
              <div key={`msg-${i}`} className="flex flex-col gap-0.5">
                <div className="flex items-center gap-2">
                  <span
                    className={`text-xs font-medium ${
                      msg.user === "ProXenon"
                        ? "text-primary"
                        : "text-foreground"
                    }`}
                  >
                    {msg.user}
                  </span>
                  <span className="text-[10px] text-muted-foreground">
                    {msg.time}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">{msg.message}</p>
              </div>
            ),
          )}
        </div>
      </ScrollArea>
      <div className="flex gap-2 border-t border-border px-4 py-3">
        <Input
          placeholder="Type a message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="border-border bg-secondary text-foreground placeholder:text-muted-foreground"
        />
        <Button
          size="icon"
          className="shrink-0 bg-primary text-primary-foreground hover:bg-primary/90"
        >
          <Send className="h-4 w-4" />
          <span className="sr-only">Send message</span>
        </Button>
      </div>
    </div>
  )
}
