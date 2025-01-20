import { Geist_Mono, Prompt } from "next/font/google"

export const fontSans = Prompt({
  weight: ["400", "500", "600", "700", "800", "900"],
  subsets: ["latin", "thai"],
  variable: "--font-sans",
})

export const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})
