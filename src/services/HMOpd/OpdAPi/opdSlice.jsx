import { createSlice } from "@reduxjs/toolkit";

const opdPatientSlice = createSlice({
    name: "opdPatient",
    initialState: {
       opdPateint:[],
    },
    reducers: {},
    extraReducers: {
        ["GetOPDPatient/fulfilled"]: (state, action) => {
            state.opdPateint = action.payload.data;
        },
       
    },
});

export const { } = opdPatientSlice.actions;

export default opdPatientSlice.reducer;
