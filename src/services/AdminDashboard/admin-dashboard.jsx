import { Box, Divider, Grid, ToggleButtonGroup, useMediaQuery } from "@mui/material";
import React, { useEffect, useState } from "react";
import theme from "../../assets/Theme";
import MDBadge from "../../components/MDBadge";
import MDContainer from "../../components/MDContainer";
import MDHeading from "../../components/MDHeading";
import MDHeadingSub from "../../components/MDHeadingSub";
import MDLabel from "../../components/MDLabel";
import MDLabelPrimary from "../../components/MDLabelPrimary";
import MDSearchField from "../../components/MDSearchField";
import MDTable from "../../components/MDTable";
import MDTextField from "../../components/MDTextField";
import MDToggleButton from "../../components/MDToggleButton";
import DoctorCard from "../../components/sharedcomponents/doctor-card";
import InfoCard from "../../components/sharedcomponents/info-card";
import Navbar from "../../layouts/Navbar";
import { useDispatch } from "react-redux";
import { GetStaff, GetTodayPatient } from "./adminDashboardApi/adminDashboardReducer";
import { useSelector } from "react-redux";
import TodayPatientTable from "./Table/today-patient-table";
import moment from "moment";

var rows = [];

const CreateRows = (data) => {
  return data?.map((row) => {
    return {
    //   age: row?.age,
      cnic: row?.cnic,
      fatherName: row?.fatherName,
      gender: `${row?.age}/${row?.gender}`,
      id: row?.id,
      patientName: row?.patientName,
      patientType: row?.patientType,
    };
  });
};

