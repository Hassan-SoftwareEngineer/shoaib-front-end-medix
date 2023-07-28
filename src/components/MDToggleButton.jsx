import {FormControl } from "@mui/material";
import ToggleButton from '@mui/material/ToggleButton';
import styled from "@emotion/styled";



const ToggleBtn = styled(ToggleButton)(({ theme }) => ({
    width:"50%",
    border: "none",
    color: theme.palette.primary.white,
    borderRadius: `${theme.shape.secondary}!important`,
    backgroundColor: theme.palette.whitedark.main,
    fontFamily: "GontserratRegular",
    fontStyle: "normal",
    fontWeight: 400,
    display:"flex",
    justifyContent:"center",
    alignItems:"center",
    textTransform:'capitalize',
    whiteSpace:"pre",
    "&.Mui-selected, &.Mui-selected:hover": {
        color: "black",
        background: "#AFDECC"
    },
    [theme.breakpoints.up("xs")]: {
        padding: theme.spacing(0.6, 1),
        fontSize: "1.2rem",
        width:"100%"
    
      },
      [theme.breakpoints.up("sm")]: {
        padding: theme.spacing(1, 2.6),
        fontSize: "1.3rem",
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


const MDToggleButton=(props)=>{
    return(
        <ToggleBtn {...props}>
            {props.children}
        </ToggleBtn>
    )
}



export default MDToggleButton