import { createEnv } from "@t3-oss/env-nextjs"
import { config } from "dotenv"
import { expand } from "dotenv-expand"
import { z, ZodError } from "zod"

expand(config())

export const env = createEnv({
  server: {
    NODE_ENV: z.enum(["development", "production"]),
    RESEND_API_KEY: z.string(),
  },
  onValidationError: (error: ZodError) => {
    console.error(
      "❌ Invalid environment variables:",
      error.flatten().fieldErrors
    )
    process.exit(1)
  },
  emptyStringAsUndefined: true,
  experimental__runtimeEnv: process.env,
})
