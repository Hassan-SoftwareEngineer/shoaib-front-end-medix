import React from 'react'
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';

const DTPrimaryBtn = styled(Button)(({ theme }) => ({
  color: theme.palette.primary.white,
  borderRadius: theme.shape.secondary,
  backgroundColor: theme.palette.secondary.main,
  fontFamily: "GontserratRegular",
  fontStyle: "normal",
  fontWeight: 400,
  display:"flex",
  justifyContent:"center",
  alignItems:"center",
  textTransform:'capitalize',
  whiteSpace:"pre",
  '&:hover': {
    backgroundColor: theme.palette.primary.yellow_dark,
  },
  "&:disabled": {
    backgroundColor: theme.palette.primary.yellow_with_opacity,
  },
  [theme.breakpoints.up("xs")]: {
    padding: theme.spacing(0.6, 1),
    fontSize: "1.2rem",
    width:"100%"

  },
  [theme.breakpoints.up("sm")]: {
    padding: theme.spacing(1, 2.6),
    fontSize: "1.3rem",
    width:"122px"
  },
  [theme.breakpoints.up("md")]: {
    padding: theme.spacing(1.1, 3),
    fontSize: "1.6rem",
  },
  [theme.breakpoints.up("lg")]: {
    padding: theme.spacing(1.4, 3.2),
  },
  [theme.breakpoints.up("xl")]: {
    padding: theme.spacing(1.7, 3.5),
  },
}));


const MDButton = (props) => {
  const { btn_text, type, btnStatus } = props
  return (
    <DTPrimaryBtn type={type} disabled={btnStatus} {...props}>
      {props.icon}{btn_text}{props.children}
    </DTPrimaryBtn>
  )
}


export default MDButton