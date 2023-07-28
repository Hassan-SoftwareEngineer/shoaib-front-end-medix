import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from 'react-toastify'
import apiInstance from "../../../Api/axios";


//#######################################  Patient OPD ###########################################

export const GetOPDPatient = createAsyncThunk("GetOPDPatient", async (params, { dispatch, getState }) => {
    const user=localStorage.getItem("user")
    let result = await apiInstance.get(`/patient/?page=${params?.page}&size=${params?.pageSize}&patientType=opd&username=${user}`,).then(function (response) {
        console.log("All OPD pateint Data",response)
        return response
    }).catch(function (error) {
        // toast.error("some thing went wrong");
        return error.response
    })
    const { data, status } = result
    console.log(result)

    return { data, status }
});

export const GetOPDPatientWithRange = createAsyncThunk("GetOPDPatientWithRange", async (params, { dispatch, getState }) => {
    console.log("?????????",params)
    const user=localStorage.getItem("user")
    let result = await apiInstance.get(`/patient/all/date?patientType=opd&startDate=${params?.from}&endDate=${params?.to}&username=${user}`,).then(function (response) {
        console.log("All IPD pateint Data",response)
        return response
    }).catch(function (error) {
        // toast.error("some thing went wrong");
        return error.response
    })
    const { data, status } = result
    console.log(result)

    return { data, status }
});