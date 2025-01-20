import type { Config } from "tailwindcss"
import { fontFamily } from "tailwindcss/defaultTheme"

import sharedConfig from "@workspace/ui/tailwind.config"

const config = {
  content: [
    "app/**/*.{ts,tsx}",
    "components/**/*.{ts,tsx}",
    "../../packages/ui/src/components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)", ...fontFamily.sans],
        mono: ["var(--font-mono)", ...fontFamily.mono],
      },
    },
  },
  presets: [sharedConfig],
} satisfies Config

export default config
