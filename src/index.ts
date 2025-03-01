import express from 'express'
import { PORT } from './config'
import githubRouter from './routes/githubWebhook'

const app = express()

app.use(express.json())

app.use('/webhook', githubRouter)

app.get('/', (req, res) => {
  res.send('🚀 Bot is up and running')
})

app.listen(PORT, () => {
  console.log('╔══════════════════════════════════════════════╗');
  console.log('║                                              ║')
  console.log(`║  🟢 Server Started at http://localhost:${PORT}  ║`);
  console.log('║                                              ║')
  console.log('╚══════════════════════════════════════════════╝');
})