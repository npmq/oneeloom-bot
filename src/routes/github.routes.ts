import { Router } from 'express'
import { githubWebhookController } from '../features/github/controllers/webhook.controller'

const router = Router()

router.post('/github', githubWebhookController)

export default router