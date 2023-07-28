import { Box, Divider, Grid } from "@mui/material";
import React from "react";
import theme from "../../assets/Theme";
import MDButton from "../../components/MDButton";
import MDContainer from "../../components/MDContainer";
import MDHeading from "../../components/MDHeading";
import MDHeadingSub from "../../components/MDHeadingSub";
import MDLabelPrimary from "../../components/MDLabelPrimary";
import MDSearchField from "../../components/MDSearchField";
import DoctorCard from "../../components/sharedcomponents/doctor-card";
import InfoCard from "../../components/sharedcomponents/info-card";
import Navbar from "../../layouts/Navbar";
import LabTable from "./Table/lab-table";
import { useSelector } from "react-redux";
// import MyCustomTable from "./MyCustomTable";

const LabColab = () => {
  const allStaffData = useSelector((state) => state.hospital);

    return (  <>
        <Navbar />
        <Box>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={12} md={8} lg={8} xl={10}>
                    {/* Analytics Section */}
                    <Grid
                        container
                        spacing={2}
                        sx={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        <Grid item xs={12} lg={6}>
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
                                        alignItems: "center ",
                                    }}
                                >
                                    <Box>
                                        <MDHeading
                                            sx={{
                                                color: `${theme.palette.white.main}`,
                                            }}
                                        >
                                            Number of Test
                                        </MDHeading>
                                    </Box>
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
                        
                        <Grid item xs={12} lg={6}>
                            <MDContainer
                                sx={{
                                    background: `${theme.palette.mintcream.main}`,
                                    py:{lg:"42px!important"}
                                }}
                            >
                                <Box
                                    sx={{
                                        // background: `${theme.palette.primary.main}`,
                                        display: "flex",
                                        flex: 1,
                                        justifyContent: "space-between",
                                        alignItems: "center",
                                    }}
                                >
                                    <Box>
                                        <MDHeading>H - Tech Lab</MDHeading>
                                    </Box>
                                    <MDButton sx={{width:"122px!important"}}>Remove</MDButton>
                                </Box>
                            </MDContainer>
                        </Grid>
                    </Grid>
                  

                    {/* Patient Section */}

                    <MDContainer
                        sx={{
                            background: `${theme.palette.mintcream.main}`,
                            mt: 3,
                        }}
                    >
                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: { xs: "column", sm: "row" },
                                justifyContent: { xs: "center", sm: "space-between" },
                                alignItems: { xs: "start", sm: "center" },
                                flex: 1,
                            }}
                        >
                            <MDHeading>Lab Reports</MDHeading>
                            <MDSearchField placeholder="Search" />
                        </Box>
                        <Divider
                            sx={{
                                background: `${theme.palette.secondary.main}`,
                                my: 4,
                                height: "1px",
                            }}
                        ></Divider>
                        <LabTable/>

                        {/* <MyCustomTable/> */}
                    </MDContainer>
                </Grid>
                <Grid item xs={12} sm={12} md={4} lg={4} xl={2}>
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
                    <div style={{display:"flex",flexDirection:"column",flexGrow:1,justifyContent:"space-between"}}>
                    <MDContainer
                        sx={{
                            background: `${theme.palette.mintcream.main}`,
                            mt: {sm:3,lg:4,xl:6},
                        }}
                    >
                        <MDHeadingSub
                            sx={{
                                color: `${theme.palette.black.main}`,
                                mb: 1.6,
                                ml: 1,
                            }}
                        >
                           Active Medical Staff
                        </MDHeadingSub>
                        {allStaffData && allStaffData.data?.length !=0 && allStaffData?.data?.staff?.map((item,index)=>{
                            return(
                                <DoctorCard doctorData={item}/>
                            )
                        })}
                        
                        
                    </MDContainer>
                    <InfoCard />
                    </div>
                </Grid>
            </Grid>
        </Box>
    </>

    );
};

export default LabColab