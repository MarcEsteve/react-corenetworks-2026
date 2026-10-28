import type { Vehiculo, VehiculoInput } from '../types/vehiculo'

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const response = await fetch('/api/vehiculos' + path, options)
  if (!response.ok) {
    const body = await response.json().catch(() => null)
    throw new Error(body?.error || `Error HTTP ${response.status}`)
  }
  if (response.status === 204) return undefined as T
  return response.json() as Promise<T>
}

const json = (method: string, data: VehiculoInput): RequestInit => ({
  method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data),
})

export const vehiculosApi = {
  list: (signal?: AbortSignal) => request<Vehiculo[]>('', { signal }),
  create: (data: VehiculoInput) => request<Vehiculo>('', json('POST', data)),
  update: (id: string, data: VehiculoInput) => request<Vehiculo>('/' + id, json('PUT', data)),
  remove: (id: string) => request<void>('/' + id, { method: 'DELETE' }),
}
