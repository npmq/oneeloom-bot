export interface GithubWebhookPayload {
  repository: string
  workflow: string
  commit_url: string
  timestamp?: string,
  failed_step?: string
  message?: string
  branch?: string
  status: 'success' | 'failure',
  
 
  
  
  
  
  
}