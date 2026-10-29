import { useEffect, useState } from 'react'
import type { FormEvent } from 'react'
import { Alert, Box, Button, Card, CardContent, Chip, Stack, TextField, Typography } from '@mui/material'
import { ApiError, getProfile, login } from '../api/auth'
import type { Profile } from '../api/auth'

export function Login() {
  const [email, setEmail] = useState('admin@dgt.es')
  const [password, setPassword] = useState('')
  const [token, setToken] = useState(() => localStorage.getItem('token') || '')
  const [profile, setProfile] = useState<Profile | null>(null)
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')

  const clearSession = () => {
    localStorage.removeItem('token')
    setToken('')
    setProfile(null)
  }

  useEffect(() => {
    if (!token) return
    let active = true
    getProfile(token).then((data) => {
      if (active) setProfile(data)
    }).catch((reason: unknown) => {
      if (!active) return
      if (reason instanceof ApiError && [401, 403].includes(reason.status)) {
        localStorage.removeItem('token')
        setToken('')
        setProfile(null)
      }
      setError(reason instanceof Error ? reason.message : 'No se pudo conectar con la API')
    })
    return () => { active = false }
  }, [token])

  useEffect(() => {
    if (!profile) return
    const timeout = window.setTimeout(() => {
      clearSession()
      setError('La sesión ha expirado. Inicia sesión de nuevo.')
    }, Math.max(0, profile.expiresAt - Date.now()))
    return () => window.clearTimeout(timeout)
  }, [profile])

  const handleLogin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setBusy(true)
    setError('')
    try {
      const data = await login(email, password)
      const user = await getProfile(data.token)
      localStorage.setItem('token', data.token)
      setToken(data.token)
      setProfile(user)
      setPassword('')
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : 'No se pudo conectar con la API')
    } finally {
      setBusy(false)
    }
  }

  const handleProfile = async () => {
    setBusy(true)
    setError('')
    try {
      setProfile(await getProfile(token))
    } catch (reason) {
      if (reason instanceof ApiError && [401, 403].includes(reason.status)) clearSession()
      setError(reason instanceof Error ? reason.message : 'No se pudo conectar con la API')
    } finally {
      setBusy(false)
    }
  }

  return (
    <Card component="section" aria-labelledby="login-title" sx={{ mb: 7 }}>
      <CardContent sx={{ p: { xs: 3, sm: 4 } }}>
        <Chip label="JWT · Express + React" color="primary" variant="outlined" size="small" />
        <Typography id="login-title" variant="h2" sx={{ fontSize: '2rem', mt: 2, mb: 1 }}>Acceso al área DGT</Typography>
        <Typography color="text.secondary" sx={{ mb: 3 }}>Demostración de autenticación: inicia sesión y consulta una ruta protegida con tu token.</Typography>
        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        {token ? (
          <Stack spacing={2}>
            <Alert severity={profile ? 'success' : 'info'}>
              {profile ? `Acceso permitido: ${profile.email} · Rol: ${profile.role}` : 'Comprobando sesión guardada…'}
            </Alert>
            {profile && <Typography color="text.secondary">Caduca: {new Date(profile.expiresAt).toLocaleString('es-ES')}</Typography>}
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
              <Button variant="contained" disabled={busy} onClick={handleProfile}>{busy ? 'Consultando…' : 'Consultar perfil protegido'}</Button>
              <Button variant="outlined" disabled={busy} onClick={() => { clearSession(); setError('') }}>Cerrar sesión</Button>
            </Stack>
          </Stack>
        ) : (
          <Box component="form" onSubmit={handleLogin} sx={{ maxWidth: 480 }}>
            <Stack spacing={2}>
              <Alert severity="info">Credenciales de prueba: admin@dgt.es / 1234</Alert>
              <TextField label="Correo electrónico" type="email" autoComplete="username" value={email} onChange={(event) => setEmail(event.target.value)} required disabled={busy} fullWidth />
              <TextField label="Contraseña" type="password" autoComplete="current-password" value={password} onChange={(event) => setPassword(event.target.value)} required disabled={busy} fullWidth />
              <Button type="submit" variant="contained" disabled={busy}>{busy ? 'Iniciando sesión…' : 'Iniciar sesión'}</Button>
            </Stack>
          </Box>
        )}
      </CardContent>
    </Card>
  )
}
