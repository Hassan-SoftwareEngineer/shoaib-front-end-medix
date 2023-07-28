import { configureStore } from '@reduxjs/toolkit'
import authReducer from './auth/login/authSlice'
import hospitalSlice from "../src/services/hospitalsettingStap/hospitalApi/hospitalSlice"
import adminDashboardSlice from "../src/services/AdminDashboard/adminDashboardApi/adminDashboardSlice"
import opdPatientSlice from "../src/services/HMOpd/OpdAPi/opdSlice"
import ipdPatientSlice from "../src/services//HMIndoor/indoorAPi/ipdSlice"

const store = configureStore({
  reducer: {
    auth: authReducer,
    hospital: hospitalSlice,
    adminDashboard:adminDashboardSlice,
    opdPateint:opdPatientSlice,
    ipdPateint:ipdPatientSlice

  }
})
export default store