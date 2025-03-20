import { Request, Response } from 'express'
import { bot } from '../../../bot'
import { envConfig } from '../../../config'
import { sendTelegramMessage } from '../../../utils/sendMessage'
import { processGithubPayload } from '../services/github.service'

export const githubWebhookController = async (req: Request, res: Response): Promise<void> => {
  try {
    const telegramMessage = processGithubPayload(req.body)

    await sendTelegramMessage(bot, envConfig.BOT_CHAT_ID, telegramMessage)

    res.status(200).json({
      status: 'Success',
      message: 'Webhook processed successfully'
    })
  } catch (error) {
    console.error('❌ Error processing webhook:', error)
    
    res.status(500).json({ error: 'Internal Server Error' })
  }
}