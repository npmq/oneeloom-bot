import { Request, Response, Router } from 'express'
import { sendTelegramMessage } from '../bot'
import type { GithubWebhookPayload } from '../types/webhook.types'

const router = Router()

router.post('/github', (req: Request, res: Response) => {
  const payload: GithubWebhookPayload = req.body
  console.log('Received Github Webhook:', payload)

  if (payload.workflow_run && payload.repository) {
    const { status, conclusion, name, html_url } = payload.workflow_run
    const repo = payload.repository?.full_name || 'unknown repository'

    let message = `Github Actions Update for ${repo}:\n` +
                  `Workflow: ${name}\n` +
                  `Status: ${status}`
    
    if (conclusion) {
      message += `\nFinal Status: ${conclusion}`
    }

    message += `\nDetail: ${html_url}`

    sendTelegramMessage(message)
  } else {
    console.warn('The received payload does not match the GitHub Actions event.')
  }

  res.sendStatus(200)
})

export default router