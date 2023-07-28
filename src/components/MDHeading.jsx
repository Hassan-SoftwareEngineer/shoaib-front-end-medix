import React from 'react'
import { styled } from '@mui/material/styles';
import theme from '../assets/Theme';

const MDTitle = styled('span')(({ theme }) => ({
    position: 'relative',
    display:"inline-block",
    fontFamily: 'DM Serif Display',
    fontStyle: "italic",
    fontWeight: 400,
    color:`${theme.palette.primary.main}`,
    [theme.breakpoints.up('xs')]: {
        fontSize:"2rem",
    },
    [theme.breakpoints.up('sm')]: {
        fontSize:"3.3rem",

    },
    [theme.breakpoints.up('md')]: {
        fontSize:"3.7rem",

    },
    [theme.breakpoints.up('lg')]: {
        fontSize:"4rem",

    },
    [theme.breakpoints.up('xl')]: {
        fontSize:"4.3rem",
    },
}));

const MDHeading = (props) => {
  return (
    <MDTitle {...props}>
        {props.children}
    </MDTitle>
  )
}

export default MDHeading