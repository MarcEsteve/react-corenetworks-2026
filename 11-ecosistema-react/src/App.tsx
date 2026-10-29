import { useState } from 'react'
import { Box, Button, Card, CardContent, Chip, Container, Divider, Stack, Typography } from '@mui/material'
import ArrowForwardRounded from '@mui/icons-material/ArrowForwardRounded'
import AutoAwesomeRounded from '@mui/icons-material/AutoAwesomeRounded'
import CodeRounded from '@mui/icons-material/CodeRounded'
import PaletteOutlined from '@mui/icons-material/PaletteOutlined'
import DevicesRounded from '@mui/icons-material/DevicesRounded'
import AddRounded from '@mui/icons-material/AddRounded'
import RestartAltRounded from '@mui/icons-material/RestartAltRounded'
import { SweetAlertExamples } from './components/SweetAlertExamples'
import { Login } from './components/Login'

const features = [
  { icon: PaletteOutlined, title: 'Un estilo propio', description: 'Colores, tipografía y formas definidos en un tema central para toda tu aplicación.' },
  { icon: DevicesRounded, title: 'En cualquier pantalla', description: 'Layouts flexibles y breakpoints de MUI, desde el móvil hasta el escritorio.' },
  { icon: CodeRounded, title: 'Menos CSS, más React', description: 'Componentes reutilizables y estilos con sx para dar forma a tus ideas.' },
]

function App() {
  const [count, setCount] = useState(0)

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 3, md: 5 } }}>
      <Stack component="header" direction="row" sx={{ alignItems: 'center', justifyContent: 'space-between' }} spacing={2}>
        <Stack direction="row" spacing={1.5} sx={{ alignItems: 'center' }}>
          <Box sx={{ bgcolor: 'primary.main', color: 'white', p: 1, borderRadius: 2, display: 'flex' }}><AutoAwesomeRounded /></Box>
          <Typography sx={{ fontWeight: 700 }}>Ecosistema React</Typography>
        </Stack>
        <Chip label="Material UI" color="primary" variant="outlined" size="small" />
      </Stack>
      <Box component="main">
        <Box component="section" sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1.35fr 1fr' }, gap: { xs: 4, md: 8 }, alignItems: 'center', py: { xs: 7, md: 10 } }}>
          <Box>
            <Typography variant="overline" color="secondary.main" sx={{ fontWeight: 700, letterSpacing: 2 }}>TU PRÓXIMO PROYECTO EMPIEZA AQUÍ</Typography>
            <Typography variant="h1" sx={{ fontSize: { xs: '2.7rem', md: '4rem' }, lineHeight: 1.08, mt: 2, mb: 3 }}>Grandes ideas.<br /><Box component="span" sx={{ color: 'primary.main' }}>Interfaces que inspiran.</Box></Typography>
            <Typography color="text.secondary" sx={{ fontSize: '1.125rem', lineHeight: 1.8 }}>React y Material UI, juntos para dar forma a tus ideas. Explora una base visual moderna y empieza a construir tu siguiente experiencia.</Typography>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ mt: 4 }}>
              <Button variant="contained" size="large" href="https://mui.com/material-ui/getting-started/usage/" target="_blank" rel="noopener noreferrer" endIcon={<ArrowForwardRounded />}>Empezar con MUI</Button>
              <Button variant="outlined" size="large" href="#componentes">Explorar componentes</Button>
            </Stack>
          </Box>
          <Card sx={{ boxShadow: '0 24px 64px rgba(24,35,66,0.08)' }}>
            <CardContent sx={{ p: { xs: 3, sm: 4 } }}>
              <Stack direction="row" sx={{ alignItems: 'center', justifyContent: 'space-between' }} spacing={1}>
                <Typography variant="overline" color="text.secondary">PLAYGROUND</Typography>
                <Chip label="Interactivo" size="small" color="secondary" variant="outlined" />
              </Stack>
              <Typography variant="h2" sx={{ fontSize: '1.6rem', mt: 3 }}>Tu primer componente</Typography>
              <Typography color="text.secondary" sx={{ mt: 1 }}>Un pequeño clic para empezar a crear.</Typography>
              <Box role="status" aria-live="polite" aria-atomic="true" sx={{ bgcolor: 'background.default', borderRadius: 3, textAlign: 'center', py: 4, my: 3 }}>
                <Typography sx={{ fontSize: '4.5rem', fontWeight: 300, color: 'primary.main', lineHeight: 1.2 }}>{count}</Typography>
                <Typography color="text.secondary">{count === 1 ? 'clic realizado' : 'clics realizados'}</Typography>
              </Box>
              <Stack direction="row" spacing={1.5}>
                <Button fullWidth variant="contained" startIcon={<AddRounded />} onClick={() => setCount((value) => value + 1)}>Añadir clic</Button>
                <Button variant="outlined" aria-label="Reiniciar contador" onClick={() => setCount(0)} sx={{ minWidth: 48 }}><RestartAltRounded /></Button>
              </Stack>
            </CardContent>
          </Card>
        </Box>
        <Box component="section" id="componentes" sx={{ pb: 7, scrollMarginTop: 24 }}>
          <Typography variant="h2" sx={{ fontSize: { xs: '1.7rem', md: '2rem' }, mb: 1 }}>Todo listo para construir</Typography>
          <Typography color="text.secondary" sx={{ mb: 3 }}>Una base sencilla que crece contigo.</Typography>
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' }, gap: 3 }}>
            {features.map(({ icon: Icon, title, description }) => (
              <Card key={title} component="article">
                <CardContent sx={{ p: 3 }}>
                  <Icon color="primary" sx={{ fontSize: 32, mb: 2 }} />
                  <Typography variant="h3" sx={{ fontSize: '1.2rem', fontWeight: 700, mb: 1.5 }}>{title}</Typography>
                  <Typography color="text.secondary" sx={{ lineHeight: 1.8 }}>{description}</Typography>
                </CardContent>
              </Card>
            ))}
          </Box>
        </Box>
        <SweetAlertExamples />
        <Login />
      </Box>
      <Divider />
      <Typography component="footer" variant="body2" color="text.secondary" sx={{ pt: 3 }}>Ecosistema React · Construido con Material UI y Roboto</Typography>
    </Container>
  )
}

export default App

