import { createTheme } from "@mui/material/styles";

declare module "@mui/material/styles" {
  interface Palette {
    gold: {
      primary: string;
      dark: string;
      softBg: string;
      border: string;
    };
  }
  interface PaletteOptions {
    gold?: {
      primary?: string;
      dark?: string;
      softBg?: string;
      border?: string;
    };
  }
}

const colors = {
  primaryDarkBlue: "#1C2A44",
  secondaryBlue: "#154EB1",
  goldPrimary: "#C89B3C",
  goldDark: "#7A5A1F",
  white: "#FFFFFF",
} as const;

const gradients = {
  mainBackground: `linear-gradient(to bottom right, ${colors.primaryDarkBlue}, ${colors.secondaryBlue})`,
  goldSoftCard: "linear-gradient(to bottom right, rgba(200,155,60,0.15), rgba(200,155,60,0.05))",
} as const;

const borders = {
  goldSubtle: "1px solid rgba(200,155,60,0.4)",
} as const;

export { colors, gradients, borders };

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: colors.secondaryBlue,
      dark: colors.primaryDarkBlue,
    },
    background: {
      default: colors.primaryDarkBlue,
      paper: colors.primaryDarkBlue,
    },
    text: {
      primary: colors.white,
      secondary: "rgba(255,255,255,0.7)",
    },
    gold: {
      primary: colors.goldPrimary,
      dark: colors.goldDark,
      softBg: gradients.goldSoftCard,
      border: borders.goldSubtle,
    },
  },
  typography: {
    fontFamily: "'Inter', 'Roboto', 'Helvetica', 'Arial', sans-serif",
    h4: {
      fontWeight: 700,
      letterSpacing: "0.02em",
    },
    h5: {
      fontWeight: 600,
    },
    h6: {
      fontWeight: 600,
    },
    body1: {
      fontSize: "0.95rem",
    },
    body2: {
      fontSize: "0.85rem",
    },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          background: gradients.mainBackground,
          minHeight: "100vh",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          fontWeight: 600,
          borderRadius: 8,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundImage: "none",
        },
      },
    },
  },
});

export default theme;
