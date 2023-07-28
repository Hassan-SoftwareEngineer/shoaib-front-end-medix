import { Box, Divider, Grid } from "@mui/material";
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
import OpdTable from "./Table/opd-table";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { GetStaff } from "../hospitalsettingStap/hospitalApi/hospitalApiSlice";
import { GetOPDPatient, GetOPDPatientWithRange } from "./OpdAPi/opdReducer";
import moment from "moment";
import jsPDF from "jspdf";
import Swal from 'sweetalert2'
import CollapsibleTable from "../HMIndoor/DeviceTable/DTCollapsibleTable";

var rows = []

const CreateRows = (data) => {
  return data?.map((row) => {
    return {
      age: row.age,
      cnic: row?.cnic,
      fatherName: row?.fatherName,
      gender: `${row?.age}/${row?.gender}`,
      sex:row.gender,
      id: row?.id,
      patientName: row?.patientName,
      patientType: row?.patientType,
    };
  });
};

const col=[
  {
    id: "sr",
    numeric: false,
    disablePadding: false,
    label: "ID",
    type: "text",
    align: "left",
    width: "5%",
},
{
    id: "patientName",
    numeric: false,
    disablePadding: false,
    label: "Name",
    type: "text",
    avatar: true,
    align: "left",
    width: "20%",
},
{
    id: "fatherName",
    numeric: false,
    disablePadding: false,
    label: "Father Name",
    type: "text",
    align: "left",
    width: "20%",
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
    width: "20%",
},
{
  id: "cnic",
  numeric: false,
  disablePadding: false,
  label: "NIC",
  type: "text",
  align: "left",
  width: "20%",
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


const DoctorOPD = () => {
  const dispatch = useDispatch();
  const allStaffData = useSelector((state) => state.hospital.allStaff);
  const opdPateint = useSelector((state) => state?.opdPateint?.opdPateint);
  const [query, setQuery] = useState("");
  const [dateFrom, setDateFrom] = useState(new Date());
  const [dateTo, setDateTo] = useState(new Date());
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(opdPateint?.totalItems);
  const [pageSize, setpageSize] = useState(5);
  console.log("this is the OPD Pateint", opdPateint?.totalItems);


  let filteredRows = [];
  if (opdPateint) {
    filteredRows = opdPateint?.Patients;
  }

  if (query) {
    filteredRows = opdPateint?.Patients?.filter((item) => {
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


  React.useEffect(() => {
    dispatch(GetStaff({page:1,pageSize:5}));
    dispatch(GetOPDPatient());
  }, []);

  React.useEffect(() => {
    dispatch(GetOPDPatient({page:page,pageSize:pageSize}));
  }, [page,pageSize]);


  React.useEffect(() => {
    setTotalCount(opdPateint?.totalItems)
  }, [opdPateint]);
  
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

    dispatch(
      GetOPDPatientWithRange({
        from: moment(dateFrom).format("DD-MM-YYYY"),
        to: moment(dateTo).format("DD-MM-YYYY"),
      })
    ).then((res) => {
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

        // Split the doctor name into multiple lines if it is too long
        const maxHeight = Math.max(nameHeight, parentNameHeight, srLinesHight,genderHeight,doctorHeight,mrHeight,dmittedHeight,dischargedHeight);
       

        // Check if the current row will exceed the bottom margin
        if (y + maxHeight + margin > bottomMargin) {
          doc.addPage();
          y = margin + 20; // reset y and add space for header on new page
        }

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
      doc.save(`OPD-Patient-${dateFrom}--${dateTo}.pdf`);
    });
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
                        5k*
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
                    in OPD
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
      <CollapsibleTable  searchQuery={query}  searchHandle={setQuery}  rows={rows} headerCells={col}  pageNo={page} setPageNo={setPage} pagelength={pageSize} setpagelength={setpageSize} totalElements={totalCount} setTotalElements={setTotalCount} />

                // <OpdTable rows={rows} />

              }

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

export default DoctorOPD;