const AdminDashboard = () => {
    const dispatch=useDispatch()
    const todayPatients = useSelector((state) => state.adminDashboard.todayPateint);
    const allStaffData = useSelector((state) => state.hospital.allStaff);
    const [query, setQuery] = useState("");

  
    let filteredRows = [];
    if (todayPatients) {
      filteredRows = todayPatients?.data?.patients;
    }
    if (query) {
      filteredRows = todayPatients?.data?.patients?.filter((item) => {
        if (item?.patientName?.toLowerCase().includes(query.toLowerCase())) {
          return item;
        }
        if (
          item?.fatherName?.toString().toLowerCase().includes(query.toLowerCase())
        ) {
          return item;
        }
      });
    }
  
    rows = CreateRows(filteredRows);


    const [alignment, setAlignment] = React.useState("web");
    const handleChange = (event, newAlignment) => {
        setAlignment(newAlignment);
    };
  

    React.useEffect(() => {
      dispatch(GetStaff());
    }, []);


    useEffect(()=>{
        dispatch(GetTodayPatient())
    },[])

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
                            <Grid item xs={12} sm={12} md={12} lg={12} xl={4}>
                                <MDHeading>Welcome Back Doctor,</MDHeading>
                                <MDLabel>
                                {moment(new Date()).format("dddd MM/DD/YYYY") }
                                </MDLabel>
                            </Grid>
                            <Grid item xs={12} sm={12} md={12} lg={12} xl={8}>
                                <Grid container spacing={2}>
                                    <Grid item xs={12} sm={12} md={12} lg={8}>
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
                                        </Box>
                                    </Grid>
                                    <Grid item xs={12} sm={12} md={12} lg={4}>
                                        {/* <MDTextField /> */}
                                        {/* <MDButton>Export</MDButton> */}
                                        <ToggleButtonGroup
                                            color="primary"
                                            value={alignment}
                                            onChange={handleChange}
                                            exclusive
                                            aria-label="Platform"
                                            sx={{
                                                background: "#F5F5F5",
                                                border: "none",
                                                borderRadius: "50px",
                                                width: "100%",
                                            }}
                                        >
                                            <MDToggleButton value="web">OPD</MDToggleButton>
                                            <MDToggleButton value="android">Indoor</MDToggleButton>
                                        </ToggleButtonGroup>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </MDContainer>
                    {/* Analytics Section */}
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
                                    <Box>
                                        <MDHeading
                                            sx={{
                                                color: `${theme.palette.white.main}`,
                                            }}
                                        >
                                            New Patients
                                        </MDHeading>
                                        <br></br>
                                        <MDHeadingSub>in OPD/ Indoor</MDHeadingSub>
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
                                        {todayPatients?.data?.totalItems ? todayPatients?.data?.totalItems : 0}
                                    </MDHeadingSub>
                                </Box>
                                <Divider
                                    sx={{
                                        background: `${theme.palette.lightgreen.main}`,
                                        my: 1.6,
                                        height: "1px",
                                    }}
                                />
                                <Box
                                    sx={{
                                        display: "flex",
                                        flex: 1,
                                        justifyContent: "space-between",
                                    }}
                                >
                                    <MDHeadingSub
                                        sx={{ color: `${theme.palette.lightgreen.main}` }}
                                    >
                                        Detail Status
                                    </MDHeadingSub>
                                    <Box sx={{display:"flex"}}>
                                        <MDBadge sx={{ mr: 1, whiteSpace: "pre" }}>
                                            OPD | {todayPatients?.data?.opd}
                                        </MDBadge>
                                        <MDBadge sx={{ whiteSpace: "pre" }}>
                                            Indoor | {todayPatients?.data?.ipd}
                                        </MDBadge>
                                    </Box>
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
                                    <Box>
                                        <MDHeading
                                            sx={
                                                {
                                                    // color: `${theme.palette.white.main}`,
                                                }
                                            }
                                        >
                                            Earnings
                                        </MDHeading>
                                        <br></br>
                                        <MDHeadingSub sx={{ color: `${theme.palette.white.main}` }}>
                                            in OPD
                                        </MDHeadingSub>
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
                                        50K*
                                    </MDHeadingSub>
                                </Box>
                                <Divider
                                    sx={{
                                        background: `${theme.palette.lightgreen.main}`,
                                        my: 1.6,
                                        height: "1px",
                                    }}
                                />
                                <Box
                                    sx={{
                                        display: "flex",
                                        flex: 1,
                                        justifyContent: "space-between",
                                    }}
                                >
                                    <MDHeadingSub
                                        sx={{ color: `${theme.palette.lightgreen.main}` }}
                                    >
                                        Detail Status
                                    </MDHeadingSub>
                                    <Box>
                                        <MDBadge
                                            sx={{ background: `${theme.palette.lightgreen.main}` }}
                                        >
                                            Today
                                        </MDBadge>
                                    </Box>
                                </Box>
                            </MDContainer>
                        </Grid>
                        <Grid item xs={12} lg={6} xl={4}>
                            <MDContainer
                                sx={{
                                    background: `${theme.palette.mintcream.main}`,
                                }}
                            >
                                <Box
                                    sx={{
                                        background: `${theme.palette.mintcream.main}`,
                                        display: "flex",
                                        flex: 1,
                                        justifyContent: "space-between",
                                        alignItems: "start",
                                    }}
                                >
                                    <Box>
                                        <MDHeading
                                            sx={{
                                                color: `${theme.palette.primary.main}`,
                                            }}
                                        >
                                            Test
                                        </MDHeading>
                                        <MDHeadingSub sx={{ color: "transparent" }}>
                                            in OPD
                                        </MDHeadingSub>
                                    </Box>
                                    <MDHeadingSub
                                        sx={{
                                            color: `${theme.palette.primary.main}`,
                                            fontSize: {
                                                xs: "2rem!important",
                                                sm: "3rem!important",
                                                md: "3.7rem!important",
                                                lg: "5.8rem!important",
                                            },
                                        }}
                                    >
                                        12*
                                    </MDHeadingSub>
                                </Box>
                                <Divider
                                    sx={{
                                        background: `${theme.palette.lightgreen.main}`,
                                        my: 1.6,
                                        height: "1px",
                                    }}
                                />
                                <Box
                                    sx={{
                                        display: "flex",
                                        flex: 1,
                                        justifyContent: "end",
                                    }}
                                >
                                    <Box>
                                        <MDBadge>Hi-tech</MDBadge>
                                    </Box>
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
                            <MDHeading>Patients</MDHeading>
                            <MDSearchField placeholder="Search" value={query} onChange={(e)=>{
                                setQuery(e.target.value)
                            }}/>
                        </Box>
                        <Divider
                            sx={{
                                background: `${theme.palette.secondary.main}`,
                                my: 4,
                                height: "1px",
                            }}
                        ></Divider>
                        {rows &&  <TodayPatientTable rows={rows}/>}
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

export default AdminDashboard;
