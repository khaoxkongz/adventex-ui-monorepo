"use client"

import * as React from "react"
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/next"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import { NuqsAdapter } from "nuqs/adapters/next/app"

import { Toaster } from "@workspace/ui/components/sonner"

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
      enableColorScheme
    >
      <NuqsAdapter>{children}</NuqsAdapter>
      <Toaster richColors />
      <Analytics />
      <SpeedInsights />
    </NextThemesProvider>
  )
}
