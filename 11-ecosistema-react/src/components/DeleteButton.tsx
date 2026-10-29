import { Button, useTheme } from '@mui/material'
import DeleteOutlineRounded from '@mui/icons-material/DeleteOutlineRounded'
import Swal from 'sweetalert2'

export function DeleteButton() {
  const theme = useTheme()

  const handleDelete = async () => {
    // Solo muestra alertas: no elimina vehículos ni realiza peticiones.
    const swalWithCustomButtons = Swal.mixin({
      confirmButtonColor: theme.palette.success.main,
      cancelButtonColor: theme.palette.error.main,
      confirmButtonText: 'Aceptar',
    })

    const result = await swalWithCustomButtons.fire({
      title: '¿Estás seguro?',
      text: 'Es una demostración. No se eliminará ningún vehículo.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, simular eliminación',
      cancelButtonText: 'No, cancelar',
      reverseButtons: true,
      focusCancel: true,
    })

    if (result.isConfirmed) {
      await swalWithCustomButtons.fire({
        title: 'Eliminación simulada',
        text: 'Has confirmado el ejemplo. No se han modificado datos.',
        icon: 'success',
      })
    } else if (result.dismiss === Swal.DismissReason.cancel) {
      await swalWithCustomButtons.fire({
        title: 'Cancelado',
        text: 'Has cancelado el ejemplo. No se han modificado datos.',
        icon: 'info',
      })
    }
  }

  return (
    <Button variant="outlined" color="error" startIcon={<DeleteOutlineRounded />} onClick={handleDelete}>
      Simular eliminación
    </Button>
  )
}
