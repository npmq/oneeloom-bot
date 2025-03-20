import { createCommand } from './utils'

/**
 * Сообщение со списком доступных команд.
 */
const message = [
  `*Available commands:*`,
  `/start - Start the bot`,
  `/help - Show this help message`,
  `/info - Get bot info`
]

/**
 * Регистрирует команду /help в боте.
 */
export const  setupHelpCommand = createCommand('help', async (ctx) => {
  await ctx.reply(message.join('\n'), {parse_mode: 'Markdown'})
})
