import { createTheme } from '@mui/material/styles'

const primaryMain = '#22c55e'
const backgroundDefault = '#0f0f0f'
const cardBackground = '#1a1a1a'
const sidebarBackground = '#111111'

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: primaryMain,
      light: '#4ade80',
      dark: '#1ea34f',
    },
    background: {
      default: backgroundDefault,
      paper: cardBackground,
    },
    text: {
      primary: '#f8fafc',
      secondary: 'rgba(255,255,255,0.62)',
    },
    divider: 'rgba(255,255,255,0.08)',
  },
  shape: {
    borderRadius: 12,
  },
  typography: {
    fontFamily: "'Space Grotesk', 'IBM Plex Sans', 'Inter', 'Segoe UI', sans-serif",
    h1: { fontWeight: 700 },
    h2: { fontWeight: 700 },
    h3: { fontWeight: 700 },
    h4: { fontWeight: 600 },
    h5: { fontWeight: 600 },
    h6: { fontWeight: 600 },
    subtitle1: { fontWeight: 600 },
    subtitle2: { fontWeight: 600 },
    button: { fontWeight: 600 },
    body2: { color: 'rgba(255,255,255,0.72)' },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: backgroundDefault,
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: cardBackground,
          backgroundImage: 'none',
          borderRadius: 12,
          boxShadow: '0 18px 50px rgba(0,0,0,0.35)',
        },
      },
    },
    MuiCard: {
      defaultProps: {
        elevation: 0,
      },
      styleOverrides: {
        root: {
          backgroundColor: cardBackground,
          borderRadius: 12,
          border: '1px solid rgba(255,255,255,0.04)',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          textTransform: 'none',
          fontWeight: 600,
        },
        containedPrimary: {
          backgroundColor: primaryMain,
          boxShadow: '0 10px 30px rgba(34,197,94,0.22)',
          '&:hover': {
            backgroundColor: '#1ea34f',
            boxShadow: '0 12px 34px rgba(34,197,94,0.32)',
          },
        },
        outlinedPrimary: {
          borderColor: 'rgba(34,197,94,0.6)',
          color: primaryMain,
          '&:hover': {
            borderColor: primaryMain,
            backgroundColor: 'rgba(34,197,94,0.08)',
          },
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: sidebarBackground,
          borderRight: '1px solid rgba(255,255,255,0.06)',
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          letterSpacing: 0.1,
        },
      },
    },
  },
})

export default theme
