import React from "react";
import { styled } from "@mui/material/styles";

const MDTitle = styled("span")(({ theme }) => ({
  position: "relative",
  display: "block",
  fontFamily: "GontserratRegular",
  fontStyle: "normal",
  fontWeight: 400,
  color: `${theme.palette.white.main}`,
  [theme.breakpoints.up("xs")]: {
    fontSize: "1rem",
  },
  [theme.breakpoints.up("sm")]: {
    fontSize: "1.4rem",
  },
}));

const MDLabelPrimary = (props) => {
  return <MDTitle {...props}>{props.children}</MDTitle>;
};

export default MDLabelPrimary;
