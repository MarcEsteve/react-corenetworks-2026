const path = require('node:path')
const fs = require('node:fs')
const mongoose = require('mongoose')
const { createApp } = require('./app')
const Vehiculo = require('./models/Vehiculo')

const envPath = path.join(__dirname, '.env')
if (fs.existsSync(envPath)) process.loadEnvFile(envPath)

async function start() {
  if (!process.env.MONGODB_URI) throw new Error('Falta MONGODB_URI en server/.env')
  await mongoose.connect(process.env.MONGODB_URI, {
    dbName: 'dgt_vehiculos',
    serverSelectionTimeoutMS: 10000,
    autoIndex: false,
  })
  const port = Number(process.env.PORT || 4000)
  const server = createApp(Vehiculo).listen(port, () => {
    console.log(`API de vehículos: http://localhost:${port}/api/vehiculos`)
  })
  server.on('error', () => {
    console.error('No se pudo abrir el puerto de Express. Comprueba PORT.')
    mongoose.disconnect().finally(() => process.exit(1))
  })
  for (const signal of ['SIGINT', 'SIGTERM']) {
    process.once(signal, () => server.close(() => {
      mongoose.disconnect().finally(() => process.exit(0))
    }))
  }
}

start().catch(() => {
  console.error('No se pudo iniciar la API. Comprueba MONGODB_URI, las credenciales y el acceso de red de Atlas.')
  process.exit(1)
})
