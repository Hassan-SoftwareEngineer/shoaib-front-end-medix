import { createSlice } from "@reduxjs/toolkit";

const ipdPatientSlice = createSlice({
    name: "ipdPatient",
    initialState: {
       ipdPateint:[],
       ipdPateintWithRange:[],
    },
    reducers: {},
    extraReducers: {
        ["GetOPDPatient/fulfilled"]: (state, action) => {
            state.ipdPateint = action.payload;
        },
        ["GetIPDPatientWithRange/fulfilled"]: (state, action) => {
            state.ipdPateintWithRange = action.payload;
        },
       
    },
});

export const { } = ipdPatientSlice.actions;

export default ipdPatientSlice.reducer;
