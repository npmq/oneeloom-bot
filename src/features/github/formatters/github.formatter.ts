import { GithubWebhookPayload } from '../../../types/webhook.types'

export const formatGithubMessage = (payload: GithubWebhookPayload): string => {
  const {
    status,
    repository,
    workflow,
    timestamp,
    commit_url,
    failed_step,
    message,
    branch
  } = payload;

  const defaultMessage = [
    `*Repository*: _${repository}_`,
    `*Branch*: _${branch ?? 'unknown'}_`,
    `*Workflow*: _${workflow}_`,
    `*Event Time*: _${timestamp ?? 'unknown'}_`,
    `*Commit*: [View commit](${commit_url})`,
    ...(failed_step ? [`*Failed Step*: _${failed_step}_`] : []),
    `*Message*: _${message ?? 'unknown'}_\n`,
  ]

  let telegramMessage = [];

  switch (status) {
    case 'success':
      telegramMessage = [
        '✅ *Build Success!*',
        `${'✦✧'.repeat(10)}\n`,
        ...defaultMessage,
        `${'✦✧'.repeat(10)}`,
        'All tests passed! Your code is ready for action. 🚀'
      ]
      break;
    case 'failure':
      telegramMessage = [
        '🔥 *Build Failed!*',
        `${'• '.repeat(20)}\n`,
        ...defaultMessage,
        `${'• '.repeat(20)}`,
        'The build process encountered an error.',
        'Check the logs for details and fix the issues! 🛠️'
      ]
      break;
    default:
      telegramMessage = [
        '⚠️ *Undefined Status*',
        `${'• '.repeat(20)}\n`,
        ...defaultMessage,
        `${'• '.repeat(20)}`,
        '*Attention!* The build status is undefined.',
        'Check the logs for details and resolve the issue! 🔍'
      ]
      break;
  }

  return telegramMessage.join('\n')
}