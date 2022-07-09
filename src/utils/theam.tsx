import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    primary: {
      light: "#FBF7F0",
      main: "#D9E4DD",
    },
    secondary: {
      main: "#555555",
      dark: "#CDC9C3",
    },
    background: {
      default: "#FBF7F0",
      paper: "#FBF7F0",
    },
  },
  typography: {
    fontFamily: ["Poppins", "Roboto"].join(","),
  },
});
