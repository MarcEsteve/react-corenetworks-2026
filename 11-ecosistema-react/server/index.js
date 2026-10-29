import 'dotenv/config'
import { createApp } from './app.js'

const app = createApp(process.env.JWT_SECRET)
const port = Number(process.env.PORT || 4000)
app.listen(port, '127.0.0.1', () => {
  console.log(`API JWT disponible en http://localhost:${port}`)
})
