import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    primary: {
      light: "#FBF7F0",
      main: "#D9E4DD",
    },
    secondary: {
      main: "#CDC9C3",
      dark: "#555555",
    },
  },
  typography: {
    fontFamily: ["Poppins", "Roboto"].join(","),
  },
});
