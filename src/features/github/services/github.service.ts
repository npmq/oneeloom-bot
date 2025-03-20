import { formatGithubMessage } from '../formatters/github.formatter'
import { validateGithubPayload } from '../validators/github.validator'

/**
 * Обрабатывает raw payload, проходит валидацию его и возвращает
 * готовое для отправки в Telegram сообщение.
 * @param payload Raw данные от GitHub webhook
 * @returns Готовое сообщение для Telegram
 */
export const processGithubPayload = (payload: unknown): string => {
  const validatePayload = validateGithubPayload(payload)
  const telegramMessage = formatGithubMessage(validatePayload)
  
  return telegramMessage
}