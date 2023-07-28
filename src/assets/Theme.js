import { createTheme } from "@mui/material/styles";

const Colors = {
  primary: "#165643",
  secondary: "#AFDECC",
  lightcyan:"#E6F1F2",
  mintcream: "#F4FAFB",
  gray: "#B6B6B6",
  mintastic: "#AFFFE0",
  lightgreen: "#2D7C65",
  whitedark:"#F8F8F8",
  /////Solid Color/////
  white: "#ffffff",
  black: "#000000",
};

const theme = createTheme({
  palette: {
    primary: {
      main: Colors.primary,
    },
    secondary: {
      main: Colors.secondary,
    },
    lightcyan:{
      main: Colors.lightcyan,
    },
    mintcream: {
      main: Colors.mintcream,
    },
    mintastic: {
      main: Colors.mintastic,
    },
    lightgreen: {
      main: Colors.lightgreen,
    },
    gray: {
      main: Colors.gray,
    },
    whitedark: {
      main: Colors.whitedark,
    },
    white: {
      main: Colors.white,
    },
    black: {
      main: Colors.black,
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1700,
    },
  },
  shape: {
    primary: "25px",
    secondary: "50px",
    badgeradius: "34px",

    borderRadiusButton2: "30px",
  },
  fonts: {
    primary: "GontserratRegular",
  },
});

export default theme;
