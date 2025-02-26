import dotenv from 'dotenv'

dotenv.config()

export const BOT_API_TOKEN: string = process.env.BOT_API_TOKEN ?? ''
export const BOT_CHAT_ID: string = process.env.BOT_CHAT_ID ?? ''
export const BOT_CONFIG = {
  BOT_API_TOKEN,
  BOT_CHAT_ID
}

export const SERVER_PORT: string = process.env.SERVER_PORT ?? '8000'

