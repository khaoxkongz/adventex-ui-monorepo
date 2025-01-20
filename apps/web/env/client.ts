import { createEnv } from "@t3-oss/env-nextjs"
import { config } from "dotenv"
import { expand } from "dotenv-expand"
import { z } from "zod"

expand(config())

export const env = createEnv({
  client: {
    NEXT_PUBLIC_NODE_ENV: z.enum(["development", "production"]),
    NEXT_PUBLIC_RESEND_API_KEY: z.string(),
  },
  runtimeEnv: {
    NEXT_PUBLIC_NODE_ENV: process.env.NODE_ENV,
    NEXT_PUBLIC_RESEND_API_KEY: process.env.RESEND_API_KEY,
  },
})
