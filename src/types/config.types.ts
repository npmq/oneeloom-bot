import { z } from 'zod'
import { envSchema } from '../config/schema'

/**
 * Тип для конфигурации окружения.
 */
export type EnvConfig = z.infer<typeof envSchema>

/**
 * Тип команды бота.
 */
type BotCommands = 'start' | 'help' | 'info'

/**
 * Интерфейс, описывающий команду бота.
 */
export interface TelegramBotCommand {
  command: BotCommands
  description: string
}