import type { Bot, Context } from 'grammy'
import { TelegramBotCommand } from '../../types/config.types'
import { handleTelegramError } from '../../utils/errorHandler'

/**
 * Создаёт обработчик команды.
 * @param command - Название команды.
 * @param handler - Обработчик команды.
 */
export const createCommand = (
  command: string,
  handler: (ctx: Context) => Promise<void>
) => {
  return (botClient: Bot) => {
    botClient.command(command, handler)
  }
}

/**
 * Устанавливает команды бота.
 * @param {Bot} botClient - Экземпляр бота.
 * @param {TelegramBotCommand[]} commands - Список команд.
 * @throws {Error} Если не удалось установить команды.
 */
export const setCommands = async (
  botClient: Bot,
  commands: TelegramBotCommand[]
): Promise<void> => {
  try {
    await botClient.api.setMyCommands(commands)

    console.log('✅ Bot commands set successful');
  } catch (error) {
    handleTelegramError(error, 'Error setting bot commands')
    throw new Error('Failed to set bot commands')
  }
}

