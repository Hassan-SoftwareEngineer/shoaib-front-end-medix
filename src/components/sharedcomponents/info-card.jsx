import React from "react";
import theme from "../../assets/Theme";
import MDContainer from "../MDContainer";
import MDHeadingSub from "../MDHeadingSub";
import { Divider } from "@mui/material";

import { useNavigate } from "react-router-dom";

const InfoCard = () => {
  const navigate=useNavigate()

  return (
    <MDContainer
      sx={{
        background: `${theme.palette.white.main}`,
        p: "2rem 1rem!important",
        textAlign: "end",
        mb: 1.6,
      }}
    >
      <MDHeadingSub
        sx={{
          color: `${theme.palette.primary.main}`,
          fontSize: { md: "1.8rem" },
          cursor:"pointer"
        }}
        onClick={()=>{
          navigate("/security")
        }}
      >
        Settings
      </MDHeadingSub>
      <MDHeadingSub
        sx={{
          color: `${theme.palette.primary.main}`,
          fontSize: { md: "1.8rem" },
          mt: { xs: 1,sm:2, md: 3, lg: 4 },
          cursor:"pointer"
        }}
        onClick={()=>{
          localStorage.clear();
          navigate("/login")
        }}
      >
        Logout
      </MDHeadingSub>
      <MDHeadingSub
        sx={{
          color: `${theme.palette.primary.main}`,
          fontSize: { md: "1.8rem" },
          mt: { xs: 1,sm:2, md: 3, lg: 4 },
          cursor:"pointer"
        }}
        onClick={()=>{
        }}
      >
        Customer Support
      </MDHeadingSub>

      <Divider
        sx={{
          background: `${theme.palette.whitedark.main}`,
          my: { xs: 1,sm:2, md: 3, lg: 4 },
          height: "3px",
        }}
      />
       <MDHeadingSub
        sx={{
          color: `${theme.palette.gray.main}`,
          mt: { xs: 1,sm:2, md: 3, lg: 4 },
        }}
      >
    Power & Designed by
      </MDHeadingSub>
      <MDHeadingSub
        sx={{
          color: `${theme.palette.primary.main}`,
          fontFamily:"GontserratBold",
        }}
      >

Medicdex
      </MDHeadingSub>
    </MDContainer>
  );
};

export default InfoCard;
