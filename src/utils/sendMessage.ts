import type { Bot } from 'grammy'
import { handleTelegramError } from './errorHandler'

/**
 * Отправляет сообщение в Telegram.
 * @param botClient - экземпляр бота.
 * @param chatId - ID чата (в виде числа).
 * @param message - текст сообщения.
 */
export const sendTelegramMessage = async (
  botClient: Bot,
  chatId: number,
  message: string
): Promise<void> => {
  if (!message) {
    console.error('❌ Error! No message provided')
    return
  }

  try {
    await botClient.api.sendMessage(
      chatId,
      message,
      { parse_mode: 'Markdown' }
    )
    console.log('✅ Message sent to Telegram')
  } catch (error) {
    handleTelegramError(error, 'Error sending Telegram message')
  }
}