import { Box, Divider, Grid } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import theme from "../../assets/Theme";
import MDButton from "../../components/MDButton";
import MDContainer from "../../components/MDContainer";
import MDHeading from "../../components/MDHeading";
import MDHeadingSub from "../../components/MDHeadingSub";
import MDLabelPrimary from "../../components/MDLabelPrimary";
import MDSearchField from "../../components/MDSearchField";
import MDTextField from "../../components/MDTextField";
import DoctorCard from "../../components/sharedcomponents/doctor-card";
import InfoCard from "../../components/sharedcomponents/info-card";
import Navbar from "../../layouts/Navbar";
import IndoorTable from "./Table/all-patient-table";
import { useSelector } from "react-redux";
import { GetStaff } from "../hospitalsettingStap/hospitalApi/hospitalApiSlice";
import { useDispatch } from "react-redux";
// import MyCustomTable from "./MyCustomTable";

const AllPatient = () => {
  const navigate = useNavigate();
  const dispatch=useDispatch()
  const allStaffData = useSelector((state) => state.hospital.allStaff);

  React.useEffect(() => {
    dispatch(GetStaff({page:1,pageSize:5}));
  }, []);
  return (
    <>
      <Navbar />
      <Box>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12} md={8} lg={9} xl={10}>
            {/* Hero Section */}
            <MDContainer
              sx={{
                background: `${theme.palette.mintcream.main}`,
                display: "flex",
                alignItems: "center",
                p: { sm: "2!important", xl: "0!important" },
                flex: 1,
                width: "100%",
              }}
            >
              <Grid
                container
                spacing={2}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Grid item xs={12} sm={12} md={12} lg={4} xl={3}>
                  <MDContainer
                    sx={{
                      background: `${theme.palette.mintcream.main}`,
                      mr: { xs: 0, xl: 7 },
                    }}
                  >
                    <MDHeading
                      sx={{
                        color: `${theme.palette.primary.main}`,
                      }}
                    >
                      Davis John
                    </MDHeading>
                    <MDHeadingSub
                      sx={{
                        color: `${theme.palette.secondary.main}`,
                        mt: "-10px",
                      }}
                    >
                      in Ward
                    </MDHeadingSub>
                  </MDContainer>
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={8} xl={9}>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={12} md={12} lg={12}>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          flexDirection: { xs: "column", sm: "row" },
                        }}
                      >
                        <MDTextField type="date" />
                        <spna
                          style={{ display: "inline-block", margin: "0 20px" }}
                        >
                          To
                        </spna>
                        <MDTextField type="date" />
                        <MDButton
                          sx={{
                            ml: { xs: 0, sm: 2 },
                            mt: { xs: 2, sm: 0 },
                            mr: { xs: 0, xl: 2, md: 0 },
                          }}
                        >
                          Export
                        </MDButton>
                      </Box>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </MDContainer>

            {/* Patient Section */}
            <Grid
              container
              spacing={2}
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                mt: 3,
              }}
            >
              <Grid item xs={12} lg={6} xl={4}>
                <MDContainer
                  sx={{
                    background: `${theme.palette.primary.main}`,
                  }}
                >
                  <Box
                    sx={{
                      background: `${theme.palette.primary.main}`,
                      display: "flex",
                      flex: 1,
                      justifyContent: "space-between",
                      alignItems: "start",
                    }}
                  >
                    <MDHeading
                      sx={{
                        color: `${theme.palette.mintastic.main}`,
                      }}
                    >
                      Check Up
                    </MDHeading>
                    <MDHeadingSub
                      sx={{
                        color: `${theme.palette.white.main}`,
                        fontSize: {
                          xs: "2rem!important",
                          sm: "3rem!important",
                          md: "3.7rem!important",
                          lg: "5.8rem!important",
                        },
                      }}
                    >
                      20
                    </MDHeadingSub>
                  </Box>
                </MDContainer>
              </Grid>
              <Grid item xs={12} lg={6} xl={4}>
                <MDContainer
                  sx={{
                    background: `${theme.palette.secondary.main}`,
                  }}
                >
                  <Box
                    sx={{
                      // background: `${theme.palette.primary.main}`,
                      display: "flex",
                      flex: 1,
                      justifyContent: "space-between",
                      alignItems: "start",
                    }}
                  >
                    <MDHeading
                      sx={
                        {
                          // color: `${theme.palette.white.main}`,
                        }
                      }
                    >
                      Reports
                    </MDHeading>

                    <MDHeadingSub
                      sx={{
                        color: `${theme.palette.white.main}`,
                        fontSize: {
                          xs: "2rem!important",
                          sm: "3rem!important",
                          md: "3.7rem!important",
                          lg: "5.8rem!important",
                        },
                      }}
                    >
                      5
                    </MDHeadingSub>
                  </Box>
                </MDContainer>
              </Grid>
              <Grid item xs={12} lg={6} xl={4}>
                <MDContainer
                  sx={{
                    background: `${theme.palette.mintcream.main}`,
                  }}
                >
                  <MDHeadingSub
                    sx={{
                      color: `${theme.palette.primary.main}`,
                      fontSize: {
                        xs: "2rem!important",
                        // sm: "3rem!important",
                        // md: "3.7rem!important",
                        // lg: "5.8rem!important",
                      },
                      textAlign: "center",
                      m: "auto",
                      p: { lg: "20px", xl: "28px" },
                    }}
                  >
                    Request Test
                  </MDHeadingSub>
                </MDContainer>
              </Grid>
            </Grid>

            {/*------------*/}

            <MDContainer
              sx={{
                background: `${theme.palette.mintcream.main}`,
                mt: 3,
              }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6} md={4} xl={1}>
                  <MDButton
                    onClick={() => {
                      navigate("/opd");
                    }}
                  >
                    Back
                  </MDButton>
                </Grid>
                <Grid
                  item
                  xs={12}
                  sm={6}
                  md={4}
                  xl={3}
                  display="flex"
                  alignItems="center"
                >
                  <MDHeadingSub
                    sx={{
                      color: `${theme.palette.gray.main}`,
                      display: "inline-block",
                      alignItems: "center",
                      ml: { xs: 1, md: 3 },
                    }}
                  >
                    MR#
                  </MDHeadingSub>
                  <MDHeadingSub
                    sx={{
                      color: `${theme.palette.black.main}`,
                      display: "inline-block",
                      ml: { xs: 1, md: 2 },
                    }}
                  >
                    123 - 3355 - 567
                  </MDHeadingSub>
                </Grid>
                <Grid
                  item
                  xs={12}
                  sm={6}
                  md={4}
                  xl={3}
                  display="flex"
                  alignItems="center"
                >
                  <MDHeadingSub
                    sx={{
                      color: `${theme.palette.gray.main}`,
                      display: "inline-block",
                      ml: { xs: 1, md: 2 },
                    }}
                  >
                    Age/ Gender:
                  </MDHeadingSub>
                  <MDHeadingSub
                    sx={{
                      color: `${theme.palette.black.main}`,
                      display: "inline-block",
                      ml: { xs: 1, md: 2 },
                    }}
                  >
                    16/Male
                  </MDHeadingSub>
                </Grid>
                <Grid
                  item
                  xs={12}
                  sm={6}
                  md={6}
                  xl={3}
                  display="flex"
                  alignItems="center"
                >
                  <MDHeadingSub
                    sx={{
                      color: `${theme.palette.gray.main}`,
                      display: "inline-block",
                      ml: { xs: 1, md: 2 },
                    }}
                  >
                    NIC:
                  </MDHeadingSub>
                  <MDHeadingSub
                    sx={{
                      color: `${theme.palette.black.main}`,
                      display: "inline-block",
                      ml: { xs: 1, md: 1 },
                      letterSpacing: "3px",
                      whiteSpace: "nowrap",
                    }}
                  >
                    33201 - 1234556 - 6
                  </MDHeadingSub>
                </Grid>
                <Grid
                  item
                  xs={12}
                  sm={6}
                  md={6}
                  xl={2}
                  display="flex"
                  sx={{
                    justifyContent: { md: "start", xl: "end" },
                  }}
                >
                  <MDButton>Edit</MDButton>
                </Grid>
              </Grid>

              <Divider
                sx={{
                  background: `${theme.palette.secondary.main}`,
                  my: 4,
                  height: "1px",
                }}
              ></Divider>
              <IndoorTable />

              {/* <MyCustomTable/> */}
            </MDContainer>
          </Grid>
          <Grid
            item
            xs={12}
            sm={12}
            md={4}
            lg={3}
            xl={2}
            display="flex"
            flexDirection="column"
            // justifyContent="space-between"
          >
            <MDContainer
              sx={{
                background: `${theme.palette.primary.main}`,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
              }}
            >
              <MDLabelPrimary>Unveil new features</MDLabelPrimary>
              <MDHeading
                sx={{
                  color: `${theme.palette.mintastic.main}`,
                  fontSize: { xs: "3rem!important", md: "4rem!important" },
                }}
              >
                Upgrade Now
              </MDHeading>
            </MDContainer>
            <MDContainer
              sx={{
                background: `${theme.palette.mintcream.main}`,
                mt: 2,
              }}
            >
              <MDHeadingSub
                sx={{
                  color: `${theme.palette.black.main}`,
                  mb: 1.6,
                  ml: 1,
                }}
              >
               Active  Medical Staff
              </MDHeadingSub>
              {allStaffData && allStaffData.length !=0 && allStaffData?.map((item)=>{
                            return(
                                <DoctorCard doctorData={item}/>
                            )
                        })}
            </MDContainer>
            <InfoCard />
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default AllPatient;
