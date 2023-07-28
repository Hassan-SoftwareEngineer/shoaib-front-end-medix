import React from "react";
import { styled } from "@mui/material/styles";
import theme from "../assets/Theme";

const MDBox = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.primary,
  [theme.breakpoints.up("xs")]: {
    padding: theme.spacing(1, 1.6),
  },
  [theme.breakpoints.up("sm")]: {
    padding: theme.spacing(2, 2),
  },
  [theme.breakpoints.up("md")]: {
    padding: theme.spacing(3, 2.3),
  },
  [theme.breakpoints.up("lg")]: {
    padding: theme.spacing(3.3, 2.7),
  },
  [theme.breakpoints.up("xl")]: {
    padding: theme.spacing(4, 3),
  },

  // border: `1px solid ${theme.palette.primary.search_border_color}`,
  // '&:hover': {
  //     backgroundColor: theme.palette.primary.gray_light,
  // },
  // marginRight: theme.spacing(2),
  // marginLeft: 0,
  // width: '100%',
  // [theme.breakpoints.up('sm')]: {
  //     marginLeft: theme.spacing(3),
  //     width: 'auto',
  // },
}));

const MDContainer = (props) => {
  return <MDBox {...props}>{props.children}</MDBox>;
};

export default MDContainer;
