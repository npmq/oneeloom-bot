import { z } from 'zod'
import { GithubWebhookPayload } from '../../../types/webhook.types'

export const githubPayloadSchema = z.object({
  repository: z.string().min(1),
  workflow: z.string().min(1),
  commit_url: z.string().url(),
  timestamp: z.string().optional(),
  failed_step: z.string().optional(),
  message: z.string().optional(),
  branch: z.string().optional(),
  status: z.enum(['success', 'failure'])
})

export const validateGithubPayload = (payload: unknown): GithubWebhookPayload => {
  return githubPayloadSchema.parse(payload)
}