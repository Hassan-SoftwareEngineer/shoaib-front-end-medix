import { createSlice } from "@reduxjs/toolkit";

const adminDashboardSlice = createSlice({
    name: "adminDashboard",
    initialState: {
       todayPateint:[],
    },
    reducers: {},
    extraReducers: {
        ["GetTodayPatient/fulfilled"]: (state, action) => {
            state.todayPateint = action.payload;
        },
       
    },
});

export const { } = adminDashboardSlice.actions;

export default adminDashboardSlice.reducer;
