import { Bot } from 'grammy'
import { BOT_CONFIG } from '../config'

const { BOT_API_TOKEN, BOT_CHAT_ID } = BOT_CONFIG

if (!BOT_API_TOKEN || !BOT_CHAT_ID) {
  console.error(
    '❌ Error! BOT_API_TOKEN and BOT_CHAT_ID most be required in .env'
  )

  process.exit(1)
}

export const bot = new Bot(BOT_API_TOKEN)

export const sendTelegramMessage = async (message: string): Promise<void> => {
  if (!message) {
    console.error('❌ Error! No message provided')
    return
  }

  try {
    await bot.api.sendMessage(
      BOT_CHAT_ID,
      message,
      { parse_mode: 'Markdown' }
    )
    console.log('✅ Message sent to Telegram')
  } catch (error) {
    console.error('❌ Error! Message not sent to Telegram', error)
  }
}

// bot.command('start', (ctx) => {
//   ctx.reply('hello 👋. I will keep you updated on the build status in GitHub Actions and Docker Hub.')
// })

// export const sendNotification = (message: string): void => {
//   bot.api.sendMessage(BOT_CHAT_ID, message)
// }

// bot.start()