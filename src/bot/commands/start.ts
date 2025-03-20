import { createCommand } from './utils'

/**
 * Сообщение для команды /start.
 */
const message: string = 'Hello 👋. Bot is working. Use /help to see available commands.' 

/**
 * Регистрирует команду /start в боте.
 */
export const setupStartCommand = createCommand('start', async (ctx) => {
  await ctx.reply(message)
})

