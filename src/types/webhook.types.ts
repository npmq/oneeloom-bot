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
  workflow_run?: GithubWorkflowRun
  repository?: GithubRepository
}