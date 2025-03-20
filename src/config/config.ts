import { config } from 'dotenv'
import { EnvConfig } from '../types/config.types'
import { envSchema } from './schema'

config()

const env = envSchema.safeParse(process.env)

if (!env.success) {
  console.error('❌ Error validating environment variables:', env.error.format())

  process.exit(1)
}

export const envConfig: EnvConfig = env.data