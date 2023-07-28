import { Box, Divider, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import theme from "../assets/Theme";
import MDBadge from "../components/MDBadge";
import MDButton from "../components/MDButton";
import MDCheckbox from "../components/MDCheckbox";
import MDContainer from "../components/MDContainer";
import MDHeading from "../components/MDHeading";
import MDHeadingSub from "../components/MDHeadingSub";
import MDLabelPrimary from "../components/MDLabelPrimary";
import MDTextField from "../components/MDTextField";
    import PrimaryNavbar from "../layouts/PrimaryNavbar";

const Checkout = () => {
  const navigate=useNavigate()
  const feature = [
    "1. Out Patient Department",
    " 2. Indoor / Ward ",
    "3. Labs Collaborations",
  ];
  return (
    <>
      <PrimaryNavbar />
      <Box>
        <MDContainer
          sx={{
            background: `${theme.palette.mintcream.main}`,
            py:{xl:"8rem!important"},
            px:{xl:"8rem!important"}

          }}
        >
          <Grid container spacing={{ xs: 2, sm: 3, lg: 4,xl:6 }}>
            <Grid item xs={12} sm={12} md={6} lg={7} xl={7}>
              <Grid container spacing={{ xs: 2, sm: 3, lg: 4 }}>
                <Grid item xs={12} sm={12} md={12}>
                  <MDLabelPrimary
                    sx={{
                      color: `${theme.palette.primary.main}`,
                      fontSize: {xs:"2rem", md: "6rem" },
                      mt:{xs:1,md:2}
                    }}
                  >
                    Fill out Information
                  </MDLabelPrimary>
                  <MDLabelPrimary
                    sx={{
                      color: `${theme.palette.gray.main}`,
                      fontSize: { xs:"1rem",md: "2rem" },
                      my:{xs:1,md:3}
                    }}
                  >
                   Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s
                  </MDLabelPrimary>
                </Grid>
                <Grid item xs={12} sm={12} md={12}>
                  <MDTextField placeholder="Email" />
                </Grid>
                <Grid item xs={12} sm={12} md={6}>
                  <MDTextField placeholder="First Name" />
                </Grid>
                <Grid item xs={12} sm={12} md={6}>
                  <MDTextField placeholder="Last Name" />
                </Grid>
                <Grid item xs={12} sm={12} md={12}>
                  <MDTextField placeholder="Address" />
                </Grid>
                <Grid item xs={12} sm={12} md={12}>
                  <MDTextField placeholder=" +92 | Enter Your Phone Number" />
                </Grid>
                <Grid
                  item
                  xs={12}
                  display="flex"
                  justifyContent="end"
                  alignItems="center"
                >
                     <MDButton
                    sx={{
                      background: `${theme.palette.mintcream.main}`,
                      color: `${theme.palette.black.main}`,
                      px: { sm: 9, lg: 12 },
                      mr:1
                    }}
                  >
                   Contact Support
                  </MDButton>
                  <MDButton
                    sx={{
                      background: `${theme.palette.primary.main}`,
                      color: `${theme.palette.mintastic.main}`,
                      px: { sm: 9, lg: 12 },
                    }}
                    onClick={()=>{
                      navigate("/hospital-settings")
                    }}
                  >
                    Proceed
                  </MDButton>
                </Grid>

                {/* { xs: 0, xl: 2, md: 0 }, */}
              </Grid>
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={5} xl={5}>
              <MDContainer
                sx={{
                  background: `${theme.palette.primary.main}`,
                }}
              >
                <MDContainer
                  sx={{
                    background: `${theme.palette.mintastic.main}`,
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      flex: 1,
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Box>
                      <MDHeading
                        sx={{
                          color: `${theme.palette.primary.main}`,
                        }}
                      >
                        Standard
                      </MDHeading>
                      <br></br>
                      <MDHeadingSub
                        sx={{
                          mt: { xs: "-6px", sm: "-16px" },
                          color: `${theme.palette.primary.main}`,
                        }}
                      >
                        Package
                      </MDHeadingSub>
                      <MDBadge
                        sx={{ background: `${theme.palette.lightgreen.main}` }}
                      >
                        Save 20% on yearly
                      </MDBadge>
                    </Box>
                    <Box>
                      <MDHeadingSub
                        sx={{
                          color: `${theme.palette.primary.main}`,
                          fontSize: {
                            xs: "2rem!important",
                            sm: "3rem!important",
                            md: "5rem!important",
                            lg: "6rem!important",
                            xl: "8rem!important",
                          },
                          lineHeight: {
                            xs: "16px",
                            sm: "24px",
                            md: "40px",
                            lg: "48px",
                            xl: "80px",
                          },
                        }}
                      >
                        8000
                      </MDHeadingSub>
                      <MDHeading
                        sx={{
                          color: `${theme.palette.primary.main}`,
                          fontSize: {
                            xs: "1rem!important",
                            sm: "1.4rem!important",
                            md: "2rem!important",
                            lg: "2.6rem!important",
                            xl: "3rem!important",
                          },
                          mt: { sm: "-5px", md: "-6px", xl: "-14px" },
                          width: "100%",
                          textAlign: "end",
                        }}
                      >
                        /Per Month
                      </MDHeading>
                    </Box>
                  </Box>
                </MDContainer>
                <MDHeading
                  sx={{
                    color: `${theme.palette.white.main}`,
                    mt: {xs:1, md: 4 },
                    pl: {xs:1.6,md:3},
                    display: "block",
                  }}
                >
                  Feature Services
                </MDHeading>
                <Divider
                  sx={{
                    background: `${theme.palette.mintastic.main}`,
                    mt: 0.6,
                    height: "1px",
                  }}
                />
                {feature.map((item) => {
                  return (
                    <Box
                      sx={{
                        display: "flex",
                        flex: 1,
                        justifyContent: "space-between",
                        alignItems: "center",
                        mt: {xs:1,md:4},
                      }}
                    >
                      <MDLabelPrimary
                        sx={{
                          color: `${theme.palette.mintastic.main}`,
                          fontSize: { lg: "2.6rem" },
                        }}
                      >
                        {item}
                      </MDLabelPrimary>
                      <MDCheckbox checked />
                    </Box>
                  );
                }, [])}
                <Divider
                  sx={{
                    background: `${theme.palette.mintastic.main}`,
                    mt: {xs:1,md:3,lg:6},
                    height: "1px",
                  }}
                />
                <Box
                 sx={{
                    display: "flex",
                    flex: 1,
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                      <MDHeading
                        sx={{
                          color: `${theme.palette.white.main}`,
                        }}
                      >
                        Total:
                      </MDHeading>
                      <MDHeadingSub
                        sx={{
                          color: `${theme.palette.mintastic.main}`,
                          fontSize: {
                            xs: "2rem!important",
                            sm: "3rem!important",
                            md: "4rem!important",
                            lg: "5rem!important",
                          },
                        }}
                      >
                        8000 PKR
                      </MDHeadingSub>
                    </Box>
              </MDContainer>
            </Grid>
          </Grid>
        </MDContainer>
      </Box>
    </>
  );
};

export default Checkout;
