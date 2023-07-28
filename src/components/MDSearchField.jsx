import * as React from 'react'
import { styled } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';

const DTSearchBar = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.secondary,
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up("xs")]: {
        maxWidth:"100%",
        marginTop:"1.2rem"
    },
    [theme.breakpoints.up("sm")]: {
        maxWidth:"250px",
       
    },
    [theme.breakpoints.up("md")]: {
        maxWidth:"350px",

       
    },
    [theme.breakpoints.up("lg")]: {
        maxWidth:"400px"
       
    },
    [theme.breakpoints.up("xl")]: {
        maxWidth:"461px"
    },
}));

const DTSearchIconWrapper = styled(IconButton)(({ theme }) => ({
    height: '100%',
    position: 'absolute',
    display: 'flex',
    alignItems: 'center',
    right: "0px",
    cursor: "pointer",
    zIndex: '10',
    background: theme.palette.secondary.main,
    borderRadius: theme.shape.secondary,

    [theme.breakpoints.up("xs")]: {
        width: "50px",
    },
    [theme.breakpoints.up("sm")]: {
        width: "60px",
    },
    [theme.breakpoints.up("md")]: {
        width: "100px",
    },

}));

const DTSearchInputBase = styled(InputBase)(({ theme }) => ({
    color: theme.palette.gray,
    width: "100%",
    "& .MuiInputBase-input": {
        color: theme.palette.black.main,
        borderRadius: theme.shape.secondary,
        background: theme.palette.white.main,
        fontFamily: theme.fonts.primary,
        border: `2px solid transparent`,
        letterSpacing: "1px",
        width: "100%",

        display: "flex",
        justifyContent: "start",
        alignItems: "center",
        paddingRight:"100px",

        "&::placeholder": {
            color: theme.palette.gray,
        },
        "&:focus-within": {
            border: `2px solid #165643`,
        },
        [theme.breakpoints.up("xs")]: {
            padding: theme.spacing(0.6, 7,0.6, 1),
            fontSize: "1.2rem",
        },
        [theme.breakpoints.up("sm")]: {
            padding: theme.spacing(1,10,1, 2.6),
            fontSize: "1.3rem",
        },
        [theme.breakpoints.up("md")]: {
            padding: theme.spacing(1.1, 14,1.1, 3),
            fontSize: "1.6rem",
        },
        [theme.breakpoints.up("lg")]: {
            padding: theme.spacing(1.4,14,1.4, 3.2),
            fontSize: "2.2rem",

        },
        [theme.breakpoints.up("xl")]: {
            padding: theme.spacing(1.7, 14,1.7, 3.5),
        },
    }
}));

const MDSearchField = (props) => {
    return (
        <DTSearchBar>
            <DTSearchIconWrapper >
                <SearchIcon sx={{ fontSize: {xs:"16px",sm:"18px",md:"20px",lg:"25px"} }} />
            </DTSearchIconWrapper>
            <DTSearchInputBase
                placeholder={props.placeholder}
                inputProps={props.inputProps}
                {...props}
            />
        </DTSearchBar>
    )
}


export default MDSearchField