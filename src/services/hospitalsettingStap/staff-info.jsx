import { Box, Divider, Grid, ToggleButtonGroup } from '@mui/material'
import React, { useEffect, useState } from 'react'
import theme from '../../assets/Theme'
import MDButton from '../../components/MDButton'
import MDContainer from '../../components/MDContainer'
import MDTextField from '../../components/MDTextField'
import MDToggleButton from '../../components/MDToggleButton'
import AddIcon from '@mui/icons-material/Add';
import MDSearchField from '../../components/MDSearchField'
import MDHeading from '../../components/MDHeading'
import MDError from '../../components/MDError'
import * as yup from 'yup';

import { Formik, Form } from 'formik';
import { useDispatch, useSelector } from 'react-redux'
import { CreateStaff, GetStaff } from './hospitalApi/hospitalApiSlice'
import MDTable from './hospitalApi/MDTable'

var rows = [];


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


const StaffInfo = () => {
    const allStaffData = useSelector((state) => state.hospital);
    const [alignment, setAlignment] = React.useState("Doctor");
    const dispatch = useDispatch()
  const [query, setQuery] = useState("");

  let filteredRows = [];

  if (allStaffData) {
      filteredRows = allStaffData?.allStaff?.data?.staff;
  }
  if (query ) {
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

    const handleStaff = (event, newAlignment) => {
        setAlignment(newAlignment);
    };
    React.useEffect(() => {
        dispatch(GetStaff({page:1,pageSize:5}));
      }, []);

    return (
        <>
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
                        initialValues={initialValues}
                        validationSchema={Schema}
                        onSubmit={async (data) => {
                            data.staffType = alignment;
                            await dispatch(CreateStaff(data))
                            await dispatch(GetStaff({page:1,pageSize:5}))
                        }}
                    >
                        {({ handleChange, touched, handleBlur, errors }) => (
                            <Form>
                                <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                                    <Grid container spacing={2}>
                                        <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
                                            <MDTextField placeholder="Name" name="staffName" onChange={handleChange} onBlur={handleBlur} valid={errors.staffName} touch={touched.staffName} />
                                            {errors.staffName && touched.staffName ? <MDError>{errors.staffName}</MDError> : null}

                                        </Grid>
                                        <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
                                            <MDTextField placeholder="Specialization" name="specialization" onChange={handleChange} onBlur={handleBlur} valid={errors.specialization} touch={touched.specialization} />
                                            {errors.specialization && touched.specialization ? <MDError>{errors.specialization}</MDError> : null}

                                        </Grid>{" "}
                                        <Grid item xs={12} sm={6} md={4} lg={3} xl={1}>
                                            <MDTextField placeholder="500" type="number" name="fee" onChange={handleChange} onBlur={handleBlur} valid={errors.fee} touch={touched.fee} />
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
                                            <MDTextField placeholder="Timing" type="time" name="timing" onChange={handleChange} onBlur={handleBlur} valid={errors.timing} touch={touched.timing} />
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
                    <MDHeading>Medical Staff</MDHeading>
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
                {rows && <MDTable rows={rows}/>}
             
            </MDContainer>
        </>
    )
}

export default StaffInfo