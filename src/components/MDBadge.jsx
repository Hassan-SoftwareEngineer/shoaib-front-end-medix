import React from "react";
import { styled } from "@mui/material/styles";

const MDBox = styled("span")(({ theme }) => ({
  position: "relative",
  display:"inline-flex",
  borderRadius: theme.shape.badgeradius,
  fontFamily: "GontserratRegular",
  fontStyle: "normal",
  fontWeight: 400,
  justifyContent:"center",
  alignItems:"center",
 background: theme.palette.lightgreen.main,
 color:theme.palette.mintastic.main,
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
[theme.breakpoints.up('lg')]: {
  fontSize:"1.3rem",
},
}));

const MDBadge = (props) => {
  return <MDBox {...props}>{props.children}</MDBox>;
};




export default MDBadge