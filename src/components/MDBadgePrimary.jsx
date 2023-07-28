import React from "react";
import { styled } from "@mui/material/styles";
import { Height } from "@mui/icons-material";

const MDBox = styled("span")(({ theme }) => ({
  position: "relative",
  display: "inline-flex",
  borderRadius: "50%",
  fontFamily: "GontserratRegular",
  fontStyle: "normal",
  fontWeight: 400,
  justifyContent: "center",
  alignItems: "center",
  background: theme.palette.lightcyan.main,
  color: theme.palette.primary.main,
  [theme.breakpoints.up("xs")]: {
    fontSize: "2rem",
    width: "40px",
    height: "40px",
  },
  [theme.breakpoints.up("md")]: {
    fontSize: "3rem",
    width: "60px",
    height: "60px",
  },
  [theme.breakpoints.up("lg")]: {
    fontSize: "5rem",
    width: "80px",
    height: "80px",
  },
  [theme.breakpoints.up("lg")]: {
    fontSize: "6rem",
    width: "108px",
    height: "108px",
  },
}));

const MDBadgePrimary = (props) => {
  return <MDBox {...props}>{props.children}</MDBox>;
};

export default MDBadgePrimary;
