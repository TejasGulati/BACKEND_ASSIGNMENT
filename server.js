import payload from 'payload'
import express from 'express'
import dotenv from 'dotenv'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3000

app.use(express.json())

const start = async () => {
  await payload.init({
    secret: process.env.PAYLOAD_SECRET,
    express: app,
  })

  app.listen(PORT, () => {
    console.log(`Payload is running on http://localhost:${PORT}`)
  })
}

start()
