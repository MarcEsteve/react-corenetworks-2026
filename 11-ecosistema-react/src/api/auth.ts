export interface Profile {
  email: string
  role: string
  expiresAt: number
}

export class ApiError extends Error {
  status: number
  constructor(message: string, status: number) {
    super(message)
    this.status = status
  }
}

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const response = await fetch(`/api${path}`, options)
  const data = await response.json().catch(() => null)
  if (!response.ok) throw new ApiError(data?.error || 'No se pudo completar la petición', response.status)
  if (!data) throw new Error('Respuesta inesperada de la API. Comprueba que Express está iniciado.')
  return data as T
}

export const login = (email: string, password: string) => request<{ token: string }>('/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ email, password }),
})

export const getProfile = (token: string) => request<Profile>('/perfil', {
  headers: { Authorization: `Bearer ${token}` },
})
