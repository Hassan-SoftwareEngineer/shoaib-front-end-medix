import React from "react";
import { styled } from "@mui/material/styles";

const MDBox = styled("span")(({ theme }) => ({
  position: "relative",
  display:"inline-flex",
  fontFamily: "GontserratRegular",
  fontStyle: "normal",
  fontWeight: 400,

 color:"red",
 [theme.breakpoints.up('xs')]: {
    fontSize:"1.2rem",
    padding: theme.spacing(.2, 1),
},
[theme.breakpoints.up('md')]: {
    fontSize:"1.4rem",
    padding: theme.spacing(.3, 1.6),
},
[theme.breakpoints.up('lg')]: {
    fontSize:"2rem",
  padding: theme.spacing(.6, 3),
},
[theme.breakpoints.up('xl')]: {
  fontSize:"1.3rem",
},
}));

const MDError = (props) => {
  return <MDBox {...props}>{props.children}</MDBox>;
};




export default MDError