import { Box, Divider, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import theme from "../../assets/Theme";
import MDButton from "../../components/MDButton";
import MDContainer from "../../components/MDContainer";
import MDTextField from "../../components/MDTextField";
import * as yup from 'yup';
import { Formik, Form } from 'formik';
import axios from "axios";
import MDError from "../../components/MDError";
import { useDispatch } from "react-redux";
import { CreateHopital, GetStaff } from "./hospitalApi/hospitalApiSlice";

const BasicInfo = () => {

    const dispatch=useDispatch()

    const initialValues = {
        hospitalName:"",
        ownerName:"",
        hospitalAddress:"",
        landLine_PTCL:"",
        mobilePhone:"",
    };

    let Schema = yup.object().shape({
        hospitalName: yup.string().required("Hospital Name reuqired"),
        ownerName: yup.string().required("Owner Name"),
        hospitalAddress: yup.string().required("Hospital Address reuqired"),
        landLine_PTCL: yup.string().required("Phone Number reuqired"),
        mobilePhone: yup.string().required("Mobile Number reuqired"),
    });
   
    return (
        <>
            <Box sx={{mt:5}}>
                <Grid container spacing={2}>
                    <Grid item xs={12} >
                        <MDContainer
                            sx={{
                                background: `${theme.palette.mintcream.main}`,
                            }}
                        >
                              <Formik
                            initialValues={initialValues}
                            validationSchema={Schema}
                            onSubmit={async (data) => {
                                console.log(">>>>>>>>",data)
                                console.log(">>>>>>>>",data?.hospitalName)

                                await localStorage.setItem("hopitalName",data?.hospitalName)
                                await dispatch(CreateHopital(JSON.stringify(data)))  
                            }}
                        >
                            {({ handleChange, touched, handleBlur, errors }) => (
                                <Form>
                            <Grid container spacing={{ xs: 2, sm: 3, lg: 4 }}>
                                <Grid item xs={12} sm={12} md={6}>
                                    <MDTextField placeholder="Hospital Name" name="hospitalName" onChange={handleChange} onBlur={handleBlur} valid={errors.hospitalName} touch={touched.hospitalName}/>
                            {errors.hospitalName && touched.hospitalName ? <MDError>{errors.hospitalName}</MDError> : null}
                               
                                </Grid>
                                <Grid item xs={12} sm={12} md={6}>
                                    <MDTextField placeholder="Owner Name" name="ownerName" onChange={handleChange} onBlur={handleBlur} valid={errors.ownerName} touch={touched.ownerName}/>
                            {errors.ownerName && touched.ownerName ? <MDError>{errors.ownerName}</MDError> : null}
                                
                                </Grid>
                                <Grid item xs={12} sm={12} md={12}>
                                    <MDTextField placeholder="Hospital Address"  name="hospitalAddress" onChange={handleChange} onBlur={handleBlur} valid={errors.hospitalAddress} touch={touched.hospitalAddress}/>
                            {errors.hospitalAddress && touched.hospitalAddress ? <MDError>{errors.hospitalAddress}</MDError> : null}
                                
                                </Grid>
                                <Grid item xs={12} sm={12} md={6}>
                                    <MDTextField placeholder="Landline / Ptcl" type="number" name="landLine_PTCL"  onChange={handleChange} onBlur={handleBlur} valid={errors.landLine_PTCL} touch={touched.landLine_PTCL}/>
                            {errors.landLine_PTCL && touched.landLine_PTCL ? <MDError>{errors.landLine_PTCL}</MDError> : null}
                                
                                </Grid>
                                <Grid item xs={12} sm={12} md={6}>
                                    <MDTextField placeholder=" +92 | Enter Your Phone Number" name="mobilePhone"  onChange={handleChange} onBlur={handleBlur} valid={errors.mobilePhone} touch={touched.mobilePhone}/>
                            {errors.mobilePhone && touched.mobilePhone ? <MDError>{errors.mobilePhone}</MDError> : null}
                                
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
                                        type='submit'
                                    >
                                        Create Hospital
                                    </MDButton>
                                </Grid>
                            </Grid>
                              </Form>
                              )}
                          </Formik>
                        </MDContainer>
                    </Grid>
                </Grid>
            </Box>
        </>
    );
};


export default BasicInfo