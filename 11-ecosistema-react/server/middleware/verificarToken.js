import jwt from 'jsonwebtoken'

export function verificarToken(secret) {
  return (req, res, next) => {
    const authorization = req.headers.authorization
    if (!authorization) return res.status(403).json({ error: 'Token requerido' })

    const match = /^Bearer ([^\s]+)$/i.exec(authorization)
    if (!match) return res.status(401).json({ error: 'Usa Authorization: Bearer TOKEN' })

    try {
      const decoded = jwt.verify(match[1], secret, { algorithms: ['HS256'] })
      if (typeof decoded !== 'object' || typeof decoded.email !== 'string' || decoded.role !== 'admin' || typeof decoded.exp !== 'number') {
        return res.status(401).json({ error: 'Token inválido' })
      }
      req.user = decoded
      next()
    } catch {
      res.status(401).json({ error: 'Token inválido o expirado' })
    }
  }
}
