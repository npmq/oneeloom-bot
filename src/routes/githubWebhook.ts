import { Request, Response, Router } from 'express'
import { bot } from '../bot'
import { envConfig } from '../config'
import type { GithubWebhookPayload } from '../types/webhook.types'
import { sendTelegramMessage } from '../utils/sendMessage'

const router = Router();

router.post('/github', async (req: Request, res: Response): Promise<void> => {
  try {
    const payload: GithubWebhookPayload = req.body;
    console.log('Payload', payload)
    
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

    if (!repository || !workflow || !commit_url) {
      const warningTelegramMessage =
        '❌ *Invalid payload*: Missing required fields';
      console.warn(warningTelegramMessage);
      await sendTelegramMessage(
        bot,
        envConfig.BOT_CHAT_ID,
        warningTelegramMessage
      );
      res.status(400).json({ error: warningTelegramMessage });
      return;
    }

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

    await sendTelegramMessage(
      bot,
      envConfig.BOT_CHAT_ID,
      telegramMessage.join('\n')
    );

    res.status(200).json({
      status: 'Success',
      message: 'Webhook processed successfully'
    });
  } catch (error) {
    console.error('❌ Error processing webhook:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

export default router;