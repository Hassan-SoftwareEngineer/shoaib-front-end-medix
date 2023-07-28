import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

export default function MDLoader({show}) {
  return (
    <>
    {show && 
     <Box sx={{ 
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0, 0, 0, 0.5)", /* Set the background color with a slightly dark opacity */
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex:9999999999999
     }}>
      <CircularProgress sx={{fontSize:"40px",color:"#fff"}}/>
    </Box>
    }
    </>
   
  );
}