import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from 'react-toastify'
import apiInstance from "../../../Api/axios";


//#######################################  Hospital ###########################################

export const CreateHopital = createAsyncThunk("CreateHopital", async (params, { dispatch, getState }) => {
    const user=localStorage.getItem("user")
    let result = await apiInstance.post(`/hospital/create?username=${user}`,params).then(function (response) {
        // console.log("new hospital",response)
        if(response?.status >= 200 && response?.status < 300){
            toast.success("Hospital Created Hospital");
            localStorage.setItem("hopitalName",response?.payload?.hospital)

        }
        return response
    }).catch(function (error) {
        return error.response
    })
    const { data, status } = result
    console.log(result)

    return { data, status }
});


//#######################################  Staff ###########################################

export const CreateStaff = createAsyncThunk("CreateStaff", async (params, { dispatch, getState }) => {
    const user=localStorage.getItem("user")
    let result = await apiInstance.post(`/staff/create?username=${user}`,params).then(function (response) {
        // console.log("hospital created",response)
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

export const GetStaff = createAsyncThunk("GetStaff", async (params, { dispatch, getState }) => {
    const user=localStorage.getItem("user")
    console.log("params",user)
    let result = await apiInstance.get(`/staff/all?username=${user}&page=${params?.page}&size=${params?.pageSize}&searchQuery`,).then(function (response) {
        // console.log("All Data",response)
        return response
    }).catch(function (error) {
        return error.response
    })
    const { data, status } = result
    console.log(result)

    return { data, status }
});

//#######################################  Patient ###########################################


export const CreatePatient = createAsyncThunk("CreatePatient", async (params, { dispatch, getState }) => {
    const user=localStorage.getItem("user")
    let result = await apiInstance.post(`/patient?username=${user}`,params).then(function (response) {
        // console.log("patient created",response)
        if(response?.status >= 200 && response?.status < 300){
            toast.success("Patient Addeded");
        }
        return response
    }).catch(function (error) {
        return error.response
    })
    const { data, status } = result
    console.log(result)

    return { data, status }
});

export const GetCurrentInvoice = createAsyncThunk("GetCurrentInvoice", async (params, { dispatch, getState }) => {
    const user=localStorage.getItem("user")
    console.log("params",user)
    let result = await apiInstance.get(`/invoice`,).then(function (response) {
        console.log("Current Invoice  Data",response)
        return response
    }).catch(function (error) {
        return error.response
    })
    const { data, status } = result
    console.log(result)

    return { data, status }
});


export const GenerateNewInvoice = createAsyncThunk("GenerateNewInvoice", async (params, { dispatch, getState }) => {
    let result = await apiInstance.post(`/invoice`,params).then(function (response) {
        return response
    }).catch(function (error) {
        return error.response
    })
    const { data, status } = result
    console.log(result)
    return { data, status }
});

export const GetPatient = createAsyncThunk("GetPatient", async (params, { dispatch, getState }) => {
    const user=localStorage.getItem("user")
    console.log("params",user)
    let result = await apiInstance.get(`/patient?page=${params?.page}&size=${params?.pageSize}&patientType=ipd&username=${user}`,).then(function (response) {
        console.log("All pateint Data",response)
        return response
    }).catch(function (error) {
        return error.response
    })
    const { data, status } = result
    console.log(result)

    return { data, status }
});


export const GetAllDoctor = createAsyncThunk("GetAllDoctor", async (params, { dispatch, getState }) => {
    const user=localStorage.getItem("user")
    console.log("params",user)
    let result = await apiInstance.get(`/staff/all/doctor?username=${user}`,).then(function (response) {
        console.log("All Doctor for Dropdown",response)
        return response
    }).catch(function (error) {
        return error.response
    })
    const { data, status } = result
    console.log(result)

    return { data, status }
});