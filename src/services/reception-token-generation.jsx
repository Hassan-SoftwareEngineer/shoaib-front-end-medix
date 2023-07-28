import { Box, Divider, FormControl, Grid, MenuItem, Select, ToggleButtonGroup } from "@mui/material";
import React, { useEffect, useState } from "react";
import theme from "../assets/Theme";
import MDButton from "../components/MDButton";
import MDContainer from "../components/MDContainer";
import MDHeading from "../components/MDHeading";
import MDHeadingSub from "../components/MDHeadingSub";
import MDLabelPrimary from "../components/MDLabelPrimary";
import MDSearchField from "../components/MDSearchField";
import MDTextField from "../components/MDTextField";
import MDToggleButton from "../components/MDToggleButton";
import InfoCard from "../components/sharedcomponents/info-card";
import Navbar from "../layouts/Navbar";
import { useDispatch, useSelector } from "react-redux";
import {
  CreatePatient,
  GenerateNewInvoice,
  GetAllDoctor,
  GetCurrentInvoice,
} from "./hospitalsettingStap/hospitalApi/hospitalApiSlice";
import ReceptionTable from "./reception/reception-table";
import { MyRecepitDesign } from "./reception/recepit-design";
import { PDFDownloadLink } from "@react-pdf/renderer";
import MDLoader from "../components/MDLoader";
import { GetOPDPatient } from "./HMOpd/OpdAPi/opdReducer";
import { toast } from 'react-toastify'

var rows = [];

const CreateRows = (data) => {
  return data?.map((row) => {
    return {
      age: `${row?.age}/${row?.gender}`,
      cnic: row?.cnic,
      fatherName: row?.fatherName,
      // gender: `${row?.age}/${row?.gender}`,
      id: row?.id,
      patientName: row?.patientName,
      patientType: row?.patientType,
    };
  });
};

