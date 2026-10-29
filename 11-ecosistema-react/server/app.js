import express from 'express'
import jwt from 'jsonwebtoken'
import { verificarToken } from './middleware/verificarToken.js'

export function createApp(secret) {
  if (!secret || secret.length < 32) throw new Error('Configura JWT_SECRET con al menos 32 caracteres en .env')
  const app = express()
  app.disable('x-powered-by')
  app.use(express.json({ limit: '10kb' }))
  app.use('/api', (_req, res, next) => {
    res.set('Cache-Control', 'no-store')
    next()
  })

  app.post('/api/login', (req, res) => {
    const { email, password } = req.body ?? {}
    if (typeof email !== 'string' || typeof password !== 'string' || !email.trim() || !password) {
      return res.status(400).json({ error: 'Email y contraseña son obligatorios' })
    }
    // Credenciales de demostración, sin base de datos.
    if (email.trim() !== 'admin@dgt.es' || password !== '1234') {
      return res.status(401).json({ error: 'Credenciales inválidas' })
    }
    const token = jwt.sign({ email: 'admin@dgt.es', role: 'admin' }, secret, { algorithm: 'HS256', expiresIn: '1h' })
    res.json({ token })
  })

  app.get('/api/perfil', verificarToken(secret), (req, res) => {
    res.json({ email: req.user.email, role: req.user.role, expiresAt: req.user.exp * 1000 })
  })

  app.use('/api', (_req, res) => res.status(404).json({ error: 'Ruta no encontrada' }))
  // Express necesita los cuatro argumentos para reconocer un middleware de errores.
  // eslint-disable-next-line no-unused-vars
  app.use((error, _req, res, _next) => {
    const status = error.status === 400 || error.status === 413 ? error.status : 500
    res.status(status).json({ error: status === 500 ? 'Error interno del servidor' : 'Cuerpo JSON inválido o demasiado grande' })
  })
  return app
}
