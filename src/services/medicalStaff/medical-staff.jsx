import { Box, Divider, Grid, ToggleButtonGroup } from "@mui/material";
import React, { useEffect, useState } from "react";
import theme from "../../assets/Theme";
import MDBadge from "../../components/MDBadge";
import MDButton from "../../components/MDButton";
import MDContainer from "../../components/MDContainer";
import MDHeading from "../../components/MDHeading";
import MDHeadingSub from "../../components/MDHeadingSub";
import MDLabel from "../../components/MDLabel";
import MDLabelPrimary from "../../components/MDLabelPrimary";
import MDSearchField from "../../components/MDSearchField";
import MDTextField from "../../components/MDTextField";
import MDToggle from "../../components/MDToggle";
import AddIcon from '@mui/icons-material/Add';
import DoctorCard from "../../components/sharedcomponents/doctor-card";
import InfoCard from "../../components/sharedcomponents/info-card";
import MDToggleButton from "../../components/MDToggleButton";
import Navbar from "../../layouts/Navbar";
import * as yup from 'yup';
import { Formik, Form } from 'formik';
import MDError from "../../components/MDError";
import { CreateStaff, GetStaff } from "../hospitalsettingStap/hospitalApi/hospitalApiSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import MDTable from "../hospitalsettingStap/hospitalApi/MDTable";
import MDLoader from "../../components/MDLoader";
import HospitalStaffCollapsibleTable from "./StaffTable/StaffCollapsibleTable";

var rows = [];

const col = [
    {
      id: "sr",
      numeric: false,
      disablePad3ding: false,
      label: "Sr",
      type: "text",
      align: "left",
      width: "10%",
    },
    {
      id: "staffName",
      numeric: false,
      disablePadding: false,
      label: "Name",
      type: "text",
      avatar: true,
      align: "left",
      width: "25%",
    },
    {
      id: "specialization",
      numeric: false,
      disablePadding: false,
      label: "Specialization",
      type: "text",
      align: "left",
      width: "25%",
    },
    {
      id: "fee",
      numeric: false,
      disablePadding: false,
      label: "Fee",
      type: "text",
      align: "left",
      width: "15%",
    },
    {
      id: "staffType",
      numeric: false,
      disablePadding: false,
      label: "Staff",
      type: "text",
      align: "left",
      width: "22%",
    },
    {
      id: "timing",
      numeric: false,
      disablePadding: false,
      label: "Timing",
      type: "text",
      align: "left",
      width: "25%",
    },
    {
        id: "phone",
        numeric: false,
        disablePadding: false,
        label: "Phone",
        type: "text",
        align: "left",
        width: "25%",
      },
    {
      id: "actions",
      numeric: false,
      disablePadding: false,
      label: "Actions",
      type: "actions",
      align: "left",
      width: "30%",
    },
  ]

const CreateRows = (data) => {
    return data?.map((row) => {
        return {
            id: row?.id,
            staffName: row?.staffName,
            fee: row?.fee,
            phone: row?.phone,
            specialization: row?.specialization,
            staffType: row?.staffType,
            timing: row?.timing,
        };
    });
};

