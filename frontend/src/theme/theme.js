import { createTheme } from '@mui/material/styles';

export const getTheme = (mode) => {
  const isDark = mode === 'dark';

  return createTheme({
    palette: {
      mode,
      primary: {
        light: '#818cf8',
        main: '#6366f1',
        dark: '#4f46e5',
        contrastText: '#ffffff',
      },
      secondary: {
        light: '#94a3b8',
        main: '#64748b',
        dark: '#475569',
        contrastText: '#ffffff',
      },
      background: {
        default: isDark ? '#0f172a' : '#F9FAFB',
        paper: isDark ? '#1e293b' : '#ffffff',
      },
      text: {
        primary: isDark ? '#f8fafc' : '#0f172a',
        secondary: isDark ? '#94a3b8' : '#475569',
      },
      divider: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(15,23,42,0.06)'
    },
    typography: {
      fontFamily: '"Plus Jakarta Sans", sans-serif',
      h1: { fontSize: '2.5rem', fontWeight: 800, letterSpacing: '-0.025em' },
      h2: { fontSize: '2rem', fontWeight: 800, letterSpacing: '-0.02em' },
      h3: { fontSize: '1.5rem', fontWeight: 700, letterSpacing: '-0.01em' },
      h4: { fontSize: '1.25rem', fontWeight: 700 },
      h5: { fontSize: '1.125rem', fontWeight: 700 },
      h6: { fontSize: '1rem', fontWeight: 700 },
      body1: { fontSize: '0.975rem', lineHeight: 1.6 },
      body2: { fontSize: '0.875rem', lineHeight: 1.57 },
      button: { textTransform: 'none', fontWeight: 600 },
    },
    shape: {
      borderRadius: 16,
    },
    components: {
      MuiPaper: {
        styleOverrides: {
          root: {
            backgroundImage: 'none',
            borderRadius: 16,
          }
        }
      },
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: 16,
            boxShadow: 'none',
            border: isDark ? '1px solid rgba(255,255,255,0.08)' : '1px solid rgba(15,23,42,0.08)',
            transition: 'transform 200ms ease, box-shadow 200ms ease, border-color 200ms ease',
            '&:hover': {
              transform: 'translateY(-2px)',
              boxShadow: isDark ? '0 8px 24px rgba(0,0,0,0.4)' : '0 8px 24px rgba(15,23,42,0.06)',
              borderColor: isDark ? 'rgba(255,255,255,0.12)' : 'rgba(15,23,42,0.06)',
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
            borderRadius: 12,
            textTransform: 'none',
            padding: '10px 20px',
            fontWeight: 600,
          },
          containedPrimary: {
            boxShadow: '0 4px 14px rgba(99,102,241,0.25)',
            '&:hover': {
              boxShadow: '0 6px 20px rgba(99,102,241,0.4)',
            }
          }
        }
      },
      MuiChip: {
        styleOverrides: {
          root: {
            borderRadius: 12,
            fontWeight: 600,
          },
          filled: {
            border: 'none',
          }
        }
      },
      MuiAppBar: {
        styleOverrides: {
          root: {
            backgroundColor: isDark ? 'rgba(15, 23, 42, 0.8)' : 'rgba(255, 255, 255, 0.8)',
            backdropFilter: 'blur(12px)',
            color: isDark ? '#f8fafc' : '#0f172a',
            boxShadow: 'none',
            borderBottom: 'none',
          }
        }
      },
      MuiDrawer: {
        styleOverrides: {
          paper: {
            backgroundColor: isDark ? '#1e293b' : '#ffffff',
            borderRight: 'none',
          }
        }
      },
      MuiListItemButton: {
        styleOverrides: {
          root: {
            borderRadius: 12,
            marginBottom: '4px',
            transition: 'all 0.2s ease',
          }
        }
      }
    }
  });
};