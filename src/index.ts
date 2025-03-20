import express from 'express'
import { envConfig } from './config'
import github from './routes/github.routes'

const app = express()

app.use(express.json())

app.use('/webhook', github)

app.get('/', (req, res) => {
  res.send('Bot is up and running 🚀')
})

app.listen(envConfig.PORT, () => {
  console.log(`${'· '.repeat(22)}`)
  console.log(`🟢 Server Started at http://localhost:${envConfig.PORT}`);
  console.log(`${'· '.repeat(22)}`)
})