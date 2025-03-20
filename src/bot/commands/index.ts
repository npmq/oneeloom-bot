import type { Bot } from 'grammy'
import { botCommands } from './config'
import { setupHelpCommand } from './help'
import { setupInfoCommand } from './info'
import { setupStartCommand } from './start'
import { setCommands } from './utils'

/**
 * Инициализирует команды бота.
 */
export const setupCommands = (botClient: Bot) => {
  setupStartCommand(botClient)
  setupHelpCommand(botClient)
  setupInfoCommand(botClient)

  setCommands(botClient, botCommands)
}