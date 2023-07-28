import React from "react";
import { styled } from "@mui/material/styles";

const MDTitle = styled("span")(({ theme }) => ({
  position: "relative",
  display: "block",
  fontFamily: "GontserratRegular",
  fontStyle: "normal",
  fontWeight: 400,
  color: `${theme.palette.gray.main}`,
  [theme.breakpoints.up("xs")]: {
    fontSize: "1rem",
    letterSpacing: ".2rem",
    marginLeft: ".2rem",
    marginTop:"-.5rem"
  },
  [theme.breakpoints.up("sm")]: {
    fontSize: "1.3rem",
    letterSpacing: ".3rem",
    marginLeft: ".4rem",
    marginTop:"-1rem",
  },
  [theme.breakpoints.up("md")]: {
    fontSize: "1.5rem",
    letterSpacing: ".4rem",
    marginLeft: ".7rem",
    marginTop:"-1.2rem"

  },
  [theme.breakpoints.up("lg")]: {
    fontSize: "1.7rem",
    letterSpacing: ".6rem",
  },
  [theme.breakpoints.up("xl")]: {
    fontSize: "2rem",
    letterSpacing: ".6rem",
  },
}));

const MDLabel = (props) => {
  return <MDTitle {...props}>{props.children}</MDTitle>;
};

export default MDLabel;
