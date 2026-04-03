import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  spacing: 4,
  shape: {
    borderRadius: 4,
  },
  palette: {
    mode: 'light',
    background: {
      default: '#FFFFFF',
      paper: '#FFFFFF',
    },
    primary: {
      main: '#1C2A44',
    },
    secondary: {
      main: '#C69C44',
    },
    text: {
      primary: '#1C2A44',
      secondary: '#637089',
    },
    divider: '#E5E7EB',
  },
  typography: {
    fontFamily: 'Outfit',
    button: {
      fontWeight: 600,
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: `
        :root {
          --bg-app: #FFFFFF;
          --bg-card: #FFFFFF;
          --bg-header: #1C2A44;
          --bg-shell: linear-gradient(135deg, #f7f6f3 0%, #eceae6 100%);
          --accent-navy: #1C2A44;
          --accent-gold: #C69C44;
          --border-default: #E5E7EB;
          --text-main: #1C2A44;
          --text-muted: #637089;
          --text-inverse: #FFFFFF;
        }

        body {
          background: #FFFFFF;
        }
      `,
    },
    MuiButton: {
      defaultProps: {
        disableElevation: true,
        disableRipple: true,
      },
      styleOverrides: {
        root: {
          borderRadius: 4,
          textTransform: 'none',
          padding: '4px 12px',
          justifyContent: 'flex-start',
          border: '1px solid transparent',
        },
        containedPrimary: {
          background: 'linear-gradient(135deg, #B8902A 0%, #C9A84C 100%)',
          color: 'var(--text-inverse)',
        },
        outlined: {
          borderColor: 'var(--border-default)',
          color: 'var(--text-main)',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 4,
          border: '1px solid var(--border-default)',
        },
      },
    },
  },
});