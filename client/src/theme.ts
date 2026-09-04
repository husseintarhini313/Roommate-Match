import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: '#E8664A', // terracotta
    },
    secondary: {
      main: '#1E4B4A', // deep teal
    },
    background: {
      default: '#FDF8F3', // cream — the overall page background
      paper: '#FFFFFF',   // cards, app bars, dialogs sit on this
    },
    success: {
      main: '#7FA084', // sage green
    },
    error: {
      main: '#D64545',
    },
    text: {
      primary: '#2B2B2B',   // charcoal
      secondary: '#8A8580', // muted warm gray
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: { fontFamily: '"Poppins", sans-serif', fontWeight: 700 },
    h2: { fontFamily: '"Poppins", sans-serif', fontWeight: 700 },
    h3: { fontFamily: '"Poppins", sans-serif', fontWeight: 600 },
    h4: { fontFamily: '"Poppins", sans-serif', fontWeight: 600 },
    button: {
      textTransform: 'none',
    },
  },
  shape: {
    borderRadius: 12,
  },
});

export default theme;