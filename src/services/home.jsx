import { Box, Grid } from "@mui/material";
import React from "react";
import MDButton from "../components/MDButton";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import MDHeading from "../components/MDHeading";
import MDLabelPrimary from "../components/MDLabelPrimary";
import theme from "../assets/Theme";
import MDBadgePrimary from "../components/MDBadgePrimary";

import EasyToUseImg from "../assets/images/Frame.png";
import Lab from "../assets/images/Lab.png";
import MegaSearch from "../assets/images/MegaSearch.png";
import MDContainer from "../components/MDContainer";
import MDCheckBoxPrimary from "../components/MDCheckBoxPrimary";
import MDHeadingSub from "../components/MDHeadingSub";
import MDBadge from "../components/MDBadge";

const Home = () => {
  const feature = [
    "1. Out Patient Department",
    "2. Lab Management System",
    "3. Indoor / Ward ",
    "4. Labs Collaborations",
    "5. Out Patient Department",
  ];
  return (
    <>
      <Box className="hero-sec">
        <Box
          sx={{
            position: "absolute",
            bottom: 20,
            px: { xs: 2, md: 6, lg: 10 },
          }}
        >
          <Box>
            <Grid
              container
              direction={{ xs: "column-reverse", lg: "row" }}
              justifyContent="center"
              alignItems="center"
            >
              <Grid item xs={12} sm={12} md={6} lg={7}>
                <MDHeading
                  sx={{
                    fontSize: { lg: "6rem!important", xl: "10rem!important" },
                    color: "#fff",
                  }}
                >
                  All your medical
                </MDHeading>
              </Grid>
              <Grid
                item
                xs={12}
                sm={12}
                md={6}
                lg={5}
                sx={{ textAlign: "end" }}
              >
                <MDLabelPrimary
                  sx={{
                    color: `${theme.palette.gray.main}`,
                    fontSize: { xs: "1rem", md: "2rem" },
                    textAlign: "left",
                    lineHeight: { xs: "1rem", md: "3rem" },
                  }}
                >
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever since the 1500s
                </MDLabelPrimary>
              </Grid>
            </Grid>

            <MDLabelPrimary
              sx={{
                color: `${theme.palette.white.main}`,
                fontSize: {
                  xs: "2rem!important",
                  sm: "3.3rem!important",
                  md: "3.7rem!important",
                  lg: "6rem!important",
                  xl: "10rem!important",
                },
                textAlign: { xs: "center", lg: "left" },
              }}
            >
              management at one place
            </MDLabelPrimary>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: { xs: "column", sm: "row" },
            }}
          >
            <MDButton
              sx={{
                width: { sx: "100%", sm: "auto!important" },
                padding: ".6rem 5rem!important",
                background: "transparent!important",
                border: "1px solid #B5F5FE",
                color: "#fff",
                fontSize: { lg: "24px" },
                mt: { xs: 1 },
              }}
            >
              Request A Demo
            </MDButton>
            <MDButton
              sx={{
                width: "auto!important",
                padding: ".6rem 2rem!important",
                mx: { sm: 3, md: 8 },
                background: "transparent!important",
                color: "rgba(255, 255, 255, 0.5)",
                fontSize: { lg: "24px" },
              }}
            >
              Learn More
            </MDButton>
            <div
              style={{
                borderTop: "1px solid #B5F5FE",
                height: "1px",
                width: "100%",
              }}
            ></div>
            <Box sx={{ display: { xs: "none", sm: "flex" } }}>
              <MDButton
                sx={{
                  background: "transparent!important",
                  border: "1px solid #B5F5FE",
                  width: "58px!important",
                  minWidth: "58px!important",
                  height: "58px!important",
                  mx: 3,
                }}
              >
                <KeyboardArrowLeftIcon
                  sx={{ fontSize: "44px", color: "rgba(255, 255, 255, 0.5)" }}
                />
              </MDButton>
              <MDButton
                sx={{
                  background: "transparent!important",
                  border: "1px solid #B5F5FE",
                  width: "58px!important",
                  minWidth: "58px!important",
                  height: "58px!important",
                }}
              >
                <KeyboardArrowRightIcon
                  sx={{ fontSize: "44px", color: "rgba(255, 255, 255, 0.5)" }}
                />
              </MDButton>
            </Box>
          </Box>
        </Box>
      </Box>
      <Box
        sx={{
          my: {
            xs: "2rem",
            sm: "3.3rem",
            md: "3.7rem",
            lg: "6rem",
            xl: "9rem",
          },
        }}
      >
        <MDLabelPrimary
          sx={{
            color: `${theme.palette.black.main}`,
            fontSize: {
              xs: "2rem!important",
              sm: "3.3rem!important",
              md: "3.7rem!important",
              lg: "5rem!important",
              xl: "7rem!important",
            },
            textAlign: { xs: "center" },
            width: { xs: "90%", md: "70%" },
            mx: "auto",
          }}
        >
          We help professional to reach at the root of a disease &nbsp;
          <MDHeading
            sx={{
              fontSize: {
                xs: "2rem!important",
                sm: "3.3rem!important",
                md: "3.7rem!important",
                lg: "5rem!important",
                xl: "7rem!important",
              },
            }}
          >
            quickly with
          </MDHeading>
        </MDLabelPrimary>
      </Box>
      <Box
        sx={{
          px: { xs: 2, md: 6, lg: 10 },
        }}
      >
        <Grid container spacing={{ xs: 2, sm: 4 }}>
          <Grid item xs={12} sm={12} md={6} lg={6} xl={7}>
            <Box>
              <MDBadgePrimary>1</MDBadgePrimary>
              <MDHeading
                sx={{
                  fontSize: {
                    xs: "2rem!important",
                    sm: "3.3rem!important",
                    md: "3.7rem!important",
                    lg: "5rem!important",
                    xl: "7rem!important",
                  },
                }}
              >
                &nbsp; Easy to Use
              </MDHeading>
            </Box>
            <MDLabelPrimary
              sx={{
                color: `${theme.palette.gray.main}`,
                fontSize: { xs: "1rem", md: "2rem", lg: "3rem" },
                my: { xs: 1, md: 3 },
                lineHeight: {
                  xs: "2rem!important",
                  md: "3rem!important",
                  lg: "4.4rem!important",
                },
              }}
            >
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book.
            </MDLabelPrimary>
          </Grid>
          <Grid
            item
            xs={12}
            sm={12}
            md={6}
            lg={6}
            xl={5}
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <img
              src={EasyToUseImg}
              loading="lazy"
              alt="Easy To Use Image"
              className="img-responsive"
            />
          </Grid>
        </Grid>
        <Grid
          container
          spacing={{ xs: 2, sm: 4 }}
          direction={{ xs: "column-reverse", md: "row" }}
          sx={{ my: { xs: 1, md: 6, lf: 14, xl: 24 } }}
        >
          <Grid
            item
            xs={12}
            sm={12}
            md={6}
            lg={6}
            xl={5}
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <img
              src={Lab}
              loading="lazy"
              alt="Easy To Use Image"
              className="img-responsive"
            />
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6} xl={7}>
            <Box>
              <MDBadgePrimary>2</MDBadgePrimary>
              <MDHeading
                sx={{
                  fontSize: {
                    xs: "2rem!important",
                    sm: "3.3rem!important",
                    md: "3.7rem!important",
                    lg: "5rem!important",
                    xl: "7rem!important",
                  },
                }}
              >
                &nbsp; Lab Collaborations
              </MDHeading>
            </Box>
            <MDLabelPrimary
              sx={{
                color: `${theme.palette.gray.main}`,
                fontSize: { xs: "1rem", md: "2rem", lg: "2.3rem" },
                my: { xs: 1, md: 3 },
                lineHeight: {
                  xs: "2rem!important",
                  md: "3rem!important",
                  lg: "3.4rem!important",
                },
              }}
            >
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book.
            </MDLabelPrimary>
          </Grid>
        </Grid>
        <Grid
          container
          spacing={{ xs: 2, sm: 4 }}
          sx={{ mt: { xs: "0", sm: "40px" } }}
        >
          <Grid item xs={12} sm={12} md={6} lg={6} xl={7}>
            <Box>
              <MDBadgePrimary>3</MDBadgePrimary>
              <MDHeading
                sx={{
                  fontSize: {
                    xs: "2rem!important",
                    sm: "3.3rem!important",
                    md: "3.7rem!important",
                    lg: "5rem!important",
                    xl: "7rem!important",
                  },
                }}
              >
                &nbsp; Mega Search
              </MDHeading>
            </Box>
            <MDLabelPrimary
              sx={{
                color: `${theme.palette.gray.main}`,
                fontSize: { xs: "1rem", md: "2rem", lg: "3rem" },
                my: { xs: 1, md: 3 },
                lineHeight: {
                  xs: "2rem!important",
                  md: "3rem!important",
                  lg: "4.4rem!important",
                },
              }}
            >
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book.
            </MDLabelPrimary>
          </Grid>
          <Grid
            item
            xs={12}
            sm={12}
            md={6}
            lg={6}
            xl={5}
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <img
              src={MegaSearch}
              loading="lazy"
              alt="Easy To Use Image"
              className="img-responsive"
            />
          </Grid>
        </Grid>
      </Box>
      <Box
        sx={{
          px: { xs: 2, md: 6, lg: 10 },
          py: { xs: 2, md: 6, lg: 10 },
          background: `${theme.palette.secondary.main}`,
          my: { xs: 2, md: 4, lg: 6, xl: 10 },
        }}
      >
        <MDLabelPrimary
          sx={{
            color: `${theme.palette.black.main}`,
            fontSize: {
              xs: "2rem!important",
              sm: "3.3rem!important",
              md: "3.7rem!important",
              lg: "5rem!important",
              xl: "7rem!important",
            },
            textAlign: { xs: "center" },
            width: { xs: "90%", md: "70%" },
            mx: "auto",
          }}
        >
          Affordable & Transparent &nbsp;
          <MDHeading
            sx={{
              fontSize: {
                xs: "2rem!important",
                sm: "3.3rem!important",
                md: "3.7rem!important",
                lg: "5rem!important",
                xl: "7rem!important",
              },
            }}
          >
            Pricing
          </MDHeading>
        </MDLabelPrimary>
        <MDContainer
          sx={{
            background: `${theme.palette.white.main}`,
          }}
        >
          <Grid container spacing={{ xs: 2, sm: 4 }}>
            <Grid item xs={12} lg={6}>
              <Box
                sx={{
                  px: { xs: 2, md: 4, lg: 7 },
                }}
              >
                <MDHeading
                  sx={{
                    fontSize: {
                      xs: "2rem!important",
                      sm: "3.3rem!important",
                      md: "3.7rem!important",
                      lg: "5rem!important",
                      xl: "7rem!important",
                    },
                    color: `${theme.palette.black.main}`,
                  }}
                >
                  Features
                </MDHeading>
                {feature.map((item) => {
                  return (
                    <Box
                      sx={{
                        display: "flex",
                        flex: 1,
                        justifyContent: "space-between",
                        alignItems: "center",
                        mt: { xs: 1, md: 4 },
                      }}
                    >
                      <MDLabelPrimary
                        sx={{
                          color: `${theme.palette.primary.main}`,
                          fontSize: { lg: "2.6rem" },
                        }}
                      >
                        <del>{item}</del>
                      </MDLabelPrimary>
                      <MDCheckBoxPrimary checked />
                    </Box>
                  );
                })}
              </Box>
            </Grid>
            <Grid item xs={12} lg={6}>
              <MDContainer
                sx={{
                  background: `${theme.palette.primary.main}`,
                }}
              >
                <MDContainer
                  sx={{
                    background: `${theme.palette.mintastic.main}`,
                    border: `1px solid ${theme.palette.mintastic.main}`,
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
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "start",
                        alignItems: "center",
                      }}
                    >
                      <MDCheckBoxPrimary sx={{ mr: { xs: 0, xl: 4 } }} />
                      <MDHeadingSub
                        sx={{
                          color: `${theme.palette.primary.main}`,
                          fontSize: {
                            xs: "2rem!important",
                            sm: "3rem!important",
                            md: "4rem!important",
                            lg: "5rem!important",
                            xl: "8rem!important",
                          },
                          lineHeight: {
                            xs: "16px",
                            sm: "24px",
                            md: "40px",
                            lg: "48px",
                            xl: "80px",
                          },
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        8000
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
                          }}
                        >
                          /Per Month
                        </MDHeading>
                      </MDHeadingSub>
                    </Box>
                    <Box
                     sx={{
                      textAlign:"end"
                      }}
                    >
                      <MDHeading
                        sx={{
                          color: `${theme.palette.primary.main}`,
                        }}
                      >
                        Standard
                      </MDHeading>
                      <br></br>

                      <MDBadge
                        sx={{ background: `${theme.palette.lightgreen.main}` }}
                      >
                        Save 20% on yearly
                      </MDBadge>
                    </Box>
                  </Box>
                </MDContainer>
                <MDContainer
                  sx={{
                    background: `${theme.palette.primary.main}`,
                    border: `1px solid ${theme.palette.mintastic.main}`,
                    my: 3,
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
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "start",
                        alignItems: "center",
                      }}
                    >
                      <MDCheckBoxPrimary sx={{ mr: { xs: 0, xl: 4 } }} />
                      <MDHeadingSub
                        sx={{
                          color: `${theme.palette.mintastic.main}`,
                          fontSize: {
                            xs: "2rem!important",
                            sm: "3rem!important",
                            md: "4rem!important",
                            lg: "5rem!important",
                            xl: "8rem!important",
                          },
                          lineHeight: {
                            xs: "16px",
                            sm: "24px",
                            md: "40px",
                            lg: "48px",
                            xl: "80px",
                          },
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        1200
                        <MDHeading
                          sx={{
                            color: `${theme.palette.mintastic.main}`,
                            fontSize: {
                              xs: "1rem!important",
                              sm: "1.4rem!important",
                              md: "2rem!important",
                              lg: "2.6rem!important",
                              xl: "3rem!important",
                            },
                          }}
                        >
                          /Per Month
                        </MDHeading>
                      </MDHeadingSub>
                    </Box>
                    <Box
                    sx={{
                    textAlign:"end"
                    }}
                    >
                      <MDHeading
                        sx={{
                          color: `${theme.palette.mintastic.main}`,
                        }}
                      >
                        Basic
                      </MDHeading>
                      <br></br>

                      <MDBadge
                        sx={{ background: `${theme.palette.lightgreen.main}` }}
                      >
                        Save 20% on yearly
                      </MDBadge>
                    </Box>
                  </Box>
                </MDContainer>
                <MDContainer
                  sx={{
                    background: `${theme.palette.mintastic.main}`,
                    border: `1px solid ${theme.palette.mintastic.main}`,
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
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "start",
                        alignItems: "center",
                      }}
                    >
                      <MDCheckBoxPrimary sx={{ mr: { xs: 0, xl: 4 } }} />
                      <MDHeadingSub
                        sx={{
                          color: `${theme.palette.primary.main}`,
                          fontSize: {
                            xs: "2rem!important",
                            sm: "3rem!important",
                            md: "4rem!important",
                            lg: "5rem!important",
                            xl: "8rem!important",
                          },
                          lineHeight: {
                            xs: "16px",
                            sm: "24px",
                            md: "40px",
                            lg: "48px",
                            xl: "80px",
                          },
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        4000
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
                          }}
                        >
                          /Per Month
                        </MDHeading>
                      </MDHeadingSub>
                    </Box>
                    <Box sx={{
                    textAlign:"end"
                    }}>
                      <MDHeading
                        sx={{
                          color: `${theme.palette.primary.main}`,
                        }}
                      >
                        Premium
                      </MDHeading>
                      <br></br>

                      <MDBadge
                        sx={{ background: `${theme.palette.lightgreen.main}` }}
                      >
                        Save 20% on yearly
                      </MDBadge>
                    </Box>
                  </Box>
                </MDContainer>
              </MDContainer>
            </Grid>
          </Grid>
        </MDContainer>
      </Box>
    </>
  );
};

export default Home;
