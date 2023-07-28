import { Box, Divider, Grid, MenuItem, Select, ToggleButtonGroup } from "@mui/material";
import React, { useEffect, useState } from "react";
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
import IndoorTable from "./Table/indoor-table";
import * as yup from "yup";
import AddIcon from "@mui/icons-material/Add";
import jsPDF from "jspdf";

import { Formik, Form } from "formik";
import { useDispatch, useSelector } from "react-redux";
import {
  CreatePatient,
  GetPatient,
  GetStaff,
} from "../hospitalsettingStap/hospitalApi/hospitalApiSlice";
import MDError from "../../components/MDError";
import moment from "moment";
import { GetIPDPatientWithRange } from "./indoorAPi/ipdReducer";
import Swal from 'sweetalert2'
import IpdCollapsibleTable from "./InDoorTable/IndoorCollapsibleTable";
import MDToggleButton from "../../components/MDToggleButton";

var rows = [];

const columns = [
  { field: "id", headerName: "Sr#", width: 120 },
  {
    field: "patientName",
    headerName: "Name",
    minWidth: 150,
    flex: 1,
    editable: true,
  },
  {
    field: "fatherName",
    headerName: "Father Name",
    minWidth: 150,
    flex: 1,
    editable: true,
  },
  {
    field: "gender",
    headerName: "Age/Sex",
    editable: true,
    width: 150,
    minWidth: 50,
  },
  // {
  //   field: "age",
  //   headerName: "Age",
  //   width: 120,
  //   editable: true,
  // },
  // {
  //   field: "cnic",
  //   headerName: "CNIC",
  //   width: 250,
  //   editable: true,
  // },
  {
    field: "patientType",
    headerName: "Patient Type",
    width: 200,
    editable: true,
  },
  {
    field: "mr",
    headerName: "MR#",
    width: 200,
    editable: true,
  },
  {
    field: "action",
    headerName: "Action",
    width: 180,
    sortable: false,
    disableClickEventBubbling: true,
  },
];

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
    id: "patientName",
    numeric: false,
    disablePadding: false,
    label: "Name",
    type: "text",
    avatar: true,
    align: "left",
    width: "25%",
  },
  {
    id: "fatherName",
    numeric: false,
    disablePadding: false,
    label: "Father Name",
    type: "text",
    align: "left",
    width: "25%",
  },
  {
    id: "Age",
    numeric: false,
    disablePadding: false,
    label: "Age/Sex",
    type: "text",
    align: "left",
    width: "15%",
  },
  {
    id: "patientType",
    numeric: false,
    disablePadding: false,
    label: "Patient Type",
    type: "text",
    align: "left",
    width: "22%",
  },
  {
    id: "mr",
    numeric: false,
    disablePadding: false,
    label: "MR#",
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
      age: row?.age,
      cnic: row?.cnic,
      fatherName: row?.fatherName,
      gender: `${row?.age}/${row?.gender}`,
      id: row?.id,
      patientName: row?.patientName,
      patientType: row?.patientType,
      mr: row?.mrNumber,
      allData: row
    };
  });
};