const MedicalStaff = () => {
    const [alignment, setAlignment] = React.useState("Doctor");
    const [show, setShow] = useState(false)
    const dispatch = useDispatch()
    const allStaffData = useSelector((state) => state.hospital);
    const [page, setPage] = useState(1);
    const [totalCount, setTotalCount] = useState(allStaffData?.allStaff?.data?.totalItems);
    const [pageSize, setpageSize] = useState(5);

    console.log(">>>>>>>>>>>>",allStaffData)
    const [query, setQuery] = useState("");

    let filteredRows = [];

    if (allStaffData) {
        filteredRows = allStaffData?.allStaff?.data?.staff;
    }
    if (query) {
        filteredRows = allStaffData?.allStaff?.data?.staff.filter((item) => {
            if (item.staffName.toLowerCase().includes(query.toLowerCase())) {
                return item
            }
            if (item.specialization.toString().toLowerCase().includes(query.toLowerCase())) {
                return item
            }
        });
    }

    rows = CreateRows(filteredRows);

    const handleStaff = (event, newAlignment) => {
        setAlignment(newAlignment);
    };

    const initialValues = {
        staffName: "",
        specialization: "",
        fee: "",
        phone: "",
        timing: ""
    };

    let Schema = yup.object().shape({
        staffName: yup.string().required("Name reuqired"),
        specialization: yup.string().required("reuqired"),
        fee: yup.string().required("Fee reuqired"),
        phone: yup.string().required("Phone reuqired"),
        timing: yup.string().required("Timing reuqired"),
    });

    useEffect(() => {
        dispatch(GetStaff({page:page,pageSize:pageSize}));
    }, [page,pageSize]);
    
    useEffect(()=>{
        setTotalCount(allStaffData?.allStaff?.data?.totalItems)
    },[allStaffData])

    return (<>
        <MDLoader show={show} />
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
                                            Doctors
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
                                    background: `${theme.palette.secondary.main}`,
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
                                        <MDHeading>Nurses</MDHeading>
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
                                        100
                                    </MDHeadingSub>
                                </Box>
                            </MDContainer>
                        </Grid>
                    </Grid>
                    {/* Hero Section */}
                    <MDContainer
                        sx={{
                            background: `${theme.palette.mintcream.main}`,
                            display: "flex",
                            alignItems: "center",
                            mt: 2
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
                            <Formik
                                key={JSON.stringify(initialValues)}
                                initialValues={initialValues}
                                validationSchema={Schema}
                                onSubmit={async (data, { resetForm }) => {
                                    data.staffType = alignment;
                                    setShow(true)
                                    await dispatch(CreateStaff(data))
                                    await dispatch(GetStaff({page:page,pageSize:pageSize}))
                                    setShow(false)
                                    resetForm({ values: {} });

                                }}
                            >
                                {({ handleChange, touched, handleBlur, errors, values }) => (
                                    <Form>
                                        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                                            <Grid container spacing={2}>
                                                <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
                                                    <MDTextField placeholder="Name" name="staffName" onChange={handleChange} onBlur={handleBlur} valid={errors.staffName} touch={touched.staffName} value={values.staffName} />
                                                    {errors.staffName && touched.staffName ? <MDError>{errors.staffName}</MDError> : null}

                                                </Grid>
                                                <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
                                                    <MDTextField placeholder="Specialization" name="specialization" onChange={handleChange} onBlur={handleBlur} valid={errors.specialization} touch={touched.specialization} />
                                                    {errors.specialization && touched.specialization ? <MDError>{errors.specialization}</MDError> : null}

                                                </Grid>{" "}
                                                <Grid item xs={12} sm={6} md={4} lg={3} xl={1}>
                                                    <MDTextField placeholder="500" name="fee" type="number" onChange={handleChange} onBlur={handleBlur} valid={errors.fee} touch={touched.fee} />
                                                    {errors.fee && touched.fee ? <MDError>{errors.fee}</MDError> : null}

                                                </Grid>{" "}
                                                <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
                                                    <ToggleButtonGroup
                                                        color="primary"
                                                        value={alignment}
                                                        onChange={handleStaff}
                                                        exclusive
                                                        aria-label="Platform"
                                                        sx={{
                                                            background: "#F5F5F5",
                                                            border: "none",
                                                            borderRadius: "50px",
                                                            width: "100%",
                                                        }}
                                                    >
                                                        <MDToggleButton value="Receptionist">Recep</MDToggleButton>
                                                        <MDToggleButton value="Doctor">Doctor</MDToggleButton>
                                                    </ToggleButtonGroup>
                                                </Grid>
                                                <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
                                                    <MDTextField placeholder="Phone" type="number" name="phone" onChange={handleChange} onBlur={handleBlur} valid={errors.phone} touch={touched.phone} />
                                                    {errors.phone && touched.phone ? <MDError>{errors.phone}</MDError> : null}

                                                </Grid>{" "}
                                                <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
                                                    <MDTextField type="time" placeholder="Timing" name="timing" onChange={handleChange} onBlur={handleBlur} valid={errors.timing} touch={touched.timing} />
                                                    {errors.timing && touched.timing ? <MDError>{errors.timing}</MDError> : null}

                                                </Grid>{" "}
                                                <Grid item xs={12} sm={12} md={12} lg={3} xl={1}>
                                                    <MDButton sx={{ width: { xs: "100%", lg: "80px!important" } }} type="submit"><AddIcon sx={{ fontSize: "28px", width: "80px!important" }} /></MDButton>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Form>
                                )}
                            </Formik>

                        </Grid>
                    </MDContainer>

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
                            <MDHeading>Staff Management</MDHeading>
                            <MDSearchField placeholder="Search" value={query} onChange={(e) => {
                                setQuery(e.target.value)
                            }} />
                        </Box>
                        <Divider
                            sx={{
                                background: `${theme.palette.secondary.main}`,
                                my: 4,
                                height: "1px",
                            }}
                        ></Divider>
                        {
                rows &&
                <HospitalStaffCollapsibleTable searchQuery={query} searchHandle={setQuery} rows={rows} headerCells={col} pageNo={page} setPageNo={setPage} pagelength={pageSize} setpagelength={setpageSize} totalElements={totalCount} setTotalElements={setTotalCount} />
              }
                       

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
                    <div style={{ display: "flex", flexDirection: "column", flexGrow: 1, justifyContent: "space-between" }}>
                        <MDContainer
                            sx={{
                                background: `${theme.palette.mintcream.main}`,
                                mt: { sm: 3, lg: 4, xl: 6 },
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
                            {allStaffData && allStaffData.data?.length != 0 && allStaffData?.allStaff?.data?.staff?.map((item, index) => {
                                return (
                                    <DoctorCard doctorData={item} />
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

export default MedicalStaff;
