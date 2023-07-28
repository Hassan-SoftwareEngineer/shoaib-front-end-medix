import * as React from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { styled } from "@mui/material/styles";


const ToggleGroup = styled(ToggleButtonGroup)(({ theme }) => ({
    // color: "#6D7A83",
    // fontSize: "14px",
    // borderRadius: theme.shapes.borderRadius,
    // border: "none",
    // border: `1px solid #DCE3EB`,
    // backgroundColor: theme.palette.primary.light_WhiteBlue,
    height:"48px",
    // "&.MuiToggleButtonGroup-grouped": {
    //     borderRadius: "40px !important",
    //     mx: 1,
    //     border: "1px solid red !important"
    //   },
    //   '&.MuiToggleButton-root.Mui-selected': {
    //     backgroundColor: "red",
    // }
    
}));

const MDToggle=()=> {
  const [alignment, setAlignment] = React.useState('web');

  const handleChange = (event, newAlignment) => {
    setAlignment(newAlignment);
  };

  return (
    <ToggleGroup
      color="primary"
      value={alignment}
      exclusive
      onChange={handleChange}
      aria-label="Platform"
      sx={{
        "&.MuiToggleButton-root.Mui-selected": {
          backgroundColor: "red", //use the color you want
        },
      }}
    >
      <ToggleButton  sx={{
          "&.MuiToggleButton-root.Mui-selected": {
            backgroundColor: "yellow", //use the color you want
          },
          "&.MuiToggleButton-root": {
            backgroundColor: "red", //use the color you want
          },
        }}
      
      value="web">Web</ToggleButton>
      <ToggleButton value="android">Android</ToggleButton>
    </ToggleGroup>
  );
}

export default MDToggle



