import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import BasicInfo from "./hospitalsettingStap/basic-info";
import MDButton from "../components/MDButton";
import theme from "../assets/Theme";
import StaffInfo from "./hospitalsettingStap/staff-info";
import HopitalLabColab from "./hospitalsettingStap/lab-colab";
import PrimaryNavbar from "../layouts/PrimaryNavbar";
import { useNavigate } from "react-router-dom";

const steps = ["Basic Info", "Staff Detail ", "Lab Collaboration"];



function HospitalSettingStaper() {
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());
const navigate=useNavigate()
  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
    if(activeStep === steps.length - 1){
      navigate("/")
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <>
      <PrimaryNavbar />
      <Box sx={{ width: "100%" }}>
        <Stepper
          activeStep={activeStep}
          sx={{
            "& .MuiStepConnector-line": {
              borderTopWidth: "2px",
            },
            "& .MuiStepConnector-root.Mui-active .MuiStepConnector-line": {
              borderColor: "#165643",
            },
            "& .MuiStepConnector-root.Mui-completed .MuiStepConnector-line": {
              borderColor: "#165643",
            },
            "& .MuiStepLabel-root": {
              flexDirection: "column",
            },
            "& .MuiStepLabel-label": {
              textAlign: "center",
              fontFamily: "GontserratRegular",
              mt: 1,
              [theme.breakpoints.up("lg")]: {
                fontSize: "20px",
              },
              [theme.breakpoints.up("md")]: {
                fontSize: "14px",
              },
              [theme.breakpoints.up("xs")]: {
                fontSize: "12px",
              },
            },
            mt: { xs: 0, md: 4, lg: 8 },
            mb: { xs: 3, md: 6, lg: 10 },
          }}
        >
          {steps.map((label, index) => {
            const stepProps = {};
            const labelProps = {};
            // if (isStepOptional(index)) {
            //   labelProps.optional = (
            //     <Typography variant="caption">Optional</Typography>
            //   );
            // }
            if (isStepSkipped(index)) {
              stepProps.completed = false;
            }
            return (
              <Step key={label} {...stepProps}>
                <StepLabel
                  {...labelProps}
                  sx={{
                    ".MuiStepConnector-root": {
                      top: 0,
                    },
                    ".MuiStepConnector-root span": {
                      borderColor: "transparent",
                    },
                    ".MuiSvgIcon-root": {
                      borderRadius: "50%",
                      [theme.breakpoints.up("lg")]: {
                        width: "80px",
                        height: "80px",
                      },
                      [theme.breakpoints.up("md")]: {
                        width: "60px",
                        height: "60px",
                      },
                      [theme.breakpoints.up("xs")]: {
                        width: "40px",
                        height: "40px",
                      },
                    },
                    ".MuiSvgIcon-root:not(.Mui-completed)": {
                      color: "white",
                    },
                    ".MuiStepIcon-text": {
                      fill: "white",
                      fontWeight: 500,
                      fontSize: "1.4rem",
                    },
                    ".MuiSvgIcon-root.Mui-active": {
                      color: "#165643",
                      marginY: "-3px",
                    },
                    ".Mui-active .MuiStepIcon-text": {
                      fill: "white",
                    },
                    ".MuiSvgIcon-root.Mui-completed": {
                      fill: "#165643",
                    },
                    ".MuiStepIcon-root": {
                      color: "#E6F1F2",
                    },
                  }}
                >
                  {label}
                </StepLabel>
              </Step>
            );
          })}
        </Stepper>
        <div>{activeStep == 0 && <BasicInfo />}
        {activeStep == 1 && <StaffInfo />}
        {activeStep == 2 && <HopitalLabColab />}
        </div>

        {activeStep === steps.length ? (
          <React.Fragment>
            <Typography sx={{ mt: 2, mb: 1 }}>
              All steps completed - you&apos;re finished
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
              <Box sx={{ flex: "1 1 auto" }} />
              <MDButton
                sx={{
                  background: `${theme.palette.white.main}`,
                  color: `${theme.palette.primary.main}`,
                  border: "1px solid #165643",
                  px: { sm: 9, lg: 12 },
                }}
                onClick={handleReset}
              >
                Reset
              </MDButton>
            </Box>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <Box sx={{ display: "flex", justifyContent: "end", py: 4 }}>
              <MDButton
                sx={{
                  background: `${theme.palette.white.main}`,
                  color: `${theme.palette.primary.main}`,
                  border: "1px solid #165643",
                  px: { sm: 9, lg: 12 },
                  mr: 1,
                }}
                disabled={activeStep === 0}
                onClick={handleBack}
              >
                Back
              </MDButton>
              {/* {isStepOptional(activeStep) && (
             <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
               Skip
             </Button>
           )} */}
              <MDButton
                sx={{
                  background: `${theme.palette.primary.main}`,
                  color: `${theme.palette.mintastic.main}`,
                  px: { sm: 9, lg: 12 },
                }}
                onClick={handleNext}
              >
                {activeStep === steps.length - 1 ? "Finish" : "Next"}
              </MDButton>
            </Box>
          </React.Fragment>
        )}
      </Box>
    </>
  );
}

export default HospitalSettingStaper;
