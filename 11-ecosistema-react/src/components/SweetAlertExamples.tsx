import { Button, Card, CardContent, Stack, Typography, useTheme } from '@mui/material'
import CheckCircleOutlineRounded from '@mui/icons-material/CheckCircleOutlineRounded'
import MailOutlineRounded from '@mui/icons-material/MailOutlineRounded'
import Swal from 'sweetalert2'
import { DeleteButton } from './DeleteButton'

export function SweetAlertExamples() {
  const theme = useTheme()
  const alerts = Swal.mixin({
    confirmButtonColor: theme.palette.primary.main,
    cancelButtonColor: theme.palette.text.secondary,
    confirmButtonText: 'Aceptar',
    cancelButtonText: 'Cancelar',
  })

  const handleSuccess = () => {
    void alerts.fire('¡Hecho!', 'Tu alerta de ejemplo funciona correctamente.', 'success')
  }

  const handleEmail = async () => {
    const { value: email, isConfirmed } = await alerts.fire<string>({
      title: 'Introduce tu email',
      input: 'email',
      inputLabel: 'Correo electrónico',
      inputPlaceholder: 'nombre@dominio.com',
      inputAttributes: { autocomplete: 'email' },
      validationMessage: 'Introduce un correo electrónico válido.',
      showCancelButton: true,
      confirmButtonText: 'Continuar',
      inputValidator: (value) => !value.trim() ? 'Introduce tu correo electrónico.' : undefined,
    })

    if (isConfirmed && email) {
      await alerts.fire({
        title: 'Email introducido',
        text: `Has escrito: ${email}. Solo se muestra en esta alerta; no se guarda ni se envía.`,
        icon: 'success',
      })
    }
  }

  return (
    <Card component="section" aria-labelledby="sweetalert-title" sx={{ mb: 7 }}>
      <CardContent sx={{ p: { xs: 3, sm: 4 } }}>
        <Typography variant="overline" color="secondary.main" sx={{ fontWeight: 700, letterSpacing: 2 }}>SWEETALERT2</Typography>
        <Typography id="sweetalert-title" variant="h2" sx={{ fontSize: { xs: '1.7rem', md: '2rem' }, mt: 1, mb: 1 }}>Alertas que conversan contigo</Typography>
        <Typography color="text.secondary" sx={{ mb: 3 }}>Prueba una notificación, un campo de email o una confirmación. Son ejemplos interactivos sin operaciones CRUD.</Typography>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} useFlexGap sx={{ flexWrap: 'wrap' }}>
          <Button variant="contained" startIcon={<CheckCircleOutlineRounded />} onClick={handleSuccess}>Mostrar éxito</Button>
          <Button variant="outlined" startIcon={<MailOutlineRounded />} onClick={handleEmail}>Introducir email</Button>
          <DeleteButton />
        </Stack>
      </CardContent>
    </Card>
  )
}
