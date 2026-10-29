import { test } from 'node:test'
import assert from 'node:assert/strict'
import { once } from 'node:events'
import jwt from 'jsonwebtoken'
import { createApp } from './app.js'

test('Login y acceso protegido JWT', async (t) => {
  const secret = 'test-secret-with-at-least-32-characters'
  const server = createApp(secret).listen(0, '127.0.0.1')
  await once(server, 'listening')
  t.after(() => new Promise((resolve) => server.close(resolve)))
  const base = `http://127.0.0.1:${server.address().port}/api`
  const login = (body) => fetch(`${base}/login`, {
    method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body),
  })
  const profile = (token) => fetch(`${base}/perfil`, { headers: token ? { Authorization: `Bearer ${token}` } : {} })

  assert.equal((await login({})).status, 400)
  assert.equal((await login({ email: 'admin@dgt.es', password: 'incorrecta' })).status, 401)
  const response = await login({ email: 'admin@dgt.es', password: '1234' })
  assert.equal(response.status, 200)
  const { token } = await response.json()
  const claims = jwt.verify(token, secret, { algorithms: ['HS256'] })
  assert.equal(claims.exp - claims.iat, 3600)
  const allowed = await profile(token)
  assert.equal(allowed.status, 200)
  assert.deepEqual(await allowed.json(), { email: 'admin@dgt.es', role: 'admin', expiresAt: claims.exp * 1000 })
  assert.equal((await profile()).status, 403)
  assert.equal((await profile('invalido')).status, 401)
  assert.equal((await profile(jwt.sign({ email: 'admin@dgt.es', role: 'admin' }, 'otra-clave', { expiresIn: '1h' }))).status, 401)
  assert.equal((await profile(jwt.sign({ email: 'admin@dgt.es', role: 'admin' }, secret, { expiresIn: -1 }))).status, 401)
  assert.equal((await fetch(`${base}/perfil`, { headers: { Authorization: 'Basic abc' } })).status, 401)
  const invalidJson = await fetch(`${base}/login`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: '{' })
  assert.equal(invalidJson.status, 400)
  assert.ok((await invalidJson.json()).error)
})
