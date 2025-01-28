import "@workspace/ui/globals.css"

import { Metadata, Viewport } from "next"

import { cn } from "@workspace/ui/lib/utils"

import { META_THEME_COLORS, siteConfig } from "@/config/site"
import { fontMono, fontSans } from "@/lib/fonts"
import { Providers } from "@/components/providers"
import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  metadataBase: new URL(siteConfig.url),
  description: siteConfig.description,
  keywords: [
    "บริษัท แอดเวนเท็กซ์ อินเตอร์เนชั่นแนล กรุ๊ป จำกัด",
    "บริษัท แอดเวนเท็กซ์ อินเตอร์เนชั่นแนล",
    "บริษัท แอดเวนเท็กซ์",
    "adventex",
    "adventex education",
    "Adventex",
    "Adventex Education",
  ],
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  manifest: `${siteConfig.url}/site.webmanifest`,
}

export const viewport: Viewport = {
  themeColor: META_THEME_COLORS.light,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                if (localStorage.theme === 'light' || ((!('theme' in localStorage) || localStorage.theme === 'system') && window.matchMedia('(prefers-color-scheme: light)').matches)) {
                  document.querySelector('meta[name="theme-color"]').setAttribute('content', '${META_THEME_COLORS.light}')
                }
              } catch (_) {}
            `,
          }}
        />
      </head>
      <body className={cn("bg-background min-h-screen font-sans antialiased", fontSans.variable, fontMono.variable)}>
        <Providers>
          <div vaul-drawer-wrapper="">
            <div className="bg-background relative flex min-h-screen flex-col">
              <div data-wrapper="" className="border-grid flex flex-1 flex-col">
                <SiteHeader />
                <main className="flex flex-1 flex-col">{children}</main>
                <SiteFooter />
              </div>
            </div>
          </div>
        </Providers>
      </body>
    </html>
  )
}
