export interface GithubRepository {
  full_name: string
}

export interface GithubWorkflowRun {
  status: string
  name: string
  html_url: string
  conclusion?: string

}

export interface GithubWebhookPayload {
  status: 'success' | 'failure',
  repository: string
  workflow: string
  commit_url: string
  message: string
  failed_step?: string
}