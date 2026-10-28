const express = require('express')
const mongoose = require('mongoose')

const fields = ['matricula', 'marca', 'modelo', 'color', 'seguroEnVigor', 'fechaUltimaITV']

function validateVehicle(body) {
  if (!body || typeof body !== 'object' || Array.isArray(body)) return 'Envía un vehículo válido.'
  for (const field of ['matricula', 'marca', 'modelo', 'color']) {
    if (typeof body[field] !== 'string' || !body[field].trim() || body[field].length > 100) return `El campo ${field} es obligatorio (máximo 100 caracteres).`
  }
  if (typeof body.seguroEnVigor !== 'boolean') return 'seguroEnVigor debe ser true o false.'
  const date = body.fechaUltimaITV
  if (typeof date !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(date)) return 'La fecha de última ITV debe tener formato AAAA-MM-DD.'
  const parsed = new Date(date + 'T00:00:00Z')
  if (Number.isNaN(parsed.getTime()) || parsed.toISOString().slice(0, 10) !== date) return 'La fecha de última ITV no es válida.'
  return null
}

function createApp(Vehiculo) {
  const app = express()
  app.disable('x-powered-by')
  app.use(express.json({ limit: '32kb' }))

  app.param('id', (req, res, next, id) => {
    if (!/^[a-fA-F0-9]{24}$/.test(id)) return res.status(400).json({ error: 'Identificador de vehículo no válido.' })
    next()
  })

  app.get('/api/vehiculos', async (_req, res) => {
    const vehicles = await Vehiculo.find().sort({ matricula: 1 }).lean()
    res.json(vehicles)
  })

  app.get('/api/vehiculos/:id', async (req, res) => {
    const vehicle = await Vehiculo.findById(req.params.id).lean()
    if (!vehicle) return res.status(404).json({ error: 'Vehículo no encontrado.' })
    res.json(vehicle)
  })

  const validate = (req, res, next) => {
    const error = validateVehicle(req.body)
    if (error) return res.status(400).json({ error })
    req.vehicleData = Object.fromEntries(fields.map(field => [field,
      typeof req.body[field] === 'string' ? req.body[field].trim() : req.body[field],
    ]))
    req.vehicleData.matricula = req.vehicleData.matricula.toUpperCase()
    next()
  }

  app.post('/api/vehiculos', validate, async (req, res) => {
    const vehicle = await Vehiculo.create(req.vehicleData)
    res.status(201).json(vehicle)
  })

  app.put('/api/vehiculos/:id', validate, async (req, res) => {
    const vehicle = await Vehiculo.findByIdAndUpdate(
      req.params.id, { $set: req.vehicleData }, { new: true, runValidators: true },
    ).lean()
    if (!vehicle) return res.status(404).json({ error: 'Vehículo no encontrado.' })
    res.json(vehicle)
  })

  app.delete('/api/vehiculos/:id', async (req, res) => {
    const vehicle = await Vehiculo.findByIdAndDelete(req.params.id)
    if (!vehicle) return res.status(404).json({ error: 'Vehículo no encontrado.' })
    res.status(204).end()
  })

  app.use((_req, res) => res.status(404).json({ error: 'Ruta no encontrada.' }))
  app.use((error, _req, res, _next) => {
    if (error instanceof SyntaxError && error.status === 400) return res.status(400).json({ error: 'JSON no válido.' })
    if (error.type === 'entity.too.large') return res.status(413).json({ error: 'Petición demasiado grande.' })
    if (error instanceof mongoose.Error.ValidationError) return res.status(400).json({ error: 'Datos de vehículo no válidos.' })
    if (error.code === 11000) return res.status(409).json({ error: 'Ya existe un vehículo con esa matrícula.' })
    res.status(500).json({ error: 'No se pudo completar la operación con MongoDB.' })
  })
  return app
}

module.exports = { createApp, validateVehicle }
