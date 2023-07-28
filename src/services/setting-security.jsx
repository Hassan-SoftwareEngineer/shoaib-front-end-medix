import { Box, Divider, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import theme from "../assets/Theme";
import MDButton from "../components/MDButton";
import MDContainer from "../components/MDContainer";
import MDHeading from "../components/MDHeading";
import MDHeadingSub from "../components/MDHeadingSub";
import MDLabelPrimary from "../components/MDLabelPrimary";
import MDSearchField from "../components/MDSearchField";
import MDTable from "../components/MDTable";
import MDTextField from "../components/MDTextField";
import DoctorCard from "../components/sharedcomponents/doctor-card";
import InfoCard from "../components/sharedcomponents/info-card";
import Navbar from "../layouts/Navbar";

import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const SettingSecurity = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <>
      <Navbar />
     
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12} md={8} lg={9}xl={10}>
        <Box sx={{ width: "100%" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            <Tab
              sx={{ textTransform: "capitalize" }}
              label={<MDHeading>Settings</MDHeading>}
              {...a11yProps(0)}
            />
            <Tab label="Basic Information" {...a11yProps(1)} sx={{fontSize:{xs:".8rem", md:"1.4rem"}}}/>
            <Tab label="Security" {...a11yProps(2)} sx={{fontSize:{xs:".8rem", md:"1.4rem"}}}/>
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
              <MDContainer
                sx={{
                  background: `${theme.palette.mintcream.main}`,
                }}
              >
                <Grid container spacing={{ xs: 2, sm: 3, lg: 4 }}>
                  <Grid item xs={12} sm={12} md={6}>
                    <MDTextField placeholder="Hospital Name" />
                  </Grid>
                  <Grid item xs={12} sm={12} md={6}>
                    <MDTextField placeholder="Owner Name" />
                  </Grid>
                  <Grid item xs={12} sm={12} md={12}>
                    <MDTextField placeholder="Hospital Name" />
                  </Grid>
                  <Grid item xs={12} sm={12} md={6}>
                    <MDTextField placeholder="Landline / Ptcl" type="number" />
                  </Grid>
                  <Grid item xs={12} sm={12} md={6}>
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
                        background: `${theme.palette.primary.main}`,
                        color: `${theme.palette.mintastic.main}`,
                        px: { sm: 9, lg: 12 },
                      }}
                    >
                      Save
                    </MDButton>
                  </Grid>

                  {/* { xs: 0, xl: 2, md: 0 }, */}
                </Grid>
              </MDContainer>
            </Grid>
          </Grid>
        </TabPanel>
        <TabPanel value={value} index={1}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
              <MDContainer
                sx={{
                  background: `${theme.palette.mintcream.main}`,
                }}
              >
                <Grid container spacing={{ xs: 2, sm: 3, lg: 4 }}>
                  <Grid item xs={12} sm={12} md={6}>
                    <MDTextField placeholder="Hospital Name" />
                  </Grid>
                  <Grid item xs={12} sm={12} md={6}>
                    <MDTextField placeholder="Owner Name" />
                  </Grid>
                  <Grid item xs={12} sm={12} md={12}>
                    <MDTextField placeholder="Hospital Name" />
                  </Grid>
                  <Grid item xs={12} sm={12} md={6}>
                    <MDTextField placeholder="Landline / Ptcl" type="number" />
                  </Grid>
                  <Grid item xs={12} sm={12} md={6}>
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
                        background: `${theme.palette.primary.main}`,
                        color: `${theme.palette.mintastic.main}`,
                        px: { sm: 9, lg: 12 },
                      }}
                    >
                      Save
                    </MDButton>
                  </Grid>

                  {/* { xs: 0, xl: 2, md: 0 }, */}
                </Grid>
              </MDContainer>
            </Grid>
          </Grid>
        </TabPanel>
        <TabPanel value={value} index={2}>
          <MDContainer
            sx={{
              background: `${theme.palette.mintcream.main}`,
            }}
          >
            <Grid container spacing={{ xs: 2, sm: 3, lg: 4 }}>
              <Grid item xs={12} sm={12} md={12}>
                <MDTextField placeholder="Current Password" />
              </Grid>
              <Grid item xs={12} sm={12} md={12}>
                <MDTextField placeholder="New Password" />
              </Grid>
              <Grid item xs={12} sm={12} md={12}>
                <MDTextField placeholder="Confirm New Password" />
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
                >
                  Save
                </MDButton>
              </Grid>

              {/* { xs: 0, xl: 2, md: 0 }, */}
            </Grid>
          </MDContainer>
        </TabPanel>
      </Box>
        </Grid>
        <Grid item xs={12} sm={12} md={4} lg={3} xl={2}>
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
            <InfoCard />
        </Grid>

      </Grid>
    </>
  );
};

export default SettingSecurity;
