import axios from "axios";
import { BaseUrl } from "../constants/baseUrl";

// axios.defaults.withCredentials = true;
// const bearerToken = sessionStorage.getItem("bearerToken");

export const apiInstance = axios.create({
    baseURL: BaseUrl,
    headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
    },
})


export default apiInstance;

