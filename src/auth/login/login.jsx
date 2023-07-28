import { Grid } from "@mui/material";
import { Box, margin } from "@mui/system";
import React from "react";
import { useNavigate } from "react-router-dom";
import loginPic from "../../assets/images/login.png";
import theme from "../../assets/Theme";
import MDButton from "../../components/MDButton";
import MDCheckbox from "../../components/MDCheckbox";
import MDHeading from "../../components/MDHeading";
import MDHeadingSub from "../../components/MDHeadingSub";
import MDTextField from "../../components/MDTextField";
import * as yup from 'yup';
import { Formik, Form } from 'formik';
import MDError from "../../components/MDError";
import { useDispatch } from "react-redux";
import { login } from "./authSlice";

const Login = () => {
    const navigate=useNavigate()
    
    const dispatch=useDispatch()

    const initialValues = {
        email: "",
        password: "",
    };


    let Schema = yup.object().shape({
        email: yup.string().email().required("Email reuqired"),
        password: yup
            .string()
            .required("Password reuqired")
            // .matches(/^(?=.*\d)(?=.*[a-z]).{6,}$/, "Must Contain 6 Characters, One Uppercase, One Lowercase and One Number"),
    });

    return (
        <>
        <Box>
            <Grid container>
                <Grid
                    item
                    xs={12}
                    sm={12}
                    md={6}
                    sx={{
                        background: `${theme.palette.primary.main}`,
                        position:"relative"
                        
                    }}
                >
                    <Box
                        sx={{
                            width: "80%",
                            height: "100vh",
                            margin: "auto",
                            py: 6,
                            pr: { md: 5 },
                            display: "flex", justifyContent: "space-between", flexDirection: "column"

                        }}
                    >
                        <MDHeadingSub
                            sx={{
                                color: `${theme.palette.mintastic.main}`,
                                fontFamily: "GontserratBold",
                            }}
                        >
                            Medicdex
                        </MDHeadingSub>
                           <Formik
                            initialValues={initialValues}
                            validationSchema={Schema}
                            onSubmit={async (data) => {
                                const body = { userName: data?.email?.toLowerCase(), password: data?.password };
                                await dispatch(login(body)).then((res)=>{
                                    console.log(res?.payload?.hospital)
                                    localStorage.setItem("hopitalName",res?.payload?.hospital)
                                    if (res?.type == "login/fulfilled") {
                                        localStorage.setItem("auth","true")
                                        if(res?.payload?.hospital){
                                            navigate("/")
                                        }
                                        else{
                                            navigate("/hospital-settings")
                                        }
                                     }
                                })
                            }}
                        >
                            {({ handleChange, touched, handleBlur, errors }) => (
                                <Form>
                        <Box>
                            <MDHeading sx={{ color: `${theme.palette.mintastic.main}` }}>
                                Login
                            </MDHeading>
                            <MDTextField  name="email"   placeholder="Enter Email / hospital ID" sx={{mt:{xs:2,md:5}}} onChange={handleChange} onBlur={handleBlur} valid={errors.email} touch={touched.email}/>
                            {errors.email && touched.email ? <MDError>{errors.email}</MDError> : null}

                            <MDTextField  name="password" type="password" placeholder="Enter Password" sx={{mt:{xs:2,md:4}}} onChange={handleChange} onBlur={handleBlur}/>
                            {errors.password && touched.password ? <MDError>{errors.password}</MDError> : null}

                            <Box
                                sx={{
                                    display: "flex",
                                    justifyContent: "start",
                                    alignItems: "center",
                                    mt:{xs:1,md:4}

                                }}
                            >
                                <MDCheckbox sx={{mr:1}} />
                                <MDHeadingSub>I accept all Terms & Conditions.</MDHeadingSub>
                            </Box>
                            <Box
                                sx={{
                                    display: "flex",
                                    justifyContent: "start",
                                    alignItems: "center",
                                    mt:{xs:1,md:2.4}

                                }}
                            >
                                <MDButton
                                    sx={{
                                        mr: { xs: 2, xl: 2, md: 4 },
                                        width: { xs: "140px", sm: "170px", md: "220px" },
                                        "&:hover": {
                                            background: theme.palette.secondary.main
                                        }
                                    }}
                                    onClick={()=>{
                                        // navigate("/")
                                    }}
                                    type="submit"
                                >
                                    Login
                                </MDButton>
                                <MDHeadingSub>Forgot password?</MDHeadingSub>
                            </Box>

                        </Box>
                        </Form>
                            )}
                        </Formik>
                        <MDHeadingSub sx={{ color: theme.palette.lightgreen.main, fontSize: { xs: "1rem", sm: "1.2rem", md: "2rem" } }}>
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s
                        </MDHeadingSub>

                    </Box>
                </Grid>
                <Grid item xs={12} sm={12} md={6}>
                    <img src={loginPic} alt="login" style={{height:"100%",width:"100%",objectFit:"fill"}}/>
                </Grid>
            </Grid>
           
        </Box>
      
        </>
    );
};

export default Login;
