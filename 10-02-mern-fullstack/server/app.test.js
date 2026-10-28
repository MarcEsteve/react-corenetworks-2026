const { test } = require('node:test')
const assert = require('node:assert/strict')
const { createApp } = require('./app')
const Vehiculo = require('./models/Vehiculo')

test('CRUD REST, validación y errores sin acceder a Atlas', async t => {
  const records = new Map()
  let sequence = 0
  let failRead = false
  const model = {
    find: () => ({ sort: () => ({ lean: async () => {
      if (failRead) throw new Error('Fallo simulado')
      return [...records.values()]
    } }) }),
    findById: id => ({ lean: async () => records.get(id) ?? null }),
    create: async data => {
      const _id = (++sequence).toString(16).padStart(24, '0')
      const record = { ...data, _id }
      records.set(_id, record)
      return record
    },
    findByIdAndUpdate: (id, update) => ({ lean: async () => {
      if (!records.has(id)) return null
      const record = { ...records.get(id), ...update.$set }
      records.set(id, record)
      return record
    } }),
    findByIdAndDelete: async id => {
      const record = records.get(id)
      records.delete(id)
      return record ?? null
    },
  }
  const server = createApp(model).listen(0, '127.0.0.1')
  await new Promise(resolve => server.once('listening', resolve))
  t.after(() => new Promise(resolve => server.close(resolve)))
  const base = 'http://127.0.0.1:' + server.address().port + '/api/vehiculos'
  const request = (path = '', method = 'GET', body) => fetch(base + path, {
    method, headers: { 'Content-Type': 'application/json' },
    body: body === undefined ? undefined : JSON.stringify(body),
  })
  const input = {
    matricula: '1234abc', marca: 'Seat', modelo: 'León', color: 'Gris',
    seguroEnVigor: false, fechaUltimaITV: '2024-06-10',
  }

  assert.equal(await new Vehiculo(input).validate().then(() => true), true)
  assert.deepEqual(await (await request()).json(), [])

  const createdResponse = await request('', 'POST', { ...input, _id: 'ignored', extra: 'ignored' })
  assert.equal(createdResponse.status, 201)
  const created = await createdResponse.json()
  assert.equal(created.matricula, '1234ABC')
  assert.equal(created.seguroEnVigor, false)
  assert.equal(created.extra, undefined)
  assert.match(created._id, /^[a-f0-9]{24}$/)
  assert.equal((await (await request()).json()).length, 1)
  assert.deepEqual(await (await request('/' + created._id)).json(), created)

  const updatedResponse = await request('/' + created._id, 'PUT', { ...input, color: 'Azul', seguroEnVigor: true })
  assert.equal(updatedResponse.status, 200)
  const updated = await updatedResponse.json()
  assert.equal(updated.color, 'Azul')
  assert.equal(updated.seguroEnVigor, true)
  assert.equal(updated._id, created._id)
  assert.equal((await (await request('/' + created._id)).json()).color, 'Azul')

  for (const data of [
    { ...input, marca: ' ' },
    { ...input, seguroEnVigor: 'false' },
    { ...input, fechaUltimaITV: '2024-02-30' },
    { ...input, fechaUltimaITV: 'ayer' },
    { ...input, matricula: { $ne: null } },
  ]) assert.equal((await request('', 'POST', data)).status, 400)
  assert.equal((await request('/' + created._id, 'PUT', { color: 'Rojo' })).status, 400)
  assert.equal((await request('/invalido', 'DELETE')).status, 400)
  assert.equal((await request('/' + 'f'.repeat(24))).status, 404)
  assert.equal((await request('/' + 'f'.repeat(24), 'PUT', input)).status, 404)
  assert.equal((await request('/' + 'f'.repeat(24), 'DELETE')).status, 404)
  assert.equal((await fetch(base, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: '{' })).status, 400)

  failRead = true
  const failed = await request()
  assert.equal(failed.status, 500)
  assert.deepEqual(await failed.json(), { error: 'No se pudo completar la operación con MongoDB.' })
  failRead = false

  assert.equal((await request('/' + created._id, 'DELETE')).status, 204)
  assert.equal((await request('/' + created._id)).status, 404)
  assert.deepEqual(await (await request()).json(), [])
})
