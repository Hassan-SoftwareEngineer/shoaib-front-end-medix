import { createSlice } from "@reduxjs/toolkit";

const hospitalSlice = createSlice({
    name: "providers",
    initialState: {
        allStaff: [],
        patient:[],
        currentInvoice:null,
        allDoctor:[]
    },
    reducers: {},
    extraReducers: {
        // Get Staff
        ["GetStaff/fulfilled"]: (state, action) => {
            state.allStaff = action.payload;
        },
        ["GetPatient/fulfilled"]: (state, action) => {
            // console.log("from GetPatient slice first --->", action);
            // console.log("from GetPatient slice", action);
            state.patient = action.payload;
        },
        ["GetCurrentInvoice/fulfilled"]: (state, action) => {
            // console.log("from GetPatient slice first --->", action);
            // console.log("from GetPatient slice", action);
            state.currentInvoice = action.payload;
            // console.log("Fail to Get GetPatient list");
        },
        ["GetAllDoctor/fulfilled"]: (state, action) => {
            console.log("from GetPatient slice first --->", action);
            console.log("from GetPatient slice", action);
            state.allDoctor = action.payload?.data;
            console.log("Fail to Get GetPatient list");
        },
    },
});

export const { } = hospitalSlice.actions;

export default hospitalSlice.reducer;
