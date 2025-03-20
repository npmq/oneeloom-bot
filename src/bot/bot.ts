import { Bot } from 'grammy'
import { envConfig } from '../config'
import { handleTelegramError } from '../utils/errorHandler'
import { sendTelegramMessage } from '../utils/sendMessage'
import { setupCommands } from './commands'

/**
 * Экземпляр бота, инициализированный с использованием токена из конфигурации.
 */
export const bot = new Bot(envConfig.BOT_API_TOKEN)

/**
 * Инициализация и регистрация команд бота.
 * Команды настраиваются в модуле `commands`.
 */
setupCommands(bot)

/**
 * Отправка тестового сообщения при запуске бота.
 * Это подтверждает, что бот успешно запущен и может отправлять сообщения.
 */
sendTelegramMessage(
  bot,
  envConfig.BOT_CHAT_ID,
  'Bot is running! Sending & receiving messages works 📨.'
)

/**
 * Глобальный обработчик ошибок бота.
 * Ловит все ошибки, возникающие в процессе работы бота,
 * и передаёт их в функцию `handleTelegramError` для логирования и обработки.
 */
bot.catch((error) => {
  handleTelegramError(error, 'Bot error')
})

/**
 * Функция для запуска бота с обработкой ошибок.
 */
const startBot = async () => {
  try {
    await bot.start()
    console.log('🤖 Bot started.')
  } catch (error) {
    handleTelegramError(error, 'Error starting bot')
    process.exit(1)
 }
}

// Запуск бота
startBot()