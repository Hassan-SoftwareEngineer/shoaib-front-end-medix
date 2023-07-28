import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from 'react-toastify'
import apiInstance from "../../../Api/axios";


//#######################################  Patient OPD ###########################################

export const GetIPDPatient = createAsyncThunk("GetIPDPatient", async (params, { dispatch, getState }) => {
    const user=localStorage.getItem("user")
    let result = await apiInstance.get(`/patient/?page=1&size=100&patientType=ipd&username=${user}`,).then(function (response) {
        return response
    }).catch(function (error) {
        // toast.error("some thing went wrong");
        return error.response
    })
    const { data, status } = result
    console.log(result)

    return { data, status }
});

export const GetIPDPatientWithRange = createAsyncThunk("GetIPDPatientWithRange", async (params, { dispatch, getState }) => {
    console.log("?????????",params)
    const user=localStorage.getItem("user")
    let result = await apiInstance.get(`/patient/all/date?patientType=ipd&startDate=${params?.from}&endDate=${params?.to}&username=${user}`,).then(function (response) {
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

export const UpdatePatient = createAsyncThunk("UpdatePatient", async (params, { dispatch, getState }) => {
    const user=localStorage.getItem("user")
    let result = await apiInstance.put(`/patient/update/${params?.id}?username=${user}`,params.body).then(function (response) {
        console.log("hospital created",response)
        if(response?.status >= 200 && response?.status < 300){
            toast.success("Staff Addeded");
        }
        return response
    }).catch(function (error) {
        return error.response
    })
    const { data, status } = result
    console.log(result)

    return { data, status }
});