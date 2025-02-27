import { Request, Response, Router } from 'express'
import { sendTelegramMessage } from '../bot'
import type { GithubWebhookPayload } from '../types/webhook.types'
import { formatMessageObject } from '../utils/formatMessageObject'

const router = Router()

router.post('/github', async (req: Request, res: Response): Promise<void> => {
  try {
    const payload: GithubWebhookPayload = req.body
      console.log('Received Github Webhook:', payload)

      const {
        status,
        repository,
        workflow,
        commit_url,
        failed_step,
        message
      } = payload
      if (!repository || !workflow || !commit_url) { 
        const warningTelegramMessage =
          '❌ Invalid payload: Missing required fields'
        console.warn(warningTelegramMessage)

        await sendTelegramMessage(warningTelegramMessage)
        res.status(400).json({ error: warningTelegramMessage })
        
        return
      }

      const defaultMessage = {
        '📁 Repository': repository,
        '⚙️ Workflow': workflow,
        '🔗 Commit': `[View commit] ${commit_url}`,
        ...(failed_step && {'❌ Failed Step': failed_step}),
        '💬 Message': message || 'unknown'
      }

      let telegramMessage = ''
      switch (status) {
        case 'success':
          telegramMessage = `
            ..................
            🟢 Build Success! 🎉
            ..................
            ${formatMessageObject(defaultMessage)}
          `
          break
        case 'failure':
          telegramMessage = `
            ..................
            🔴 Build Failed! 🔥
            ..................
            ${formatMessageObject(defaultMessage)}
          `
          break
        default:
          telegramMessage = `
            ...........................
            ⚠️ Undefined Status Received
            ...........................
            ${formatMessageObject(defaultMessage)}
          `
          break
      }

      await sendTelegramMessage(telegramMessage)

      res.status(200).json({message: 'Webhook processed'})
  } catch (error) {
      res.status(500).json({error: 'Internal Server Error'})
  }
})

export default router