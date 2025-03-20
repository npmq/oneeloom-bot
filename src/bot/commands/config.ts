import type { TelegramBotCommand } from '../../types/config.types'

/**
 * Список команд бота.
 * Каждая команда содержит название и описание.
 */
export const botCommands: TelegramBotCommand[] = [
  { command: 'start', description: 'Start the bot' },
  { command: 'help', description: 'Show help message' },
  { command: 'info', description: 'Get bot info' }
]