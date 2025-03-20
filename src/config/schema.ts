import { z } from 'zod'

export const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production']).default('development'),
  BOT_API_TOKEN: z.string().min(1, 'BOT_API_TOKEN cannot be empty'),
  BOT_CHAT_ID: z.string().regex(/^\d+$/).transform(Number),
  PORT: z.string().regex(/^\d+$/).transform(Number).default('8000')
})