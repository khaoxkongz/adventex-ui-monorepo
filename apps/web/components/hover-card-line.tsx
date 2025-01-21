import Link from "next/link"

import { Button } from "@workspace/ui/components/button"
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@workspace/ui/components/hover-card"

import { siteConfig } from "@/config/site"
import { Icons } from "@/components/icons"

export function HoverCardLine() {
  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <Button variant="outline" className="size-8 w-full rounded-lg px-0">
          <Link
            href={siteConfig.links.line}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2"
          >
            <Icons.line className="size-4" />
            <span className="text-muted-foreground text-xs">ติดต่อเรา</span>
          </Link>
        </Button>
      </HoverCardTrigger>
      <HoverCardContent className="w-[340px]">
        <div className="flex items-start gap-3">
          <Icons.logo className="h-10 w-10 shrink-0 rounded-full" />
          <div className="space-y-1">
            <p className="text-sm font-medium">@Adventex</p>
            <p className="text-muted-foreground text-sm">
              Beautiful UI components built with Tailwind CSS and Next.js.
            </p>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  )
}
