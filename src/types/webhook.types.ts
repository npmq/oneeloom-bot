export interface GithubWebhookPayload {
  status: 'success' | 'failure',
  repository: string
  branch: string
  timestamp: string,
  workflow: string
  commit_url: string
  message: string
  failed_step?: string
}