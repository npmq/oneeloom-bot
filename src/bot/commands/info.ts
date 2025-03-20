import { createCommand } from './utils'

/**
 * Данные для команды /info.
 */
const lastBuildStatus = 'Success'
const githubRepo = 'https://github.com/your-repo'
const dockerHubRepo = 'https://hub.docker.com/r/your-docker-image'
const githubActionsWorkflow = `${githubRepo}/actions`

/**
 * Сообщение для команды /info.
 */
const message = [
  `🚀 *Production Environment*:
    _- The bot is built and deployed in a production environment.
    - GitHub Actions is used for CI/CD to automate the build and deployment process.
    - Last build status:_ *${lastBuildStatus}*
    `,
    `🐳 *Docker Image*:
    _- The bot is containerized using Docker.
    - The Docker image is automatically built and pushed to Docker Hub._
    `,
    `🔗 *Links*:
    - [GitHub Repository](${githubRepo})
    - [Docker Hub](${dockerHubRepo})
    - [GitHub Actions Workflow](${githubActionsWorkflow})
  `
]

/**
 * Регистрирует команду /info в боте.
 */
export const setupInfoCommand = createCommand('info', async (ctx) => {
  await ctx.reply(message.join('\n'), { parse_mode: 'Markdown' })
})
