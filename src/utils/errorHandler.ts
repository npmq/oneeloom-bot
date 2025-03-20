import { GrammyError, HttpError } from 'grammy'

/**
 * Централизованная обработка ошибок Telegram.
 * @param error - ошибка, которая произошла.
 * @param contextMessage - дополнительное сообщение или контекст, в котором произошла ошибка.
 */
export const handleTelegramError = (error: unknown, contextMessage?: string): void => {
  if (error instanceof GrammyError) {
    console.error(`❌ [GrammyError] ${contextMessage ?? ''}:`, error.description)
  } else if (error instanceof HttpError) {
    console.error(`❌ [HttpError] ${contextMessage ?? ''}:`, error)
  } else if (error instanceof Error) {
    console.error(`❌ [Error] ${contextMessage ?? ''}:`, error.message);
  } else {
    console.error(`❌ [Unknown Error] ${contextMessage ?? ''}:`, error)
  }
}