const ReceptionTokenGeneration = () => {
  const opdPateint = useSelector((state) => state?.opdPateint?.opdPateint);
  const currentInvoice = useSelector((state) => state?.hospital?.currentInvoice?.data);
  const allDoctor = useSelector((state) => state?.hospital?.allDoctor);


  console.log(">>>>>>>>>>>>>>", allDoctor)

  const dispatch = useDispatch();
  const [nic, setNic] = useState();
  const [age, setAge] = useState();
  const [query, setQuery] = useState("");
  const [doctor, setDoctor] = useState("-1");
  const [fatherName, setFatherName] = useState();
  const [patientName, setPatientName] = useState();
  const [alignment, setAlignment] = React.useState("M");
  const [selectedDoctor, setSelectedDoctor] = useState();
  const [showPrintBtn, setShowPrintBtn] = useState(false);


  const [show, setShow] = useState(false)

  const handleDoctor = (event) => {
    setDoctor(event.target.value);
  };

  let filteredRows = [];
  if (opdPateint) {
    filteredRows = opdPateint?.Patients;
  }

  if (query) {
    filteredRows = opdPateint?.Patients?.filter((item) => {
      if (item.patientName.toLowerCase().includes(query.toLowerCase())) {
        return item;
      }
      if (
        item.fatherName.toString().toLowerCase().includes(query.toLowerCase())
      ) {
        return item;
      }
    });
  }

  console.log("selected data", doctor);

  rows = CreateRows(filteredRows);

  const handleChange = (event, newAlignment) => {
    setAlignment(newAlignment);
  };

  const handlePatientSubmit = async () => {
    if (!patientName || doctor == "-1") {
      toast.error("Please Add Patient Name and Doctor");
      return
    }
    setShow(true)
    const body = {
      patientName: patientName,
      fatherName: fatherName,
      cnic: nic,
      age: age,
      gender: alignment,
      patientType: "opd",
      discharged: "",
      admittedOn: "",
      mrNumber: "",
      staffEntities: [selectedDoctor]
    };
    await dispatch(CreatePatient(body))
    await dispatch(GenerateNewInvoice({ "amount": currentInvoice }))
    await dispatch(GetOPDPatient({ page: 1, pageSize: 1000 }));
    setShow(false)
    setShowPrintBtn(true)
  };

  const OnPrintClear = async () => {
    await new Promise(r => setTimeout(r, 3000));
    setNic("");
    setAge("");
    setDoctor("");
    setFatherName("");
    setPatientName("");
    setAlignment("M");
    setDoctor("-1");
    setSelectedDoctor();
    setShowPrintBtn(false)
    await dispatch(GetCurrentInvoice())
  }
  useEffect(() => {
    dispatch(GetOPDPatient({ page: 1, pageSize: 1000 }));
    dispatch(GetCurrentInvoice())
    dispatch(GetAllDoctor())
  }, []);
  return (
    <>
      <MDLoader show={show} />

      <Navbar />
      <Box>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12} md={12} xl={10}>
            <Grid container spacing={{ xs: 2 }}>
              <Grid item xs={12} sm={12} md={12} lg={6}>
                <MDContainer
                  sx={{
                    background: `${theme.palette.mintcream.main}`,
                  }}
                >
                  <Grid container spacing={{ xs: 2, sm: 3, lg: 4 }}>
                    <Grid item xs={12} sm={12} md={12}>
                      <Box>
                        <MDHeading
                          sx={{
                            color: `${theme.palette.primary.main}`,
                          }}
                        >
                          New Patient
                        </MDHeading>
                        <MDHeadingSub
                          sx={{
                            color: `${theme.palette.lightgreen.main}`,
                            mt: "-10px",
                          }}
                        >
                          in OPD
                        </MDHeadingSub>
                        <Divider
                          sx={{
                            background: `${theme.palette.lightgreen.main}`,
                            mt: 0.6,
                            height: "1px",
                          }}
                        />
                      </Box>
                    </Grid>
                    <Grid item xs={12} sm={12} md={12}>
                      <MDTextField
                        placeholder="Patient Name"
                        value={patientName}
                        onChange={(e) => {
                          setPatientName(e.target.value);
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={12}>
                      <MDTextField
                        placeholder="Father Name"
                        value={fatherName}
                        onChange={(e) => {
                          setFatherName(e.target.value);
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={12}>
                      <MDTextField
                        placeholder="NIC (Optional)"
                        type="number"
                        value={nic}
                        onChange={(e) => {
                          setNic(e.target.value);
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={6}>
                      <MDTextField
                        placeholder="Age"
                        type="number"
                        value={age}
                        onChange={(e) => {
                          setAge(e.target.value);
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={6}>
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
                        <MDToggleButton value="M">Male</MDToggleButton>
                        <MDToggleButton value="F">Female</MDToggleButton>
                      </ToggleButtonGroup>
                    </Grid>
                    <Grid item xs={12} sm={12} md={6}>

                      <Select
                        value={doctor}
                        onChange={handleDoctor}
                        placeholder="Select Doctor"
                        displayEmpty
                        inputProps={{ 'aria-label': 'Without label' }}
                        sx={{
                          width: "100%",
                          fontFamily: theme.fonts.primary,
                          color: theme.palette.black.main,
                          border: `2px solid transparent`,
                          letterSpacing: "1px",
                          fontSize: "1.6rem",
                          boxShadow: "none",
                          background: "#fff",
                          borderRadius: "50px",
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
                          allDoctor && allDoctor?.doctors?.length != 0 && allDoctor?.doctors?.map((item) => {
                            return (
                              <MenuItem value={item?.staffName} onClick={() => { setSelectedDoctor(item) }}>{`${item?.staffName}/${item?.specialization}`}</MenuItem>
                            )
                          })
                        }

                      </Select>

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
                          background: `${theme.palette.primary.main}`,
                          color: `${theme.palette.mintastic.main}`,
                          px: { sm: 9, lg: 12 },
                        }}
                        onClick={handlePatientSubmit}
                      >
                        Save
                      </MDButton>
                      {showPrintBtn &&

                        <PDFDownloadLink
                          onClick={OnPrintClear}
                          document={
                            <MyRecepitDesign
                              invoice={currentInvoice}
                              date={new Date().toLocaleString("en-US")}
                              hospitalName={localStorage.getItem("hopitalName") ? localStorage.getItem("hopitalName") : "Hospital"}
                              token={"12"}
                              sr={"1"}
                              doctor={doctor}
                              fee={selectedDoctor?.fee}
                              specialization={selectedDoctor?.specialization}
                              totalFee={selectedDoctor?.fee}
                              age={age}
                              fullname={patientName + " " + fatherName}
                            />
                          }
                          fileName={patientName + ".pdf"}
                        >
                          {({ blob, url, loading, error }) =>
                            loading ? (
                              'Loading document...'
                            ) : (
                              <MDButton
                                onClick={() => {
                                  window.open(url, '_blank');
                                  // const newWindow = window.open(url, '_blank');
                                  // if (newWindow) {
                                  //   newWindow.onload = () => {
                                  //     newWindow.print();
                                  //   };
                                  // }
                                }}
                              >
                                Print
                              </MDButton>
                            )
                          }
                        </PDFDownloadLink>
                      }
                    </Grid>
                  </Grid>
                </MDContainer>
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
                <MDContainer
                  sx={{
                    background: `${theme.palette.primary.main}`,
                  }}
                >
                  <Box
                    sx={{
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
                        Invoice
                      </MDHeading>
                      <br></br>
                      <MDHeadingSub
                        sx={{
                          mt: { xs: "-6px", sm: "-16px" },
                          color: `${theme.palette.lightgreen.main}`,
                        }}
                      >
                        {new Date().toLocaleString("en-US")}
                      </MDHeadingSub>
                    </Box>
                    <Box>
                      <MDHeadingSub
                        sx={{
                          color: `${theme.palette.white.main}`,
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
                        000{currentInvoice}
                      </MDHeadingSub>
                      <MDHeadingSub
                        sx={{
                          color: `${theme.palette.lightgreen.main}`,
                          width: "100%",
                          textAlign: "end",
                          mt: { sm: "-5px", md: "-6px", xl: "-4px" },
                        }}
                      >
                        Token#
                      </MDHeadingSub>
                    </Box>
                  </Box>
                  <Box sx={{ textAlign: "center" }}>
                    <MDHeading
                      sx={{
                        color: `${theme.palette.mintastic.main}`,
                        mt: { xs: 1, md: 4 },
                        display: "inline-block",
                        borderBottom: "1px solid #AFFFE0",
                        px: 4,
                      }}
                    >
                      {localStorage.getItem("hopitalName") ? localStorage.getItem("hopitalName") : "Hospital"}
                    </MDHeading>
                  </Box>
                  <Grid
                    container
                    spacing={{ xs: 2 }}
                    sx={{ py: { xs: 1, md: 3 } }}
                  >
                    <Grid item xs={4} md={6} lg={6} xl={3}>
                      <MDHeadingSub
                        sx={{
                          color: `${theme.palette.lightgreen.main}`,
                          fontSize: { lg: "22px" },
                        }}
                      >
                        Name
                      </MDHeadingSub>
                    </Grid>
                    <Grid item xs={8} md={6} lg={6} xl={3}>
                      <MDHeadingSub
                        sx={{
                          color: `${theme.palette.white.main}`,
                          fontSize: { lg: "22px" },
                          textAlign: { xs: "start", md: "center" },
                        }}
                      >
                        {patientName && patientName + " "}
                        {fatherName && fatherName}
                        {!patientName && !fatherName && "name"}
                      </MDHeadingSub>
                    </Grid>
                    <Grid item xs={4} md={6} lg={6} xl={3}>
                      {" "}
                      <MDHeadingSub
                        sx={{
                          color: `${theme.palette.lightgreen.main}`,
                          fontSize: { lg: "22px" },
                        }}
                      >
                        Age/ Gender:
                      </MDHeadingSub>
                    </Grid>
                    <Grid item xs={8} md={6} lg={6} xl={3}>
                      <MDHeadingSub
                        sx={{
                          color: `${theme.palette.white.main}`,
                          fontSize: { lg: "22px" },
                          textAlign: { xs: "start", md: "center" },
                        }}
                      >
                        {age}/{alignment}
                      </MDHeadingSub>
                    </Grid>
                  </Grid>
                  <Divider
                    sx={{
                      background: `${theme.palette.mintastic.main}`,
                      mt: { xs: 1 },
                      height: "1px",
                    }}
                  />
                  <Grid container spacing={{ xs: 2 }} sx={{ py: 3 }}>
                    <Grid item xs={3}>
                      <MDHeadingSub
                        sx={{
                          color: `${theme.palette.lightgreen.main}`,
                          fontSize: { lg: "22px" },
                        }}
                      >
                        Sr#
                      </MDHeadingSub>
                    </Grid>
                    <Grid item xs={3}>
                      {" "}
                      <MDHeadingSub
                        sx={{
                          color: `${theme.palette.lightgreen.main}`,
                          fontSize: { lg: "22px" },
                        }}
                      >
                        Doctor
                      </MDHeadingSub>
                    </Grid>
                    <Grid item xs={3}>
                      {" "}
                      <MDHeadingSub
                        sx={{
                          color: `${theme.palette.lightgreen.main}`,
                          fontSize: { lg: "22px" },
                        }}
                      >
                        Specialization
                      </MDHeadingSub>
                    </Grid>
                    <Grid item xs={3}>
                      <MDHeadingSub
                        sx={{
                          color: `${theme.palette.lightgreen.main}`,
                          fontSize: { lg: "22px" },
                          textAlign: "center",
                        }}
                      >
                        Fee
                      </MDHeadingSub>
                    </Grid>
                  </Grid>
                  <Divider
                    sx={{
                      background: `${theme.palette.mintastic.main}`,
                      height: "1px",
                    }}
                  />
                  <Grid container spacing={{ xs: 2 }} sx={{ py: 3 }}>
                    <Grid item xs={3}>
                      <MDHeadingSub
                        sx={{
                          color: `${theme.palette.white.main}`,
                          fontSize: { lg: "22px" },
                        }}
                      >
                        1.
                      </MDHeadingSub>
                    </Grid>
                    <Grid item xs={3}>
                      <MDHeadingSub
                        sx={{
                          color: `${theme.palette.white.main}`,
                          fontSize: { lg: "22px" },
                        }}
                      >
                        {selectedDoctor?.staffName}
                      </MDHeadingSub>
                    </Grid>
                    <Grid item xs={3}>
                      <MDHeadingSub
                        sx={{
                          color: `${theme.palette.white.main}`,
                          fontSize: { lg: "22px" },
                        }}
                      >
                        {selectedDoctor?.specialization}
                      </MDHeadingSub>
                    </Grid>
                    <Grid item xs={3}>
                      <MDHeadingSub
                        sx={{
                          color: `${theme.palette.white.main}`,
                          fontSize: { lg: "22px" },
                          textAlign: "center",
                        }}
                      >
                        {selectedDoctor?.fee}
                      </MDHeadingSub>
                    </Grid>
                  </Grid>

                  <Divider
                    sx={{
                      background: `${theme.palette.mintastic.main}`,
                      mt: { xs: 1, md: 3, lg: 6 },
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
                      {selectedDoctor?.fee}PKR
                    </MDHeadingSub>
                  </Box>
                </MDContainer>
              </Grid>
            </Grid>
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
              {rows && <ReceptionTable rows={rows} />}

              {/* <MyCustomTable/> */}
            </MDContainer>
          </Grid>
          <Grid
            item
            xs={12}
            sm={12}
            md={12}
            xl={2}
            display="flex"
            flexDirection="column"
            flexGrow={1}
            justifyContent="space-between"
          >
            <MDContainer
              sx={{
                background: `${theme.palette.primary.main}`,
                display: "flex",
                justifyContent: "space-between",
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
            <InfoCard />
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default ReceptionTokenGeneration;