const Indoor = () => {
  const dispatch = useDispatch();
  const allPatientData = useSelector((state) => state?.hospital?.patient);
  const allDoctor = useSelector((state) => state?.hospital?.allDoctor);
  const [query, setQuery] = useState("");
  const [dateFrom, setDateFrom] = useState(new Date());
  const [dateTo, setDateTo] = useState(new Date());
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(allPatientData?.data?.totalItems);
  const [pageSize, setpageSize] = useState(5);
  const [selectedDoctor, setSelectedDoctor] = useState();
  const [alignment, setAlignment] = React.useState("M");


  let filteredRows = [];
  if (allPatientData) {
    filteredRows = allPatientData?.data?.Patients;
  }

  if (query) {
    filteredRows = allPatientData?.data?.Patients?.filter((item) => {
      if (item.patientName?.toLowerCase().includes(query.toLowerCase())) {
        return item;
      }
      if (
        item.fatherName?.toString().toLowerCase().includes(query.toLowerCase())
      ) {
        return item;
      }
    });
  }

  rows = CreateRows(filteredRows);

  const initialValues = {
    patientName: "",
    fatherName: "",
    age: "",
    doctor: "",
    mr: "",
    admission: "",
    discharge: "",
  };
  let Schema = yup.object().shape({
    patientName: yup.string().required("Name reuqired"),
    fatherName: yup.string().required("Name reuqired"),
    age: yup.string().required("Age reuqired"),
    doctor: yup.string().required("Doctor Name reuqired"),
    mr: yup.string().required("MR No reuqired"),
    admission: yup.string().required("Admission Date reuqired"),
    discharge: yup.string().required("Discharge Date reuqired"),
  });
  const allStaffData = useSelector((state) => state.hospital.allStaff);



  const handleStaff = (event, newAlignment) => {
    setAlignment(newAlignment);
  };

  useEffect(() => {
    dispatch(GetStaff({page:1,pageSize:5}));
  }, []);

  useEffect(()=>{
    setTotalCount(allPatientData?.data?.totalItems)
  },[allPatientData])

  useEffect(() => {
    dispatch(GetPatient({page:page,pageSize:pageSize}));
  }, [page,pageSize]);

  const Export = () => {
    // Retrieve data from API

    const doc = new jsPDF({
      orientation: "landscape",
      unit: "pt",
      format: "a4",
    });

    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");

    const margin = 10;
    const srWidth = 20;
    const nameWidth = 80;
    const parentNameWidth = 120;
    const genderWidth = 60;
    const docotrWidth = 100;
    const mrWidth = 100;
    const admittedWidth = 100;
    const dischargedWidth = 100;

    const bottomMargin = doc.internal.pageSize.height - margin;

    let y = margin + 20; // adjust y to add space between header and first row

    doc.text("ID", 10, margin);
    doc.text("Patient Name", 70, margin);
    doc.text("Father Name", 200, margin);
    doc.text("Gender", 320, margin);
    doc.text("Doctor", 400, margin);
    doc.text("Mr#", 500, margin);
    doc.text("Admitted On", 600, margin);
    doc.text("Discharged On", 700, margin);



    dispatch(GetIPDPatientWithRange({ from: moment(dateFrom).format("DD-MM-YYYY"), to: moment(dateTo).format("DD-MM-YYYY") })).then((res) => {
      console.log(">>>>>>>>>>>>>>>>", res?.payload?.data?.patients)
      if (res?.payload?.data?.patients?.length == 0) {
        Swal.fire({
          icon: 'info',
          title: 'No Record Found',
          showConfirmButton: false,
          timer: 1500
        })
        return
      }
      res?.payload?.data?.patients?.forEach((item) => {
        // Split the name and parent name into multiple lines if they are too long
        const srLines = doc.splitTextToSize(item.id, srWidth);
        const nameLines = doc.splitTextToSize(item.patientName, nameWidth);
        const parentNameLines = doc.splitTextToSize(item.fatherName, parentNameWidth);
        const genderLines = doc.splitTextToSize(item.gender, genderWidth);
        const docotrLines = doc.splitTextToSize(item.staffEntities[0]?.staffName, docotrWidth);
        const mrLines = doc.splitTextToSize(item.mr, mrWidth);
        const dmittedLines = doc.splitTextToSize(item.admittedOn, admittedWidth);
        const dischargeLines = doc.splitTextToSize(item.dischargedOn, dischargedWidth);





        // Calculate the maximum height of the name and parent name blocks
        const srLinesHight = srLines.length * 15;
        const nameHeight = nameLines.length * 15;
        const parentNameHeight = parentNameLines.length * 15;
        const genderHeight = genderLines.length * 15;
        const doctorHeight = docotrLines.length * 15;
        const mrHeight = mrLines.length * 15;
        const dmittedHeight = dmittedLines.length * 15;
        const dischargedHeight = dischargeLines.length * 15;





        const maxHeight = Math.max(nameHeight, parentNameHeight, srLinesHight,genderHeight,doctorHeight,mrHeight,dmittedHeight,dischargedHeight);


        // Split the doctor name into multiple lines if it is too long
        // const doctorLines = doc.splitTextToSize(item.age, doctorWidth);

        // Calculate the maximum height of the doctor name block
        // const doctorHeight = doctorLines.length * 15;

        // Check if the current row will exceed the bottom margin
        if (y + maxHeight + margin > bottomMargin) {
          doc.addPage();
          y = margin + 20; // reset y and add space for header on new page
        }

        // Draw the row
        // doc.text(item.id.toString(), 10, y + maxHeight);
        srLines.forEach((line, index) => {
          doc.text(line, 10, y + index * 15);
        });
        nameLines.forEach((line, index) => {
          doc.text(line, 70, y + index * 15);
        });
        parentNameLines.forEach((line, index) => {
          doc.text(line, 200, y + index * 15);
        });
        genderLines.forEach((line, index) => {
          doc.text(line, 320, y + index * 15);
        });
        docotrLines.forEach((line, index) => {
          doc.text(line, 400, y + index * 15);
        });
        mrLines.forEach((line, index) => {
          doc.text(line, 500, y + index * 15);
        });
        dmittedLines.forEach((line, index) => {
          doc.text(line, 600, y + index * 15);
        });
        dischargeLines.forEach((line, index) => {
          doc.text(line, 700, y + index * 15);
        });
       

        
        // Increase the y-position for the next row
        y += maxHeight + margin;
      });
      doc.save(`Indoor-Patient${dateFrom}--${dateTo}.pdf`);
    })

  };


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
                <Grid item xs={12} sm={12} md={12} lg={12} xl={5}>
                  <MDContainer
                    sx={{
                      background: `${theme.palette.primary.main}`,
                      mr: { xs: 0, xl: 7 },
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
                            color: `${theme.palette.mintastic.main}`,
                          }}
                        >
                          Patients
                        </MDHeading>
                        <MDHeadingSub
                          sx={{
                            color: `${theme.palette.white.main}`,
                            mt: "-10px",
                          }}
                        >
                          in Ward/ Inoor
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
                        3k*
                      </MDHeadingSub>
                    </Box>
                  </MDContainer>
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12} xl={7}>
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
                        <MDTextField
                          type="date"
                          value={dateFrom}
                          onChange={(e) => {
                            setDateFrom(e.target.value);
                          }}
                        />
                        <spna
                          style={{ display: "inline-block", margin: "0 20px" }}
                        >
                          To
                        </spna>
                        <MDTextField
                          type="date"
                          value={dateTo}
                          onChange={(e) => {
                            setDateTo(e.target.value);
                          }}
                        />
                        <MDButton
                          sx={{
                            ml: { xs: 0, sm: 2 },
                            mt: { xs: 2, sm: 0 },
                            mr: { xs: 0, xl: 2, md: 0 },
                          }}
                          onClick={Export}
                        >
                          Export
                        </MDButton>
                      </Box>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </MDContainer>
            <MDContainer
              sx={{
                background: `${theme.palette.mintcream.main}`,
                display: "flex",
                alignItems: "center",
                mt: 2,
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
                  initialValues={initialValues}
                  validationSchema={Schema}
                  onSubmit={async (data) => {
                    const { admission, age, discharge, fatherName, mr, patientName, sex } = data
                    const body = {
                      patientName: patientName,
                      fatherName: fatherName,
                      cnic: "",
                      age: age,
                      gender: alignment,
                      patientType: "ipd",
                      discharged: discharge,
                      admittedOn: admission,
                      mrNumber: mr,
                      staffEntities: [selectedDoctor],
                    };
                    // console.log("submitted data", body);
                    await dispatch(CreatePatient(body))
                    await dispatch(GetPatient({page:page,pageSize:pageSize}));

                  }}
                >
                  {({ handleChange, touched, handleBlur, errors }) => (
                    <Form>
                      <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                        <Grid container spacing={2}>
                          <Grid item xs={12} sm={6} md={4} lg={3} xl={3}>
                            <MDTextField
                              placeholder="Patient Name"
                              name="patientName"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              valid={errors.patientName}
                              touch={touched.patientName}
                            />
                            {errors.patientName && touched.patientName ? (
                              <MDError>{errors.patientName}</MDError>
                            ) : null}
                          </Grid>
                          <Grid item xs={12} sm={6} md={4} lg={3} xl={3}>
                            <MDTextField
                              placeholder="Father Name"
                              name="fatherName"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              valid={errors.fatherName}
                              touch={touched.fatherName}
                            />
                            {errors.fatherName && touched.fatherName ? (
                              <MDError>{errors.fatherName}</MDError>
                            ) : null}
                          </Grid>
                          <Grid item xs={12} sm={6} md={4} lg={3} xl={1}>
                            <MDTextField
                              placeholder="Age"
                              name="age"
                              type="number"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              valid={errors.age}
                              touch={touched.age}
                            />
                            {errors.age && touched.age ? (
                              <MDError>{errors.age}</MDError>
                            ) : null}
                          </Grid>
                          <Grid item xs={12} sm={6} md={4} lg={3} xl={1}>
                          
                             <ToggleButtonGroup
                  color="primary"
                  value={alignment}
                  onChange={handleStaff}
                  name="sex"
                  onBlur={handleBlur}
                  valid={errors.sex}
                  touch={touched.sex}
                  exclusive
                  aria-label="Platform"
                  sx={{
                    background: "#F5F5F5",
                    border: "none",
                    borderRadius: "50px",
                    width: "100%",
                  }}
                >
                  <MDToggleButton value="M">Male</MDToggleButton>
                  <MDToggleButton value="F">Female</MDToggleButton>
                </ToggleButtonGroup>
                            {errors.sex && touched.sex ? (
                              <MDError>{errors.sex}</MDError>
                            ) : null}
                          </Grid>
                          <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
                            {/* <MDTextField
                              placeholder="Doctor"
                              name="doctor"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              valid={errors.doctor}
                              touch={touched.doctor}
                            /> */}
                             <Select
          // value={doctor}
          // onChange={handleDoctor}
          onChange={handleChange}
          onBlur={handleBlur}
          valid={errors.doctor}
          touch={touched.doctor}
          name="doctor"
          displayEmpty
          inputProps={{ 'aria-label': 'Without label' }}
          sx={{
            width:"100%",
            fontFamily: theme.fonts.primary,
            color:theme.palette.black.main,
            border: `2px solid transparent`,
            letterSpacing: "1px",
            fontSize: "1.6rem",
            boxShadow: "none",
            background:"#fff",
            borderRadius:"50px",
            "& .MuiSelect-outlined": {
              padding: "10px"
            },
            ".MuiOutlinedInput-notchedOutline": { border: 0 },
            "&.MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline":
              {
                border: 0,
              },
              "&.MuiOutlinedInput-root:active .MuiOutlinedInput-notchedOutline":
              {
                border: `2px solid ${theme.palette.primary.main}`,

              },
            "&.MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
              {
                border: 0,
              },
          }}

        >
          <MenuItem value="-1">
            <em>Select Doctor</em>
          </MenuItem>
          {
            allDoctor && allDoctor?.doctors?.length != 0 && allDoctor?.doctors?.map((item)=>{
              return(
                <MenuItem value={item?.staffName} onClick={()=>{setSelectedDoctor(item)}}>{`${item?.staffName}/${item?.specialization}`}</MenuItem>
              )
            })
          }
         
        </Select>
                            {errors.doctor && touched.doctor ? (
                              <MDError>{errors.doctor}</MDError>
                            ) : null}
                          </Grid>
                          <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
                            <MDTextField
                              placeholder="MR#"
                              name="mr"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              valid={errors.mr}
                              touch={touched.mr}
                              type="number"
                            />
                            {errors.mr && touched.mr ? (
                              <MDError>{errors.mr}</MDError>
                            ) : null}
                          </Grid>
                          <Grid item xs={12} sm={6} lg={3} xl={2}>
                            <MDHeadingSub
                              sx={{
                                color: `${theme.palette.primary.main}`,
                                fontSize: { md: "1.8rem" },
                                height: "100%",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                              }}
                            >
                              Date of admission
                            </MDHeadingSub>
                          </Grid>
                          <Grid item xs={12} sm={6} lg={3} xl={3}>
                            <MDTextField
                              name="admission"
                              type="date"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              valid={errors.admission}
                              touch={touched.admission}
                            />
                            {errors.admission && touched.admission ? (
                              <MDError>{errors.admission}</MDError>
                            ) : null}
                          </Grid>
                          <Grid item xs={12} sm={6} lg={3} xl={2}>
                            <MDHeadingSub
                              sx={{
                                color: `${theme.palette.primary.main}`,
                                fontSize: { md: "1.8rem" },
                                height: "100%",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                              }}
                            >
                              Date of Discharge
                            </MDHeadingSub>
                          </Grid>
                          <Grid item xs={12} sm={6} lg={3} xl={3}>
                            <MDTextField
                              type="date"
                              name="discharge"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              valid={errors.discharge}
                              touch={touched.discharge}
                            />
                            {errors.discharge && touched.discharge ? (
                              <MDError>{errors.discharge}</MDError>
                            ) : null}
                          </Grid>
                          <Grid item xs={12} sm={12} md={12} lg={3} xl={2}>
                            <MDButton
                              sx={{
                                width: { xs: "100%", lg: "80px!important" },
                              }}
                              type="submit"
                            >
                              <AddIcon
                                sx={{
                                  fontSize: "28px",
                                  width: "80px!important",
                                }}
                              />
                            </MDButton>
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
                <MDHeading>
                  Patients
                  <MDHeadingSub
                    sx={{
                      color: `${theme.palette.gray.main}`,
                      display: "inline-block",
                      ml: { xs: 1, md: 3 },
                    }}
                  >
                    in Ward/ Indoor
                  </MDHeadingSub>
                </MDHeading>
                <MDSearchField
                  placeholder="Search"
                  value={query}
                  onChange={(e) => {
                    setQuery(e.target.value);
                  }}
                />
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
                <IpdCollapsibleTable searchQuery={query} searchHandle={setQuery} rows={rows} headerCells={col} pageNo={page} setPageNo={setPage} pagelength={pageSize} setpagelength={setpageSize} totalElements={totalCount} setTotalElements={setTotalCount} />
              }

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
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                flexGrow: 1,
                justifyContent: "space-between",
              }}
            >
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
                {allStaffData &&
                  allStaffData.data?.length != 0 &&
                  allStaffData?.data?.staff?.map((item, index) => {
                    return <DoctorCard doctorData={item} />;
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

export default Indoor;
