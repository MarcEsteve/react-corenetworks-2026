import { createTheme } from '@mui/material/styles'

export default createTheme({
  palette: {
    primary: { main: '#3158d3' },
    secondary: { main: '#087f75' },
    background: { default: '#f5f7fc', paper: '#ffffff' },
    text: { primary: '#182342', secondary: '#596580' },
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
    h1: { fontWeight: 700, letterSpacing: '-0.04em' },
    h2: { fontWeight: 700 },
    button: { textTransform: 'none' },
  },
  shape: { borderRadius: 16 },
  components: {
    MuiButton: { defaultProps: { disableElevation: true } },
    MuiCard: { defaultProps: { variant: 'outlined' } },
    MuiCssBaseline: { styleOverrides: { body: { minWidth: 320 }, '#root': { minHeight: '100vh' } } },
  },
})
