import {Base_url} from "./constent.js"
import axios from "axios";

const axiosInstance = axios.create({
    baseURL:Base_url,
    timeout:10000,
    headers:{
        "Content-Type":"application/json",
    },
})

axiosInstance.interceptors.request.use(
    (config)=>{
        const accessToken = localStorage.getItem("token");
        if(accessToken){
            config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
    },
    (error)=>{
        return Promise.reject(error);
    }
);

export default axiosInstance;

