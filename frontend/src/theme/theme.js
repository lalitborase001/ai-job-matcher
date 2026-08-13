import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      // modern indigo/blue
      light: '#4f7bd9',
      main: '#2b6ef6',
      dark: '#1749b6',
      contrastText: '#ffffff',
    },
    secondary: {
      light: '#9fa8da',
      main: '#5c6bc0',
      dark: '#263062',
      contrastText: '#ffffff',
    },
    background: {
      default: '#F8FAFC',
      paper: '#ffffff',
    },
    text: {
      primary: '#0f1724',
      secondary: '#334155',
    },
    divider: 'rgba(15,23,36,0.08)'
  },
  typography: {
    fontFamily: 'Inter, Roboto, "Helvetica Neue", Arial, sans-serif',
    h1: { fontSize: '2.25rem', fontWeight: 700, letterSpacing: '-0.02em' },
    h2: { fontSize: '1.75rem', fontWeight: 700 },
    h3: { fontSize: '1.25rem', fontWeight: 600 },
    body1: { fontSize: '0.975rem', color: '#0f1724' },
    body2: { color: '#334155' },
  },
  shape: {
    borderRadius: 14,
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          borderRadius: 14,
        }
      }
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 14,
          boxShadow: '0 6px 18px rgba(16,24,40,0.06)',
          border: '1px solid rgba(15,23,36,0.04)',
          transition: 'transform 400ms ease-in-out, box-shadow 400ms ease-in-out',
          '&:hover': {
            transform: 'translateY(-6px)',
            boxShadow: '0 12px 30px rgba(16,24,40,0.12)',
          }
        }
      }
    },
    MuiButton: {
      defaultProps: {
        disableElevation: true,
      },
      styleOverrides: {
        root: {
          borderRadius: 10,
          textTransform: 'none',
          padding: '8px 16px',
        },
        containedPrimary: {
          boxShadow: '0 6px 14px rgba(43,110,246,0.14)'
        }
      }
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          fontWeight: 600
        }
      }
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#ffffff',
          color: '#0f1724',
          boxShadow: 'none',
          borderBottom: '1px solid rgba(15,23,36,0.04)'
        }
      }
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: '#ffffff',
          borderRight: '1px solid rgba(15,23,36,0.04)'
        }
      }
    }
  }
});

export default theme;