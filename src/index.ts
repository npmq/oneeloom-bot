import express from 'express'
import { SERVER_PORT } from './config'
import githubRouter from './routes/githubWebhook'

const app = express()

app.use(express.json())

app.use('/webhook', githubRouter)

app.get('/', (req, res) => {
  res.send('🟢 Bot is up and running')
})

app.listen(SERVER_PORT, () => {
  console.log(`🔌 Server Started at PORT:${SERVER_PORT}`)
})