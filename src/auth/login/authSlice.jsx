import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import apiInstance from "../../Api/axios";

export const login = createAsyncThunk(
    "login",
    async (params, { rejectWithValue }) => {
        try {
            const response = await apiInstance.post(`/auth/user/login`, params);
            console.log("this is the response",response)
            localStorage.setItem("user",response?.data?.user.authentication?.name)
            return response.data;
        } catch (error) {
            if (error.response.status >= 400) {
                toast.error(error.message);
            }
            if (error.response && error.response.data.message) {
                toast.error(error.response.data);
                return rejectWithValue(error.response.data);
            } else {
                console.log("error.response.data.message bottom", error.message);
                return rejectWithValue(error.message);
            }
        }
    }
);

const initialState = {
    loading: false,
    userInfo: {}, 
    error: null,
    errorMsg: "",
    success: false, 
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(login.pending, (state, action) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(login.fulfilled, (state, action) => {
            console.log("this is the action", action);
            state.users = action.payload;
            state.loading = false;
            state.success = true;
        });
        builder.addCase(login.rejected, (state, action) => {
            console.log("error.response.data.message third b", action);
            state.loading = false;
            state.errorMsg = action?.error.message;
            state.error = action.payload;
        });
    },
});
export default authSlice.reducer;
